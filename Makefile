include .env

dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
	cd frontend && npm run dev
build-frontend:
	cd frontend && npm run build && cd ..
new-migration:
	migrate create -ext sql -dir ./migrations/ -seq $(NAME)
migrate-up:
	migrate -path ./migrations -database postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@localhost:$(POSTGRES_DEV_PORT)/$(POSTGRES_DB)?sslmode=disable up