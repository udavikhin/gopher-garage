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
			http.Error(w, err.Error(), http.StatusUnprocessableEntity)
			log.Println(err)
			return
		}
	}

	offerId, err := h.services.Offer.CreateOffer(offerBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	_, err = w.Write([]byte(strconv.Itoa(offerId)))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func (h *OfferHandler) GetOffer(w http.ResponseWriter, r *http.Request) {
	offerIdUrlParam := chi.URLParam(r, "id")
	offerId, err := strconv.Atoi(offerIdUrlParam)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}
	offer, err := h.services.Offer.GetOfferInfo(offerId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}

	encodedOffer, err := json.Marshal(offer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	_, err = w.Write(encodedOffer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func (h *OfferHandler) ListOffers(w http.ResponseWriter, r *http.Request) {
	offers, err := h.services.Offer.GetOfferListing()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
	encodedOffers, err := json.Marshal(offers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	_, err = w.Write(encodedOffers)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func (h *OfferHandler) DeleteOffer(w http.ResponseWriter, r *http.Request) {
	offerIdUrlParam := chi.URLParam(r, "id")
	offerId, err := strconv.Atoi(offerIdUrlParam)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}
	if err = h.services.Offer.RemoveOffer(offerId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}
