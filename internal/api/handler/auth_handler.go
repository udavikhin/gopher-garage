package handler

import (
	"encoding/json"
	"net/http"

	"github.com/udavikhin/gopher-garage/internal/api/handler/auth"
	"github.com/udavikhin/gopher-garage/internal/service"
	"github.com/udavikhin/gopher-garage/pkg/validator"
)

type AuthHandler struct {
	services *service.Services
}

func NewAuthHandler(services *service.Services) *AuthHandler {
	return &AuthHandler{
		services: services,
	}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var data auth.LoginUserRequest
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Get().Struct(data); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	tokenPair, err := h.services.Auth.Login(r.Context(), data.Email, data.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, h.services.Auth.RefreshTokenCookie(tokenPair.Refresh))

	if err := json.NewEncoder(w).Encode(map[string]string{"access_token": tokenPair.JWT}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var data auth.RegisterUserRequest
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := validator.Get().Struct(data); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	userId, err := h.services.Auth.Register(r.Context(), data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(userId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	tokenPair, err := h.services.Auth.Refresh(r.Context(), cookie.Value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, h.services.Auth.RefreshTokenCookie(tokenPair.Refresh))

	if err := json.NewEncoder(w).Encode(map[string]string{"access_token": tokenPair.JWT}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
