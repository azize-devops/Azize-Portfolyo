package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// AuditLogger logs admin operations with structured context
func AuditLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Only log state-changing operations
		if c.Request.Method == "GET" || c.Request.Method == "HEAD" || c.Request.Method == "OPTIONS" {
			c.Next()
			return
		}

		start := time.Now()

		// Process request
		c.Next()

		// Extract audit fields
		userID, _ := c.Get("user_id")
		userEmail, _ := c.Get("user_email")
		status := c.Writer.Status()

		log.Printf("[AUDIT] method=%s path=%s user_id=%v user_email=%v status=%d ip=%s duration=%s user_agent=%s",
			c.Request.Method,
			c.Request.URL.Path,
			userID,
			userEmail,
			status,
			c.ClientIP(),
			time.Since(start),
			c.Request.UserAgent(),
		)
	}
}
