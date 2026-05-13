package service

import "github.com/udavikhin/gopher-garage/internal/repository"

type Services struct {
	Offer *OfferService
}

func NewServices(repositories repository.Repositories) *Services {
	return &Services{
		Offer: NewOfferService(repositories.Offer),
	}
}
