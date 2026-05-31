package routes

import (
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/api/handler"
	"github.com/udavikhin/gopher-garage/internal/middleware"
)

func NewRouter(handlers *handler.Handlers) http.Handler {
	r := http.NewServeMux()

	apiV1 := http.NewServeMux()
	apiV1.HandleFunc("GET /offers/{id}", handlers.Offer.GetOffer)
	apiV1.HandleFunc("POST /offers", handlers.Offer.CreateOffer)

	r.Handle(
		"/api/v1/",
		http.StripPrefix("/api/v1", middleware.Chain(middleware.ContentTypeJsonMiddleware)(apiV1)),
	)

	return middleware.Chain(middleware.LoggingMiddleware)(r)
}
