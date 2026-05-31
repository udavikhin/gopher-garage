package service

import repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"

type Services struct {
	Offer *OfferService
}

func NewServices(repo repository.Queries) *Services {
	return &Services{
		Offer: NewOfferService(repo),
	}
}
