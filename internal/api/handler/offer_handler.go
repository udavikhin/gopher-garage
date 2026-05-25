package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/udavikhin/gopher-garage/internal/domain"
	"github.com/udavikhin/gopher-garage/internal/service"
)

type OfferHandler struct {
	services *service.Services
}

func NewOfferHandler(services *service.Services) *OfferHandler {
	return &OfferHandler{
		services: services,
	}
}

func (h *OfferHandler) CreateOffer(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)

	var offerBody domain.Offer

	if err := decoder.Decode(&offerBody); err != nil {
		if err.Error() != "EOF" {
			w.WriteHeader(http.StatusBadRequest)
			log.Println(err)
			return
		}
	}

	offer, err := h.services.Offer.CreateOffer(offerBody)
	if err != nil {
		return
	}

	w.Write([]byte(strconv.Itoa(offer)))
}

func (h *OfferHandler) GetOffer(w http.ResponseWriter, r *http.Request) {
	offerIdUrlParam := chi.URLParam(r, "id")
	offerId, err := strconv.Atoi(offerIdUrlParam)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	offer, err := h.services.Offer.GetOfferInfo(offerId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
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
