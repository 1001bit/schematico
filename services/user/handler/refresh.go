package handler

import "net/http"

func (h *Handler) HandleRefresh(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)
}
