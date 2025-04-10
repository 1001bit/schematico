package server

import (
	"net/http"

	"github.com/1001bit/schematico/services/project/handler"
	"github.com/1001bit/schematico/services/project/shared/jwtmiddleware"
	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

func newRouter(h *handler.Handler) http.Handler {
	r := chi.NewRouter()

	r.Use(jwtmiddleware.ClaimsToContext)
	r.Post("/new", h.HandleNewProject)
	r.Get("/mylist", h.HandleProjectsList)
	r.Get("/info/{id}", h.HandleProjectInfo)

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(r)

	return handler
}
