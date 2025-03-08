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

func (s *Server) Run(port string, userAddr string) error {
	r, err := s.NewRouter(userAddr)
	if err != nil {
		return err
	}

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
