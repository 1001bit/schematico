package handler

import (
	"net/http"
)

func (h *Handler) HandleLogout(w http.ResponseWriter, r *http.Request) {
	if cookie, err := r.Cookie("jwt"); err == nil {
		cookie.MaxAge = -1
		cookie.Value = ""
		cookie.Path = "/api"
		http.SetCookie(w, cookie)
	}

	if cookie, err := r.Cookie("uuid"); err == nil {
		h.uuidstorage.DeleteUUID(r.Context(), cookie.Value)
		cookie.MaxAge = -1
		cookie.Value = ""
		cookie.Path = "/api/user"
		http.SetCookie(w, cookie)
	}
}
