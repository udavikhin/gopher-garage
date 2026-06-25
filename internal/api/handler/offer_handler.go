package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
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
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, err.Error(), http.StatusNotFound)
			log.Println(err)
			return
		}
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		log.Println(err)
		return
	}

	rawPhotos, err := h.services.Offer.GetPhotos(r.Context(), offerInfo.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	photos := make([]offer.PhotoResponse, len(rawPhotos))
	for i, p := range rawPhotos {
		photos[i] = offer.PhotoResponse{
			ID:  p.ID,
			URL: fmt.Sprintf("/uploads/offers/%d/%s", offerInfo.ID, p.Filename),
		}
	}

	if err := json.NewEncoder(w).Encode(offer.GetOfferResponse{
		Offer: offerInfo,
		User: user.GetUserResponse{
			ID:          userInfo.ID,
			FullName:    userInfo.FullName,
			PhoneNumber: userInfo.PhoneNumber,
		},
		Photos: photos,
	}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func (h *OfferHandler) UploadPhotos(w http.ResponseWriter, r *http.Request) {
	offerID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := r.ParseMultipartForm(200 << 20); err != nil {
		http.Error(w, "request too large", http.StatusRequestEntityTooLarge)
		return
	}

	files := r.MultipartForm.File["photos"]
	uploadDir := fmt.Sprintf("/uploads/offers/%d", offerID)
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	for i, fh := range files {
		ext := filepath.Ext(fh.Filename)
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			http.Error(w, "только JPG и PNG", http.StatusUnprocessableEntity)
			return
		}

		filename := fmt.Sprintf("%d_%d%s", time.Now().UnixNano(), i, ext)

		src, err := fh.Open()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println(err)
			return
		}
		defer src.Close()

		dst, err := os.Create(filepath.Join(uploadDir, filename))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println(err)
			return
		}
		defer dst.Close()

		if _, err := io.Copy(dst, src); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println(err)
			return
		}

		if err := h.services.Offer.AddPhoto(r.Context(), int32(offerID), filename, int16(i)); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println(err)
			return
		}
	}

	w.WriteHeader(http.StatusCreated)
}

func queryGetInt(q url.Values, key string) int {
	v, err := strconv.Atoi(q.Get(key))
	if err != nil {
		log.Println(err)
	}
	return v
}

func (h *OfferHandler) ListOffers(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	filter := offer.GetOffersFilter{
		Make:     query.Get("make"),
		Model:    query.Get("model"),
		Gearbox:  query.Get("gearbox"),
		PriceMin: queryGetInt(query, "price_min"),
		PriceMax: queryGetInt(query, "price_max"),
		YearMin:  queryGetInt(query, "year_min"),
		YearMax:  queryGetInt(query, "year_max"),
		Page:     queryGetInt(query, "page"),
		PerPage:  queryGetInt(query, "per_page"),
	}

	offers, total, err := h.services.Offer.SearchOffers(r.Context(), filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	response := make([]offer.ListOfferResponse, len(offers))
	for i, o := range offers {
		var photoURL string
		if o.PhotoFilename != "" {
			photoURL = fmt.Sprintf("/uploads/offers/%d/%s", o.ID, o.PhotoFilename)
		}
		response[i] = offer.ListOfferResponse{GetAllOffersRow: o, PhotoURL: photoURL}
	}

	if err := json.NewEncoder(w).Encode(map[string]any{
		"offers": response,
		"total":  total,
	}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
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
