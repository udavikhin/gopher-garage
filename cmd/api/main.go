package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/udavikhin/gopher-garage/internal/api/routes"
	"github.com/udavikhin/gopher-garage/internal/config"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	cfg := config.NewConfig()

	r := routes.NewRouter()

	server := &http.Server{
		Addr:    ":" + cfg.Server.Port,
		Handler: r,
	}

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		cfg.Database.User,
		url.QueryEscape(cfg.Database.Password),
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.Database,
	)

	fmt.Println(dsn)

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err)
	}
	defer conn.Close(context.Background())

	log.Printf("Starting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
