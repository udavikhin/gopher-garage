package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/udavikhin/gopher-garage/internal/config"
	"github.com/udavikhin/gopher-garage/internal/domain"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
	"golang.org/x/crypto/bcrypt"
)

func NewAuthService(repo repository.Queries, config *config.AuthConfig) *AuthService {
	return &AuthService{
		repo:   repo,
		config: config,
	}
}

type AuthService struct {
	repo   repository.Queries
	config *config.AuthConfig
}

// TODO: move to a more appropriate place, review structure
type TokenPair struct {
	JWT     string
	Refresh string
}

func (a *AuthService) Login(ctx context.Context, email string, password string) (*TokenPair, error) {
	credentialsError := errors.New("invalid login or password")

	user, err := a.repo.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, credentialsError
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, credentialsError
	}

	tokens, err := a.generateTokenPair(int(user.ID))
	if err != nil {
		return nil, err
	}

	tokenHash := sha256.Sum256([]byte(tokens.Refresh))

	_, err = a.repo.AddRefreshToken(ctx, repository.AddRefreshTokenParams{
		UserID: pgtype.Int4{
			Int32: user.ID,
			Valid: true,
		},
		TokenHash: hex.EncodeToString(tokenHash[:]),
		ExpiresAt: pgtype.Timestamp{
			Time:  time.Now().Add(a.config.RefreshTokenTTL),
			Valid: true,
		},
	})
	if err != nil {
		return nil, err
	}

	return tokens, nil
}

func (a *AuthService) generateTokenPair(userID int) (*TokenPair, error) {
	token := a.generateJWT(userID)
	signingKey := []byte(a.config.JWTSecret)
	ss, err := token.SignedString(signingKey)
	if err != nil {
		return nil, err
	}
	refresh, err := a.generateRefreshToken()
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		JWT:     ss,
		Refresh: refresh,
	}, nil
}

func (a *AuthService) generateJWT(userID int) *jwt.Token {
	claims := domain.JWTClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(a.config.AccessTokenTTL)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
}

func (a *AuthService) generateRefreshToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(bytes), nil
}

func (a *AuthService) GetRefreshTokenTTL() time.Duration {
	return a.config.RefreshTokenTTL
}

func (a *AuthService) Register(ctx context.Context, data repository.AddUserParams) (int, error) {
	_, err := a.repo.GetUserByEmail(ctx, data.Email)
	if err == nil {
		return 0, errors.New("User is already registered")
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}
	data.Password = string(passwordHash)

	userId, err := a.repo.AddUser(ctx, data)
	if err != nil {
		return 0, err
	}

	return int(userId), nil
}
