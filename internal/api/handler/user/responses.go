package user

import "github.com/jackc/pgx/v5/pgtype"

type GetUserResponse struct {
	ID          int32       `json:"id"`
	FullName    pgtype.Text `json:"full_name"`
	PhoneNumber pgtype.Text `json:"phone_number"`
}
