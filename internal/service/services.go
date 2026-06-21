package service

import (
	"github.com/udavikhin/gopher-garage/internal/config"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
)

type Services struct {
	Offer *OfferService
	Auth  *AuthService
}

func NewServices(repo repository.Queries, config *config.Config) *Services {
	return &Services{
		Offer: NewOfferService(repo),
		Auth:  NewAuthService(repo, config.Auth),
	}
}
