package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/udavikhin/gopher-garage/internal/api/handler/offer"
	"github.com/udavikhin/gopher-garage/internal/api/handler/user"
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

	var offerBody offer.CreateOfferRequest

	if err := decoder.Decode(&offerBody); err != nil {
		if err.Error() != "EOF" {
			http.Error(w, err.Error(), http.StatusUnprocessableEntity)
			log.Println(err)
			return
		}
	}

	userID, ok := r.Context().Value(domain.UserIDKey).(int)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	offerId, err := h.services.Offer.CreateOffer(offerBody, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	if err := json.NewEncoder(w).Encode(map[string]int{"id": offerId}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func (h *OfferHandler) GetOffer(w http.ResponseWriter, r *http.Request) {
	offerIdUrlParam := r.PathValue("id")
	offerId, err := strconv.Atoi(offerIdUrlParam)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}
	offerInfo, userInfo, err := h.services.Offer.GetOfferInfo(r.Context(), offerId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}

	if err := json.NewEncoder(w).Encode(offer.GetOfferResponse{Offer: offerInfo, User: user.GetUserResponse{
		ID:          userInfo.ID,
		FullName:    userInfo.FullName,
		PhoneNumber: userInfo.PhoneNumber,
	}}); err != nil {
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
	offerIdUrlParam := r.PathValue("id")
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
