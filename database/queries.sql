-- name: GetAllOffers :many
SELECT o.*, COALESCE(p.id, 0) AS photo_id, COALESCE(p.filename, '') AS photo_filename
FROM offers o
LEFT JOIN LATERAL (
    SELECT id, filename FROM offer_photos WHERE offer_id = o.id ORDER BY position LIMIT 1
) p ON true;

-- name: GetOffersCount :one
SELECT count(*) FROM offers;

-- name: GetOfferById :one
SELECT * FROM offers WHERE id = $1;

-- name: AddOffer :one
INSERT INTO offers (user_id, make, model, year, gearbox, mileage, color, fuel, price, owners, negotiable, description)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING id;

-- name: RemoveOffer :exec
DELETE FROM offers WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: AddUser :one
INSERT INTO users (email, full_name, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING id;

-- name: AddRefreshToken :one
INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id;

-- name: GetRefreshTokenByHash :one
SELECT * FROM refresh_tokens WHERE token_hash = $1 AND expires_at > NOW();

-- name: DeleteRefreshTokenByHash :exec
DELETE FROM refresh_tokens WHERE token_hash = $1;

-- name: GetPhotosByOfferID :many
SELECT id, offer_id, filename, position FROM offer_photos WHERE offer_id = $1 ORDER BY position;

-- name: AddOfferPhoto :one
INSERT INTO offer_photos (offer_id, filename, position) VALUES ($1, $2, $3) RETURNING id;