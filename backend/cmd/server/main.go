package main

import (
	"fmt"
	"log"
	"os"
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

	// Load configuration
	cfg := config.Load()

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
	r.Use(middleware.SecurityHeaders())
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
			auth.POST("/login", authHandler.Login)

			// Protected auth routes
			authProtected := auth.Group("")
			authProtected.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
			{
				authProtected.GET("/me", authHandler.Me)
				authProtected.POST("/refresh", authHandler.RefreshToken)
			}
		}

		// Admin routes (protected)
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
		admin.Use(middleware.AdminOnly())
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

	// Start server
	addr := fmt.Sprintf(":%s", cfg.Server.Port)
	log.Printf("Server starting on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
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
		// Only create default admin in development
		if cfg.Server.Environment != "production" {
			admin := models.User{
				Email:    "admin@example.com",
				Password: "__DEFAULT_PASSWORD__", // Will be hashed by BeforeCreate hook
				Name:     "Admin",
				Role:     "admin",
			}
			if err := db.Create(&admin).Error; err != nil {
				log.Printf("Failed to create default admin: %v", err)
			} else {
				log.Println("Default admin user created (email: admin@example.com, password: __DEFAULT_PASSWORD__)")
				log.Println("WARNING: Change the default password immediately!")
			}
		}
	}
}
