package repository

import "github.com/udavikhin/gopher-garage/internal/domain"

type OfferRepositoryInterface interface {
	CreateOffer(offer domain.Offer) error
	GetOffer(id int) (domain.Offer, error)
	GetAll() ([]domain.Offer, error)
	RemoveOffer(id int) error
}
