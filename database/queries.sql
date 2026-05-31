-- name: GetAllOffers :many
SELECT * FROM offers;

-- name: GetOfferById :one
SELECT * FROM offers WHERE id = $1;

-- name: AddOffer :one
INSERT INTO offers (user_id, vehicle, description, price) VALUES ($1, $2, $3, $4) RETURNING id;