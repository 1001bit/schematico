package handler

import (
	"log/slog"
	"net/http"
)

func (h *Handler) HandleNewProject(w http.ResponseWriter, r *http.Request) {
	userId, ok := r.Context().Value("userId").(string)
	if ok {
		slog.Info("userId", "userId", userId)
	}

	w.WriteHeader(http.StatusNotImplemented)
}
