-- name: GetAllOffers :many
SELECT * FROM offers;

-- name: GetOfferById :one
SELECT * FROM offers WHERE id = $1;

-- name: AddOffer :one
INSERT INTO offers (user_id, vehicle, description, price) VALUES ($1, $2, $3, $4) RETURNING id;

-- name: RemoveOffer :exec
DELETE FROM offers WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: AddUser :one
INSERT INTO users (email, first_name, last_name, patronymic, password) VALUES ($1, $2, $3, $4, $5) RETURNING id;

-- name: AddRefreshToken :one
INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id;