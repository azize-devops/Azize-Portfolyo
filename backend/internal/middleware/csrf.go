package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	csrfCookieName = "_csrf_token"
	csrfHeaderName = "X-CSRF-Token"
)

// CSRFMiddleware implements double-submit cookie pattern.
// Sets a CSRF token cookie on every response, and validates
// that state-changing requests include the matching header.
func CSRFMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Safe methods don't need CSRF validation
		if c.Request.Method == "GET" || c.Request.Method == "HEAD" || c.Request.Method == "OPTIONS" {
			ensureCSRFCookie(c)
			c.Next()
			return
		}

		// State-changing methods: validate CSRF token
		cookieToken, err := c.Cookie(csrfCookieName)
		if err != nil || cookieToken == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "CSRF token cookie missing",
			})
			return
		}

		headerToken := c.GetHeader(csrfHeaderName)
		if headerToken == "" || headerToken != cookieToken {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "CSRF token validation failed",
			})
			return
		}

		c.Next()
	}
}

func ensureCSRFCookie(c *gin.Context) {
	if _, err := c.Cookie(csrfCookieName); err != nil {
		token := generateCSRFToken()
		c.SetSameSite(http.SameSiteStrictMode)
		c.SetCookie(csrfCookieName, token, 86400, "/", "", true, false)
	}
}

func generateCSRFToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return hex.EncodeToString(b)
}
