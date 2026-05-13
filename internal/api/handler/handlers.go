package handler

import "github.com/udavikhin/gopher-garage/internal/service"

type Handlers struct {
	Offer *OfferHandler
}

func NewHandlers(services *service.Services) *Handlers {
	return &Handlers{
		Offer: NewOfferHandler(services),
	}
}
