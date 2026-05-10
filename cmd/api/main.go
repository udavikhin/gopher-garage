package main

import (
	"log"
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/config"
)

func main() {
	cfg := config.NewConfig()

	server := &http.Server{
		Addr: ":" + cfg.Server.Port,
	}

	log.Printf("Starting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
