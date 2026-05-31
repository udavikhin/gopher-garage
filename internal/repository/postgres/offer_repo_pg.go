package repository

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5"
	"github.com/udavikhin/gopher-garage/internal/domain"
)

type OfferRepositoryPostgres struct {
	conn *pgx.Conn
}

func NewOfferRepositoryPostgres(conn *pgx.Conn) *OfferRepositoryPostgres {
	return &OfferRepositoryPostgres{conn: conn}
}

func (r *OfferRepositoryPostgres) CreateOffer(offer domain.Offer) (int, error) {
	var id int

	err := r.conn.QueryRow(context.Background(), "INSERT INTO offers (user_id, vehicle, description, price) VALUES ($1, $2, $3, $4) RETURNING id",
		1,
		offer.Vehicle,
		offer.Description,
		offer.Price,
	).Scan(&id)
	if err != nil {
		log.Println(err)
		return 0, err
	}

	return id, nil
}

func (r *OfferRepositoryPostgres) GetOffer(id int) (domain.Offer, error) {
	var offer domain.Offer

	offerRow := r.conn.QueryRow(context.Background(), "SELECT user_id, vehicle, description, price FROM offers WHERE id = $1", id)
	err := offerRow.Scan(&offer.User, &offer.Vehicle, &offer.Description, &offer.Price)
	if err != nil {
		log.Println(err)
		return domain.Offer{}, err
	}

	return offer, nil
}

func (r *OfferRepositoryPostgres) GetAll() ([]domain.Offer, error) {
	//TODO implement me
	panic("implement me")
}

func (r *OfferRepositoryPostgres) RemoveOffer(id int) error {
	//TODO implement me
	panic("implement me")
}
