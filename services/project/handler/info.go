package handler

import (
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"
)

func (h *Handler) HandleProjectInfo(w http.ResponseWriter, r *http.Request) {
	userId, ok := r.Context().Value("userId").(string)
	if !ok {
		userId = "-1"
	}

	projId := r.PathValue("id")
	info, err := h.projStorage.GetProjectInfo(r.Context(), userId, projId)
	if err == sql.ErrNoRows {
		slog.Info("project not found", "id", projId)
		w.WriteHeader(http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("error getting project info", "err", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	bytes, err := json.Marshal(info)
	if err != nil {
		slog.Error("error marshalling project info", "err", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}
