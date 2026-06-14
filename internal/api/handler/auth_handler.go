package handler

import (
	"encoding/json"
	"net/http"

	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
	"github.com/udavikhin/gopher-garage/internal/service"
)

type AuthHandler struct {
	services *service.Services
}

func NewAuthHandler(services *service.Services) *AuthHandler {
	return &AuthHandler{
		services: services,
	}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var data repository.AddUserParams
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	userId, err := h.services.Auth.Register(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusAccepted)

	if err := json.NewEncoder(w).Encode(userId); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {}
