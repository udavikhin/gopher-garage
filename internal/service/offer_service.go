package service

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/udavikhin/gopher-garage/internal/api/handler/offer"
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

func (o *OfferService) CreateOffer(offerData offer.CreateOfferRequest, userID int) (int, error) {
	id, err := o.repo.AddOffer(context.Background(), repository.AddOfferParams{
		UserID:      pgtype.Int4{Int32: int32(userID), Valid: true},
		Make:        pgtype.Text{String: offerData.Make, Valid: true},
		Model:       pgtype.Text{String: offerData.Model, Valid: true},
		Year:        pgtype.Int2{Int16: int16(offerData.Year), Valid: true},
		Gearbox:     repository.NullVehicleGearbox{VehicleGearbox: repository.VehicleGearbox(offerData.Gearbox), Valid: true},
		Mileage:     pgtype.Int4{Int32: int32(offerData.Mileage), Valid: true},
		Color:       pgtype.Text{String: offerData.Color, Valid: true},
		Fuel:        repository.NullVehicleFuel{VehicleFuel: repository.VehicleFuel(offerData.Fuel), Valid: true},
		Price:       pgtype.Int4{Int32: int32(offerData.Price), Valid: true},
		Negotiable:  pgtype.Bool{Bool: offerData.Negotiable, Valid: true},
		Description: pgtype.Text{String: offerData.Description, Valid: true},
	})
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (o *OfferService) GetOfferInfo(ctx context.Context, id int) (repository.Offer, repository.User, error) {
	offerInfo, err := o.repo.GetOfferById(ctx, int32(id))
	if err != nil {
		return repository.Offer{}, repository.User{}, err
	}

	userID := offerInfo.UserID.Int32
	userInfo, err := o.repo.GetUserByID(ctx, userID)
	if err != nil {
		return repository.Offer{}, repository.User{}, err
	}

	return offerInfo, userInfo, nil
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
