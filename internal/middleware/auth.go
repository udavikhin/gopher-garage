package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/udavikhin/gopher-garage/internal/domain"
)

func parseToken(secret []byte, tokenString string) (*domain.JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &domain.JWTClaims{}, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("token is invalid: %v", token.Header["alg"])
		}
		return secret, nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*domain.JWTClaims)
	if !ok {
		return nil, fmt.Errorf("unknown claims type, cannot proceed")
	}
	return claims, nil
}

func AuthMiddleware(secret []byte) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "no Authorization header provided", http.StatusUnauthorized)
				return
			}
			authHeaderFields := strings.Fields(authHeader)
			if len(authHeaderFields) != 2 || authHeaderFields[0] != "Bearer" {
				http.Error(w, "invalid authorization header structure", http.StatusUnauthorized)
				return
			}

			claims, err := parseToken(secret, authHeaderFields[1])
			if err != nil {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), domain.UserIDKey, claims.UserID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func OptionalAuthMiddleware(secret []byte) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader != "" {
				authHeaderFields := strings.Fields(authHeader)
				if len(authHeaderFields) == 2 && authHeaderFields[0] == "Bearer" {
					if claims, err := parseToken(secret, authHeaderFields[1]); err == nil {
						r = r.WithContext(context.WithValue(r.Context(), domain.UserIDKey, claims.UserID))
					}
				}
			}
			next.ServeHTTP(w, r)
		})
	}
}
