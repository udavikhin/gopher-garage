package handler

import (
	"net/http"

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

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {}

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {}
