package routes

import (
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/api/handler"
)

func NewRouter(handlers *handler.Handlers) http.Handler {
	r := http.NewServeMux()

	apiV1 := http.NewServeMux()
	apiV1.HandleFunc("GET /offers/{id}", handlers.Offer.GetOffer)
	apiV1.HandleFunc("POST /offers", handlers.Offer.CreateOffer)

	r.Handle("/api/v1/", http.StripPrefix("/api/v1", apiV1))

	return r
}
