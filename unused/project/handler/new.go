package handler

import (
	"fmt"
	"log/slog"
	"net/http"
)

func (h *Handler) HandleNewProject(w http.ResponseWriter, r *http.Request) {
	userId, ok := r.Context().Value("userId").(string)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	projId, err := h.projStorage.Add(r.Context(), userId)
	if err != nil {
		slog.Error("error adding project", "err", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"id": "%s"}`, projId)
}
