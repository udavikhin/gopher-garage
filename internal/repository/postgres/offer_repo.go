package repository

import "github.com/udavikhin/gopher-garage/internal/domain"

func NewOfferRepositoryPostgres() *OfferRepositoryPostgres {
	return &OfferRepositoryPostgres{}
}

type OfferRepositoryPostgres struct {
}

func (r *OfferRepositoryPostgres) CreateOffer(offer domain.Offer) error {
	//TODO implement me
	panic("implement me")
}

func (r *OfferRepositoryPostgres) GetOffer(id int) (domain.Offer, error) {
	//TODO implement me
	panic("implement me")
}

func (r *OfferRepositoryPostgres) GetAll() ([]domain.Offer, error) {
	//TODO implement me
	panic("implement me")
}

func (r *OfferRepositoryPostgres) RemoveOffer(id int) error {
	//TODO implement me
	panic("implement me")
}
