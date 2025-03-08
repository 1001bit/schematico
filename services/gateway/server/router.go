package server

import (
	"net/http"

	"github.com/1001bit/schematico/services/gateway/handler"
	"github.com/go-chi/chi/v5"
)

func staticHandler() http.Handler {
	return http.FileServer(http.Dir("static"))
}

func (s *Server) NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Get("/", handler.HandleHome)
	r.Get("/static/*", http.StripPrefix("/static/", staticHandler()).ServeHTTP)

	return r
}
