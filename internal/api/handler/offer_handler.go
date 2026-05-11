package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/udavikhin/gopher-garage/internal/domain"
)

type OfferHandler struct {
}

func NewOfferHandler() *OfferHandler {
	return &OfferHandler{}
}

func (h *OfferHandler) CreateOffer(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)

	var requestBody string

	if err := decoder.Decode(&requestBody); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

}

func (h *OfferHandler) GetOffer(w http.ResponseWriter, r *http.Request) {
	offer := &domain.Offer{
		Id:          1,
		User:        "udavikhin",
		Vehicle:     "Mazda 6",
		Description: "Продам свой автомобиль с небольшим оригинальным пробегом и без окрасов",
		Price:       2200000,
		CreatedAt:   time.Now(),
	}

	encodedOffer, err := json.Marshal(offer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Write([]byte(encodedOffer))
}

func (h *OfferHandler) ListOffers(w http.ResponseWriter, r *http.Request) {
}

func (h *OfferHandler) DeleteOffer(w http.ResponseWriter, r *http.Request) {
}
