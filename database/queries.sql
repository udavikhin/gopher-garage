-- name: GetAllOffers :many
SELECT * FROM offers;

-- name: GetOfferById :one
SELECT * FROM offers WHERE id = $1;

-- name: AddOffer :one
INSERT INTO offers (user_id, make, model, gearbox, mileage, color, fuel, price, negotiable, description)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING id;

-- name: RemoveOffer :exec
DELETE FROM offers WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: AddUser :one
INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3) RETURNING id;

-- name: AddRefreshToken :one
INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id;

-- name: GetRefreshTokenByHash :one
SELECT * FROM refresh_tokens WHERE token_hash = $1 AND expires_at > NOW();

-- name: DeleteRefreshTokenByHash :exec
DELETE FROM refresh_tokens WHERE token_hash = $1;
