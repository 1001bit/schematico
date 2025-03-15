package server

import (
	"github.com/1001bit/schematico/services/project/handler"
	"github.com/go-chi/chi/v5"
)

func newRouter(h *handler.Handler) *chi.Mux {
	r := chi.NewRouter()

	r.Post("/new", h.HandleNewProject)

	return r
}
