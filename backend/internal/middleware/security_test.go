package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestSecurityHeaders_CommonHeaders(t *testing.T) {
	r := gin.New()
	r.Use(SecurityHeaders("development"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/test", nil)
	r.ServeHTTP(w, req)

	tests := []struct {
		header string
		value  string
	}{
		{"X-Frame-Options", "DENY"},
		{"X-Content-Type-Options", "nosniff"},
		{"X-XSS-Protection", "1; mode=block"},
		{"Referrer-Policy", "strict-origin-when-cross-origin"},
		{"Content-Security-Policy", "default-src 'self'"},
	}

	for _, tt := range tests {
		got := w.Header().Get(tt.header)
		if got != tt.value {
			t.Errorf("%s = %q, want %q", tt.header, got, tt.value)
		}
	}
}

func TestSecurityHeaders_HSTSInProduction(t *testing.T) {
	r := gin.New()
	r.Use(SecurityHeaders("production"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/test", nil)
	r.ServeHTTP(w, req)

	hsts := w.Header().Get("Strict-Transport-Security")
	if hsts == "" {
		t.Error("HSTS header should be set in production")
	}
}

func TestSecurityHeaders_NoHSTSInDevelopment(t *testing.T) {
	r := gin.New()
	r.Use(SecurityHeaders("development"))
	r.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/test", nil)
	r.ServeHTTP(w, req)

	hsts := w.Header().Get("Strict-Transport-Security")
	if hsts != "" {
		t.Error("HSTS header should not be set in development")
	}
}
