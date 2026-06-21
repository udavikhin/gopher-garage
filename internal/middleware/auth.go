package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/udavikhin/gopher-garage/internal/domain"
)

func AuthMiddleware(secret []byte) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "no Authorization header provided", http.StatusUnauthorized)
				return
			}
			authHeaderFields := strings.Fields(authHeader)
			if (len(authHeaderFields) != 2) || authHeaderFields[0] != "Bearer" {
				http.Error(w, "invalid authorization header structure", http.StatusUnauthorized)
				return
			}

			token, err := jwt.ParseWithClaims(authHeaderFields[1], &domain.JWTClaims{}, func(token *jwt.Token) (any, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("token is invalid: %v", token.Header["alg"])
				}
				return secret, nil
			})
			if err != nil {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			claims, ok := token.Claims.(*domain.JWTClaims)

			if !ok {
				http.Error(w, "unknown claims type, cannot proceed", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), domain.UserIDKey, claims.UserID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
