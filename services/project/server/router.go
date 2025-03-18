package server

import (
	"github.com/1001bit/schematico/services/project/handler"
	"github.com/go-chi/chi/v5"
)

func newRouter(h *handler.Handler) *chi.Mux {
	r := chi.NewRouter()

	r.Use(claimsToContextMW)
	r.Post("/new", h.HandleNewProject)
	r.Get("/mylist", h.HandleProjectsList)

	return r
}
