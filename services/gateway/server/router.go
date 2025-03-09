package server

import (
	"net/http"

	"github.com/1001bit/schematico/services/gateway/handler"
	"github.com/1001bit/schematico/services/gateway/httpproxy"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
)

func staticHandler() http.Handler {
	return http.FileServer(http.Dir("static"))
}

func (s *Server) NewRouter(userAddr string) (*chi.Mux, error) {
	r := chi.NewRouter()

	r.Use(chimw.CleanPath)

	userProxy, err := httpproxy.New(userAddr)
	if err != nil {
		return nil, err
	}

	r.Get("/static/*", http.StripPrefix("/static/", staticHandler()).ServeHTTP)

	r.Get("/", handler.HandleHome)
	r.Get("/signin", handler.HandleSignIn)

	r.Route("/api", func(r chi.Router) {
		r.Get("/user/*", userProxy.ProxyHandler("/api/user").ServeHTTP)
	})

	return r, nil
}
