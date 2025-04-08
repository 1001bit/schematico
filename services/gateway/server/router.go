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

func newRouter(userAddr, projAddr, frontAddr string) (*chi.Mux, error) {
	r := chi.NewRouter()

	r.Use(chimw.CleanPath)
	r.Use(chimw.Logger)

	userProxy, err := httpproxy.New(userAddr)
	if err != nil {
		return nil, err
	}

	projProxy, err := httpproxy.New(projAddr)
	if err != nil {
		return nil, err
	}

	frontendProxy, err := httpproxy.New(frontAddr)
	if err != nil {
		return nil, err
	}

	r.Get("/static/*", http.StripPrefix("/static/", staticHandler()).ServeHTTP)

	r.Route("/old", func(r chi.Router) {
		r.Get("/", handler.HandleHome)
		r.Get("/signin", handler.HandleSignIn)
		r.Get("/project/{id}", handler.HandleProject)
	})

	r.Route("/api", func(r chi.Router) {
		r.Handle("/user/*", userProxy.ProxyHandler("/api/user"))
		r.Handle("/project/*", projProxy.ProxyHandler("/api/project"))
	})

	r.Get("/*", frontendProxy.ProxyHandler("/").ServeHTTP)

	return r, nil
}
