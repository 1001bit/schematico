package server

import (
	"github.com/1001bit/schematico/services/project/handler"
	"github.com/1001bit/schematico/services/project/shared/jwtmiddleware"
	"github.com/go-chi/chi/v5"
)

func newRouter(h *handler.Handler) *chi.Mux {
	r := chi.NewRouter()

	r.Use(jwtmiddleware.ClaimsToContext)
	r.Post("/new", h.HandleNewProject)
	r.Get("/mylist", h.HandleProjectsList)

	return r
}
