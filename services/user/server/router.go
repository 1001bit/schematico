package server

import (
	"github.com/1001bit/schematico/services/user/handler"
	"github.com/1001bit/schematico/services/user/shared/jwtmiddleware"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
)

func newRouter(h *handler.Handler) *chi.Mux {
	r := chi.NewRouter()
	r.Use(chimw.Logger)

	r.Group(func(r chi.Router) {
		r.Use(jwtmiddleware.ClaimsToContext)
		r.Post("/signin", h.HandleSignIn)
		r.Post("/refresh", h.HandleRefresh)
	})
	r.Post("/logout", h.HandleLogout)

	return r
}
