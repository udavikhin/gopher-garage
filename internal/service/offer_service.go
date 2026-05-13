package service

import (
	"github.com/udavikhin/gopher-garage/internal/domain"
	"github.com/udavikhin/gopher-garage/internal/repository"
)

type OfferServiceInterface interface {
	CreateOffer(offer domain.Offer) error
	GetOfferInfo(id int) (domain.Offer, error)
	GetOfferListing() ([]domain.Offer, error)
	RemoveOffer(id int) error
}

type OfferService struct {
	repo repository.OfferRepositoryInterface
}

func NewOfferService(repo repository.OfferRepositoryInterface) *OfferService {
	return &OfferService{
		repo: repo,
	}
}
