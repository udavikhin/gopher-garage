package service

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/udavikhin/gopher-garage/internal/api/handler/offer"
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
		Owners:      pgtype.Int2{Int16: int16(offerData.Owners), Valid: true},
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

func (o *OfferService) GetOfferListing() ([]repository.GetAllOffersRow, error) {
	return o.repo.GetAllOffers(context.Background())
}

func (o *OfferService) SearchOffers(ctx context.Context, filter offer.GetOffersFilter) ([]repository.GetAllOffersRow, int, error) {
	perPage := filter.PerPage
	if perPage <= 0 {
		perPage = 10
	}
	page := filter.Page
	if page <= 0 {
		page = 1
	}

	return o.repo.SearchOffers(ctx, repository.SearchOfferParams{
		Make:     filter.Make,
		Model:    filter.Model,
		PriceMin: filter.PriceMin,
		PriceMax: filter.PriceMax,
		YearMin:  filter.YearMin,
		YearMax:  filter.YearMax,
		Gearbox:  filter.Gearbox,
		Page:     page,
		PerPage:  perPage,
	})
}

func (o *OfferService) RemoveOffer(id int) error {
	if err := o.repo.RemoveOffer(context.Background(), int32(id)); err != nil {
		return err
	}

	return nil
}

func (o *OfferService) AddPhoto(ctx context.Context, offerID int32, filename string, position int16) error {
	_, err := o.repo.AddOfferPhoto(ctx, repository.AddOfferPhotoParams{
		OfferID:  pgtype.Int4{Int32: offerID, Valid: true},
		Filename: filename,
		Position: position,
	})
	return err
}

func (o *OfferService) GetPhotos(ctx context.Context, offerID int32) ([]repository.GetPhotosByOfferIDRow, error) {
	return o.repo.GetPhotosByOfferID(ctx, pgtype.Int4{Int32: offerID, Valid: true})
}

func (o *OfferService) SetOfferArchivedAt(ctx context.Context, offerID int32, value time.Time) error {
	offerData, err := o.repo.GetOfferById(ctx, offerID)
	if err != nil {
		return err
	}

	ctxUserID, ok := ctx.Value(domain.UserIDKey).(int)
	if !ok {
		return errors.New("unauthorized")
	}

	if offerData.UserID.Int32 != int32(ctxUserID) {
		return errors.New("forbidden")
	}

	return o.repo.SetOfferArchivedAt(ctx, repository.SetOfferArchivedAtParams{
		ArchivedAt: pgtype.Timestamp{Time: value, Valid: !value.IsZero()},
		ID:         offerID,
	})
}
