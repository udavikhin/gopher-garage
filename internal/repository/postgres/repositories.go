package repository

import (
	"github.com/jackc/pgx/v5"
	"github.com/udavikhin/gopher-garage/internal/repository"
)

func NewRepositoriesPostgres(conn *pgx.Conn) repository.Repositories {
	return repository.Repositories{
		Offer: NewOfferRepositoryPostgres(conn),
	}
}
