package handler

import (
	"log/slog"
	"net/http"

	"github.com/1001bit/schematico/services/user/accessjwt"
	"github.com/redis/go-redis/v9"
)

func (h *Handler) HandleRefresh(w http.ResponseWriter, r *http.Request) {
	// get uuid cookie
	cookie, err := r.Cookie("uuid")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// get userId from uuid and validate uuid
	userId, err := h.uuidstorage.GetIdByUUID(r.Context(), cookie.Value)
	if err == redis.Nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	} else if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		slog.Error("error getting uuid from redis", "err", err)
		return
	}

	// delete current uuid to set new
	err = h.uuidstorage.DeleteUUID(r.Context(), cookie.Value)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		slog.Error("error deleting old uuid from redis", "err", err)
		return
	}

	// setting new uuid and generating cookie
	cookie, err = h.uuidstorage.GenerateUUIDCookie(r.Context(), userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		slog.Error("error generating uuid cookie", "err", err)
		return
	}
	http.SetCookie(w, cookie)

	// generating new jwt cookie
	cookie, err = accessjwt.GenerateCookie(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		slog.Error("error generating jwt cookie", "err", err)
		return
	}
	http.SetCookie(w, cookie)

	// success
	w.WriteHeader(http.StatusOK)
}
