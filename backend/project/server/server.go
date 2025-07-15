package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/1001bit/schematico/backend/project/model"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

type Server struct {
	projStorage *model.ProjectStorage
}

func New(projStorage *model.ProjectStorage) *Server {
	return &Server{
		projStorage: projStorage,
	}
}

func (s *Server) Run(port string) error {
	r := chi.NewRouter()

	r.Use(chimw.Logger)
	r.Use(chimw.Timeout(10 * time.Second))
	r.Use(chimw.CleanPath)

	r.Post("/", s.publishProject)
	r.Put("/", s.saveProject)
	r.Get("/{id}", s.loadProject)
	r.Delete("/", s.deleteProject)

	rSecure := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(r)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, rSecure)
}
