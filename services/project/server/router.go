package server

import (
	"net/http"
	"time"

	"github.com/1001bit/schematico/services/project/handler"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

func newRouter(h *handler.Handler) http.Handler {
	r := chi.NewRouter()

	r.Use(chimw.Logger)
	r.Use(chimw.RedirectSlashes)
	r.Use(chimw.Timeout(10 * time.Second))
	r.Use(chimw.CleanPath)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hi :3"))
	})

	return cors.New(cors.Options{
		AllowedOrigins:   []string{"https://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(r)
}
