package domain

import "github.com/golang-jwt/jwt/v5"

type JWTClaims struct {
	UserID   int    `json:"user_id"`
	FullName string `json:"full_name"`
	jwt.RegisteredClaims
}

type authContextKey string

const UserIDKey authContextKey = "user_id"
