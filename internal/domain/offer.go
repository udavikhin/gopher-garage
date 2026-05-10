package domain

import "time"

type Offer struct {
	Id          int       `json:"id,omitempty"`
	User        string    `json:"user,omitempty"`
	Vehicle     string    `json:"vehicle,omitempty"`
	Description string    `json:"description,omitempty"`
	Price       float64   `json:"price,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}
