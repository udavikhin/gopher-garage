package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/udavikhin/gopher-garage/internal/api/handler"
)

func NewRouter(handlers *handler.Handlers) *chi.Mux {
	r := chi.NewRouter()

	r.Route("/api/v1", func(r chi.Router) {
		r.Use(middleware.SetHeader("Content-Type", "application/json"))
		r.Route("/offers", func(r chi.Router) {
			r.Get("/{id}", handlers.Offer.GetOffer)
		})
	})

	return r
}
