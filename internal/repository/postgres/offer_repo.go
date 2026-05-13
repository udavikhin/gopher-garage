package repository

import (
	"github.com/jackc/pgx/v5"
	"github.com/udavikhin/gopher-garage/internal/domain"
)

type OfferRepositoryPostgres struct {
	conn *pgx.Conn
}

func NewOfferRepositoryPostgres(conn *pgx.Conn) *OfferRepositoryPostgres {
	return &OfferRepositoryPostgres{conn: conn}
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
