package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func validateUsername(username string) string {
	switch {
	case len(username) > 32:
		return "username too long"
	case len(username) < 1:
		return "username field empty"
	}
	return ""
}

func validatePassword(password string) string {
	switch {
	case len(password) > 72:
		return "password too long"
	case len(password) < 8:
		return "password too short"
	}
	return ""
}

type signInRequest struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) HandleSignIn(w http.ResponseWriter, r *http.Request) {
	req := signInRequest{}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	usernameErr := validateUsername(req.Username)
	if usernameErr != "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "%s"}`, usernameErr)
		return
	}

	passwordErr := validatePassword(req.Password)
	if passwordErr != "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "%s"}`, passwordErr)
		return
	}

	// TODO: put data in the model

	w.WriteHeader(http.StatusNotImplemented)
	fmt.Fprintf(w, `{"message": "TODO"}`)
}
