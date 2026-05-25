include .env

dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up
new-migration:
	migrate create -ext sql -dir ./migrations/ -seq $(NAME)
migrate-up:
	migrate -path ./migrations -database postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@localhost:$(POSTGRES_DEV_PORT)/$(POSTGRES_DB)?sslmode=disable up