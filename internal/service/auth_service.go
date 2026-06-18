package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
	"golang.org/x/crypto/bcrypt"
)

func NewAuthService(repo repository.Queries) *AuthService {
	return &AuthService{
		repo: repo,
	}
}

type AuthService struct {
	repo repository.Queries
}

// TODO: move to a more appropriate place, review structure
type AccessToken struct {
	Jwt     string
	Refresh string
}

func (a *AuthService) Login(ctx context.Context, email string, password string) (*AccessToken, error) {
	user, err := a.repo.GetUserByEmail(ctx, email)
	if err != nil {
		return &AccessToken{}, errors.New("User does not exist")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return &AccessToken{}, errors.New("Invalid password")
	}

	tokens, err := a.generateAccessToken(int(user.ID))
	if err != nil {
		return &AccessToken{}, err
	}

	tokenHash := sha256.Sum256([]byte(tokens.Refresh))

	_, err = a.repo.AddRefreshToken(ctx, repository.AddRefreshTokenParams{
		UserID: pgtype.Int4{
			Int32: user.ID,
			Valid: true,
		},
		TokenHash: hex.EncodeToString(tokenHash[:]),
		ExpiresAt: pgtype.Timestamp{
			Time:  time.Now().Add(time.Hour * 24),
			Valid: true,
		},
	})
	if err != nil {
		return &AccessToken{}, err
	}

	return tokens, nil
}

func (a *AuthService) generateAccessToken(userId int) (*AccessToken, error) {
	token := a.generateJwt(userId)
	// TODO: key to .env
	signingKey := []byte("llamapalooza")
	ss, err := token.SignedString(signingKey)
	if err != nil {
		return &AccessToken{}, err
	}
	refresh, err := a.generateRefreshToken()
	if err != nil {
		return &AccessToken{}, err
	}

	return &AccessToken{
		Jwt:     ss,
		Refresh: refresh,
	}, nil
}

func (a *AuthService) generateJwt(userId int) *jwt.Token {
	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 30)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ID:        strconv.Itoa(userId),
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
