package offer

import (
	"github.com/udavikhin/gopher-garage/internal/api/handler/user"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
)

type PhotoResponse struct {
	ID  int32  `json:"id"`
	URL string `json:"url"`
}

type GetOfferResponse struct {
	repository.Offer
	User   user.GetUserResponse `json:"user"`
	Photos []PhotoResponse      `json:"photos"`
}

type ListOfferResponse struct {
	repository.GetAllOffersRow
	PhotoURL string `json:"photo_url"`
}
