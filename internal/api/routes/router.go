package routes

import (
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/api/handler"
	"github.com/udavikhin/gopher-garage/internal/config"
	"github.com/udavikhin/gopher-garage/internal/middleware"
)

func NewRouter(handlers *handler.Handlers, cfg *config.Config) http.Handler {
	r := http.NewServeMux()

	authSecret := []byte(cfg.Auth.JWTSecret)
	authMiddleware := middleware.AuthMiddleware(authSecret)

	apiV1 := http.NewServeMux()
	apiV1.HandleFunc("GET /offers", handlers.Offer.ListOffers)
	apiV1.HandleFunc("GET /offers/{id}", handlers.Offer.GetOffer)
	apiV1.Handle("POST /offers", authMiddleware(http.HandlerFunc(handlers.Offer.CreateOffer)))
	apiV1.Handle("DELETE /offers/{id}", authMiddleware(http.HandlerFunc(handlers.Offer.DeleteOffer)))

	r.Handle(
		"/api/v1/",
		http.StripPrefix("/api/v1", middleware.Chain(middleware.ContentJsonMiddleware)(apiV1)),
	)

	auth := http.NewServeMux()
	auth.HandleFunc("POST /login", handlers.Auth.Login)
	auth.HandleFunc("POST /logout", handlers.Auth.Logout)
	auth.HandleFunc("POST /register", handlers.Auth.Register)
	auth.HandleFunc("POST /refresh", handlers.Auth.Refresh)

	r.Handle(
		"/auth/",
		http.StripPrefix("/auth", middleware.Chain(middleware.ContentJsonMiddleware)(auth)),
	)

	return middleware.Chain(middleware.LoggingMiddleware)(r)
}
