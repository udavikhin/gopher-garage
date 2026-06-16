package service

import (
	"context"
	"strconv"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/udavikhin/gopher-garage/internal/domain"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
)

func NewOfferService(repo repository.Queries) *OfferService {
	return &OfferService{
		repo: repo,
	}
}

type OfferService struct {
	repo repository.Queries
}

func (o *OfferService) CreateOffer(offer domain.Offer) (int, error) {
	userId, err := strconv.Atoi(offer.User)
	if err != nil {
		return 0, err
	}

	id, err := o.repo.AddOffer(context.Background(), repository.AddOfferParams{
		UserID: pgtype.Int4{
			Int32: int32(userId),
		},
		Vehicle: pgtype.Text{
			String: offer.Vehicle,
		},
		Description: pgtype.Text{
			String: offer.Description,
		},
		Price: pgtype.Float8{
			Float64: offer.Price,
		},
	})
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (o *OfferService) GetOfferInfo(id int) (repository.Offer, error) {
	offer, err := o.repo.GetOfferById(context.Background(), int32(id))
	if err != nil {
		return repository.Offer{}, err
	}

	return offer, nil
}

func (o *OfferService) GetOfferListing() ([]repository.Offer, error) {
	offers, err := o.repo.GetAllOffers(context.Background())
	if err != nil {
		return nil, err
	}

	return offers, nil
}

func (o *OfferService) RemoveOffer(id int) error {
	if err := o.repo.RemoveOffer(context.Background(), int32(id)); err != nil {
		return err
	}

	return nil
}
