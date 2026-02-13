package middleware

import (
	"testing"
	"time"
)

func TestRateLimiter_AllowsWithinLimit(t *testing.T) {
	rl := &RateLimiter{
		visitors: make(map[string]*visitor),
		rate:     3,
		window:   time.Minute,
	}

	for i := 0; i < 3; i++ {
		if !rl.isAllowed("192.168.1.1") {
			t.Errorf("request %d should be allowed", i+1)
		}
	}
}

func TestRateLimiter_BlocksOverLimit(t *testing.T) {
	rl := &RateLimiter{
		visitors: make(map[string]*visitor),
		rate:     2,
		window:   time.Minute,
	}

	rl.isAllowed("10.0.0.1")
	rl.isAllowed("10.0.0.1")

	if rl.isAllowed("10.0.0.1") {
		t.Error("third request should be blocked")
	}
}

func TestRateLimiter_DifferentIPs(t *testing.T) {
	rl := &RateLimiter{
		visitors: make(map[string]*visitor),
		rate:     1,
		window:   time.Minute,
	}

	if !rl.isAllowed("10.0.0.1") {
		t.Error("first IP should be allowed")
	}
	if !rl.isAllowed("10.0.0.2") {
		t.Error("second IP should be allowed independently")
	}
}

func TestRateLimiter_ResetsAfterWindow(t *testing.T) {
	rl := &RateLimiter{
		visitors: make(map[string]*visitor),
		rate:     1,
		window:   50 * time.Millisecond,
	}

	if !rl.isAllowed("10.0.0.1") {
		t.Error("first request should be allowed")
	}
	if rl.isAllowed("10.0.0.1") {
		t.Error("second request should be blocked")
	}

	time.Sleep(60 * time.Millisecond)

	if !rl.isAllowed("10.0.0.1") {
		t.Error("request after window should be allowed")
	}
}
