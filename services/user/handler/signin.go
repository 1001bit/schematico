package handler

import (
	"fmt"
	"net/http"
)

func (h *Handler) HandleSignIn(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)
	fmt.Fprintf(w, `{"message": "TODO"}`)
}
