package server

import (
	"github.com/1001bit/schematico/services/user/handler"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
)

func newRouter(h *handler.Handler) *chi.Mux {
	r := chi.NewRouter()
	r.Use(chimw.Logger)

	r.Post("/signin", h.HandleSignIn)

	return r
}
