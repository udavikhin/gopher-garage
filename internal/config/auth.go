package config

import "time"

type AuthConfig struct {
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
	JWTSecret       string
}

func NewAuthConfig() *AuthConfig {
	return &AuthConfig{
		AccessTokenTTL:  30 * time.Minute,
		RefreshTokenTTL: 7 * 24 * time.Hour,
		JWTSecret:       getEnv("JWT_SECRET", ""),
	}
}
