package server

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

type DeleteRequest struct {
	Id string `json:"id"`
}

func (s *Server) deleteProject(w http.ResponseWriter, r *http.Request) {
	req := DeleteRequest{""}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = s.projStorage.DeleteProject(r.Context(), req.Id)
	if err != nil {
		slog.Error("error deleting project", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
