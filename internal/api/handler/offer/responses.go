package offer

import (
	"github.com/udavikhin/gopher-garage/internal/api/handler/user"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
)

type GetOfferResponse struct {
	repository.Offer
	User user.GetUserResponse `json:"user"`
}
