package service

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
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

}

func (a *AuthService) GenerateAccessToken(userId int) (*AccessToken, error) {
	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 30)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ID:        string(userId),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// TODO: key to .env
	signingKey := []byte("llamapalooza")
	ss, err := jwtToken.SignedString(signingKey)
	if err != nil {
		return &AccessToken{}, err
	}

	return &AccessToken{
		Jwt: ss,
	}, nil
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
