package middleware

import (
	"sync"
	"time"
)

// TokenBlacklist stores revoked JWT tokens in memory.
// Suitable for single-replica deployments. For multi-replica,
// replace with Redis or a shared store.
type TokenBlacklist struct {
	tokens map[string]time.Time // token -> expiration time
	mu     sync.RWMutex
}

var blacklist = &TokenBlacklist{
	tokens: make(map[string]time.Time),
}

func init() {
	go blacklist.cleanup()
}

// RevokeToken adds a token to the blacklist until its expiration
func RevokeToken(tokenString string, expiresAt time.Time) {
	blacklist.mu.Lock()
	defer blacklist.mu.Unlock()
	blacklist.tokens[tokenString] = expiresAt
}

// IsTokenRevoked checks if a token has been revoked
func IsTokenRevoked(tokenString string) bool {
	blacklist.mu.RLock()
	defer blacklist.mu.RUnlock()
	_, revoked := blacklist.tokens[tokenString]
	return revoked
}

// cleanup removes expired tokens from blacklist every 5 minutes
func (bl *TokenBlacklist) cleanup() {
	for {
		time.Sleep(5 * time.Minute)
		bl.mu.Lock()
		now := time.Now()
		for token, expiry := range bl.tokens {
			if now.After(expiry) {
				delete(bl.tokens, token)
			}
		}
		bl.mu.Unlock()
	}
}
