package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/go-chi/chi/v5"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5"
	"github.com/udavikhin/gopher-garage/internal/api/handler"
	"github.com/udavikhin/gopher-garage/internal/api/routes"
	"github.com/udavikhin/gopher-garage/internal/config"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
	"github.com/udavikhin/gopher-garage/internal/service"
)

func main() {
	cfg := config.NewConfig()

	dsn := getConnectionString(cfg.Database)

	conn := initDb(dsn)
	defer conn.Close(context.Background())

	runMigrations(dsn)

	repositories := repository.NewRepositoriesPostgres(conn)
	services := service.NewServices(repositories)
	handlers := handler.NewHandlers(services)

	r := routes.NewRouter(handlers)

	runServer(r, cfg.Server)
}

func initDb(dsn string) *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err)
	}
	return conn
}

func runMigrations(dsn string) {
	log.Println("Running migrations...")

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"postgres",
		driver,
	)

	if err != nil {
		log.Fatalf("Error creating migrate instance: %s", err)
	}

	if err := m.Up(); err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			log.Printf("Nothing to migrate")
			return
		}
		log.Fatalf("Error running migrations: %s", err)
	}
}

func getConnectionString(cfg *config.DatabaseConfig) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		cfg.User,
		url.QueryEscape(cfg.Password),
		cfg.Host,
		cfg.Port,
		cfg.Database,
	)
}

func runServer(mux *chi.Mux, cfg *config.ServerConfig) {
	server := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: mux,
	}

	log.Printf("Starting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
