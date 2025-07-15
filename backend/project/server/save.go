package server

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

type SaveRequest struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Map  string `json:"map"`
}

func (s *Server) saveProject(w http.ResponseWriter, r *http.Request) {
	req := SaveRequest{"", "", ""}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = s.projStorage.SaveProject(r.Context(), req.Id, req.Name, req.Map)
	if err != nil {
		slog.Error("error saving project", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
