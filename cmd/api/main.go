package main

import (
	"log"
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/api/routes"
	"github.com/udavikhin/gopher-garage/internal/config"
)

func main() {
	cfg := config.NewConfig()

	r := routes.NewRouter()

	server := &http.Server{
		Addr:    ":" + cfg.Server.Port,
		Handler: r,
	}

	log.Printf("Starting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
