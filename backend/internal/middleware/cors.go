package middleware

import (
	"strings"

	"github.com/gin-gonic/gin"
)

// CORSConfig holds CORS configuration
type CORSConfig struct {
	AllowOrigins     []string
	AllowMethods     []string
	AllowHeaders     []string
	ExposeHeaders    []string
	AllowCredentials bool
	MaxAge           int
}

// DefaultCORSConfig returns a default CORS configuration
func DefaultCORSConfig(allowOrigins string) CORSConfig {
	origins := strings.Split(allowOrigins, ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}

	return CORSConfig{
		AllowOrigins: origins,
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Content-Length",
			"Accept",
			"Accept-Encoding",
			"Authorization",
			"X-CSRF-Token",
			"X-Requested-With",
		},
		ExposeHeaders:    []string{"Content-Length", "Content-Type", "Set-Cookie"},
		AllowCredentials: true,
		MaxAge:           86400, // 24 hours
	}
}

// CORSMiddleware returns a CORS middleware
func CORSMiddleware(config CORSConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		// Check if origin is allowed
		allowed := false
		for _, allowedOrigin := range config.AllowOrigins {
			if allowedOrigin == "*" || allowedOrigin == origin {
				allowed = true
				break
			}
		}

		if allowed {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		}

		c.Writer.Header().Set("Access-Control-Allow-Methods", strings.Join(config.AllowMethods, ", "))
		c.Writer.Header().Set("Access-Control-Allow-Headers", strings.Join(config.AllowHeaders, ", "))
		c.Writer.Header().Set("Access-Control-Expose-Headers", strings.Join(config.ExposeHeaders, ", "))

		if config.AllowCredentials {
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.Writer.Header().Set("Access-Control-Max-Age", "86400")
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
