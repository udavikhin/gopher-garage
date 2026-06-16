package service

import (
	"context"
	"errors"

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
