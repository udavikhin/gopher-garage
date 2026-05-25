package service

import (
	"github.com/udavikhin/gopher-garage/internal/domain"
	"github.com/udavikhin/gopher-garage/internal/repository"
)

type OfferServiceInterface interface {
	CreateOffer(offer domain.Offer) (int, error)
	GetOfferInfo(id int) (domain.Offer, error)
	GetOfferListing() ([]domain.Offer, error)
	RemoveOffer(id int) error
}

func NewOfferService(repo repository.OfferRepositoryInterface) *OfferService {
	return &OfferService{
		repo: repo,
	}
}

type OfferService struct {
	repo repository.OfferRepositoryInterface
}

func (o *OfferService) CreateOffer(offer domain.Offer) (int, error) {
	id, err := o.repo.CreateOffer(offer)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (o *OfferService) GetOfferInfo(id int) (domain.Offer, error) {
	offer, err := o.repo.GetOffer(id)
	if err != nil {
		return domain.Offer{}, err
	}

	return offer, nil
}

func (o *OfferService) GetOfferListing() ([]domain.Offer, error) {
	//TODO implement me
	panic("implement me")
}

func (o *OfferService) RemoveOffer(id int) error {
	//TODO implement me
	panic("implement me")
}
