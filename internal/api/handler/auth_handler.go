package handler

import (
	"encoding/json"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/udavikhin/gopher-garage/internal/api/handler/auth"
	repository "github.com/udavikhin/gopher-garage/internal/repository/postgres"
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

	accessToken, err := h.services.Auth.Login(r.Context(), data.Email, data.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := json.NewEncoder(w).Encode(accessToken); err != nil {
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

	userParams := repository.AddUserParams{
		Email: data.Email,
		FirstName: pgtype.Text{
			String: data.FirstName,
			Valid:  true,
		},
		LastName: pgtype.Text{
			String: data.LastName,
			Valid:  true,
		},
		Patronymic: pgtype.Text{
			String: data.Patronymic,
			Valid:  data.Patronymic != "",
		},
		Password: data.Password,
	}

	userId, err := h.services.Auth.Register(r.Context(), userParams)
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

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {}
