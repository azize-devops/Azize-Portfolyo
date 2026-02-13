package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/azize/devops-journey-backend/config"
	"github.com/azize/devops-journey-backend/internal/handlers"
	"github.com/azize/devops-journey-backend/internal/middleware"
	"github.com/azize/devops-journey-backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
	// Load .env file in development
	if os.Getenv("ENVIRONMENT") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found, using environment variables")
		}
	}

	// Load and validate configuration
	cfg := config.Load()
	if err := cfg.Validate(); err != nil {
		log.Fatalf("Configuration error: %v", err)
	}

	// Set Gin mode based on environment
	if cfg.Server.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize database
	db, err := initDatabase(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := runMigrations(db); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Create default admin user if not exists
	createDefaultAdmin(db, cfg)

	// Initialize Gin router
	r := gin.New()

	// Global middleware
	r.Use(gin.Recovery())
	r.Use(gin.Logger())
	r.Use(middleware.SecurityHeaders(cfg.Server.Environment))
	r.Use(middleware.CORSMiddleware(middleware.DefaultCORSConfig(cfg.Server.AllowOrigins)))

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db, cfg)
	projectHandler := handlers.NewProjectHandler(db)
	certHandler := handlers.NewCertificationHandler(db)
	contactHandler := handlers.NewContactHandler(db)

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy"})
	})

	// API routes
	api := r.Group("/api/v1")
	{
		// Public routes
		api.GET("/projects", projectHandler.GetProjects)
		api.GET("/projects/:id", projectHandler.GetProject)
		api.GET("/certifications", certHandler.GetCertifications)
		api.GET("/certifications/:id", certHandler.GetCertification)

		// Contact form with rate limiting
		api.POST("/contact", middleware.ContactFormRateLimiter(), contactHandler.SubmitContact)

		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/login", middleware.LoginRateLimiter(), authHandler.Login)

			// Protected auth routes
			authProtected := auth.Group("")
			authProtected.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
			{
				authProtected.GET("/me", authHandler.Me)
				authProtected.POST("/refresh", authHandler.RefreshToken)
				authProtected.POST("/logout", authHandler.Logout)
			}
		}

		// Admin routes (protected)
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
		admin.Use(middleware.AdminOnly())
		admin.Use(middleware.CSRFMiddleware())
		admin.Use(middleware.AuditLogger())
		{
			// Projects management
			admin.POST("/projects", projectHandler.CreateProject)
			admin.PUT("/projects/:id", projectHandler.UpdateProject)
			admin.DELETE("/projects/:id", projectHandler.DeleteProject)

			// Certifications management
			admin.POST("/certifications", certHandler.CreateCertification)
			admin.PUT("/certifications/:id", certHandler.UpdateCertification)
			admin.DELETE("/certifications/:id", certHandler.DeleteCertification)

			// Contact messages
			admin.GET("/messages", contactHandler.GetMessages)
			admin.GET("/messages/unread-count", contactHandler.GetUnreadCount)
			admin.GET("/messages/:id", contactHandler.GetMessage)
			admin.PATCH("/messages/:id/read", contactHandler.MarkAsRead)
			admin.DELETE("/messages/:id", contactHandler.DeleteMessage)
		}
	}

	// Configure HTTP server with timeouts
	addr := fmt.Sprintf(":%s", cfg.Server.Port)
	srv := &http.Server{
		Addr:         addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server starting on %s", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Graceful shutdown: wait for SIGTERM/SIGINT
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Give in-flight requests 30 seconds to complete
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	// Close database connection
	sqlDB, _ := db.DB()
	if sqlDB != nil {
		sqlDB.Close()
	}

	log.Println("Server exited gracefully")
}

func initDatabase(cfg *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.DBName,
		cfg.Database.Port,
		cfg.Database.SSLMode,
	)

	// Configure GORM logger
	gormLogger := logger.Default
	if cfg.Server.Environment == "production" {
		gormLogger = logger.Default.LogMode(logger.Warn)
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: gormLogger,
	})
	if err != nil {
		return nil, err
	}

	// Configure connection pool
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return db, nil
}

func runMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Certification{},
		&models.ContactMessage{},
	)
}

func createDefaultAdmin(db *gorm.DB, cfg *config.Config) {
	var count int64
	db.Model(&models.User{}).Count(&count)

	if count == 0 {
		if cfg.Server.Environment == "production" {
			log.Println("No admin user found. Set DEFAULT_ADMIN_PASSWORD env var and restart to create one.")
			return
		}

		adminPassword := os.Getenv("DEFAULT_ADMIN_PASSWORD")
		if adminPassword == "" {
			b := make([]byte, 16)
			if _, err := rand.Read(b); err != nil {
				log.Printf("Failed to generate secure password: %v", err)
				return
			}
			adminPassword = hex.EncodeToString(b)
		}

		admin := models.User{
			Email:    "admin@example.com",
			Password: adminPassword,
			Name:     "Admin",
			Role:     "admin",
		}
		if err := db.Create(&admin).Error; err != nil {
			log.Printf("Failed to create default admin: %v", err)
		} else {
			log.Printf("Default admin created (email: admin@example.com, password: %s)", adminPassword)
			log.Println("WARNING: Change the default password immediately!")
		}
	}
}
