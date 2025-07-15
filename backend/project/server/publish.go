package server

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
)

type PublishRequest struct {
	Name string `json:"name"`
	Map  string `json:"map"`
}

func (s *Server) publishProject(w http.ResponseWriter, r *http.Request) {
	req := PublishRequest{"new project", "{}"}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	newId, err := s.projStorage.PublishProject(r.Context(), req.Name, req.Map)
	if err != nil {
		slog.Error("error publishing project", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"id": "%s"}`, newId)
}
