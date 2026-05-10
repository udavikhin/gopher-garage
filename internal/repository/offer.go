package repository

import "github.com/udavikhin/gopher-garage/internal/domain"

type OfferRepository struct{}

func NewOfferRepository() *OfferRepository {
	return &OfferRepository{}
}

func (r *OfferRepository) GetByID(id int) (*domain.Offer, error) {

}
