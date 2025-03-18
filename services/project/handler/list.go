package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
)

func (h *Handler) HandleProjectsList(w http.ResponseWriter, r *http.Request) {
	userId, ok := r.Context().Value("userId").(string)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	list, err := h.projStorage.GetProjectList(r.Context(), userId)
	if err == sql.ErrNoRows {
		fmt.Fprint(w, `{"projects": []}`)
		return
	}

	msg, err := json.Marshal(map[string]any{
		"projects": list,
	})
	if err != nil {
		slog.Error("error marshaling projects msg", "err", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(msg)
}
