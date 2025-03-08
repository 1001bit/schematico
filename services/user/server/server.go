package server

import (
	"fmt"
	"net/http"
)

type Server struct {
}

func New() *Server {
	return &Server{}
}

func (s *Server) Run(port string) error {
	r := s.NewRouter()

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
