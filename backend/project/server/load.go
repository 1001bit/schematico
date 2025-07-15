package server

import (
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
)

func (s *Server) loadProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	project, err := s.projStorage.GetProject(r.Context(), id)
	if err == sql.ErrNoRows {
		w.WriteHeader(http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("error getting project", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"name": "%s", "map": %s}`, project.Name, project.MapStr)
}
