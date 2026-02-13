package middleware

import (
	"testing"
	"time"
)

func TestTokenBlacklist_RevokeAndCheck(t *testing.T) {
	token := "test-token-abc123"
	expiry := time.Now().Add(time.Hour)

	if IsTokenRevoked(token) {
		t.Error("token should not be revoked initially")
	}

	RevokeToken(token, expiry)

	if !IsTokenRevoked(token) {
		t.Error("token should be revoked after calling RevokeToken")
	}
}

func TestTokenBlacklist_UnrevokedToken(t *testing.T) {
	if IsTokenRevoked("never-revoked-token") {
		t.Error("unknown token should not be revoked")
	}
}

func TestTokenBlacklist_MultipleTokens(t *testing.T) {
	token1 := "token-one"
	token2 := "token-two"
	expiry := time.Now().Add(time.Hour)

	RevokeToken(token1, expiry)

	if !IsTokenRevoked(token1) {
		t.Error("token1 should be revoked")
	}
	if IsTokenRevoked(token2) {
		t.Error("token2 should not be revoked")
	}
}
