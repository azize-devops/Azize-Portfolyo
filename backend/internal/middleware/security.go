package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SecurityHeaders adds security headers to all responses
func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Prevent clickjacking
		c.Writer.Header().Set("X-Frame-Options", "DENY")

		// Prevent MIME type sniffing
		c.Writer.Header().Set("X-Content-Type-Options", "nosniff")

		// Enable XSS filter
		c.Writer.Header().Set("X-XSS-Protection", "1; mode=block")

		// Referrer policy
		c.Writer.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		// Content Security Policy
		c.Writer.Header().Set("Content-Security-Policy", "default-src 'self'")

		// Strict Transport Security (HSTS) - only enable in production with HTTPS
		// c.Writer.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

		// Permissions Policy
		c.Writer.Header().Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

		c.Next()
	}
}

// RequestSanitizer sanitizes incoming requests
func RequestSanitizer() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Limit request body size (10MB)
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 10<<20)

		c.Next()
	}
}
