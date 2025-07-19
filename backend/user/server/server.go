package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/1001bit/schematico/backend/user/model"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

type Server struct {
	userStorage *model.UserStorage
}

func New(us *model.UserStorage) *Server {
	return &Server{
		userStorage: us,
	}
}

func (s *Server) Run(port string) error {
	r := chi.NewRouter()

	r.Use(chimw.Logger)
	r.Use(chimw.Timeout(10 * time.Second))
	r.Use(chimw.CleanPath)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hi"))
	})

	rSecure := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(r)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, rSecure)
}
