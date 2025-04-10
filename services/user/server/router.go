package server

import (
	"net/http"
	"time"

	"github.com/1001bit/schematico/services/user/handler"
	"github.com/1001bit/schematico/services/user/shared/jwtmiddleware"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
	"github.com/rs/cors"
)

func newRouter(h *handler.Handler) http.Handler {
	r := chi.NewRouter()

	r.Use(chimw.Logger)
	r.Use(chimw.RedirectSlashes)
	r.Use(chimw.Timeout(10 * time.Second))
	r.Use(chimw.CleanPath)
	r.Use(httprate.LimitByIP(100, 1*time.Minute))

	r.Group(func(r chi.Router) {
		r.Use(jwtmiddleware.ClaimsToContext)
		r.Post("/login", h.HandleLogin)
		r.Post("/refresh", h.HandleRefresh)
	})
	r.Post("/logout", h.HandleLogout)

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(r)

	return handler
}
