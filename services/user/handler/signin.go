package handler

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/1001bit/schematico/services/user/accessjwt"
	"github.com/1001bit/schematico/services/user/shared/jwtmiddleware"
	"github.com/1001bit/schematico/services/user/usermodel"
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

func writeServerError(w http.ResponseWriter, err error, errTitle string) {
	w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprintf(w, `{"message": "internal server error"}`)
	slog.Error(errTitle, "err", err)
}

func validateInputs(username, password string) string {
	usernameErr := validateUsername(username)
	if usernameErr != "" {
		return usernameErr
	}
	return validatePassword(password)
}

func createOrSignIn(w http.ResponseWriter, r *http.Request, userstorage *usermodel.UserStorage, req signInRequest) (string, error) {
	var err error
	userId := ""

	if req.Type == "create" {
		userId, err = userstorage.AddUser(r.Context(), req.Username, req.Password)
		if err == usermodel.ErrAlreadyExists {
			w.WriteHeader(http.StatusConflict)
			fmt.Fprintf(w, `{"message": "user already exists"}`)
			return "", nil
		}
	} else {
		userId, err = userstorage.Login(r.Context(), req.Username, req.Password)
		if err == usermodel.ErrInvalidCredentials || err == usermodel.ErrNotFound {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, `{"message": "invalid credentials"}`)
			return "", nil
		}
	}

	return userId, err
}

func (h *Handler) HandleSignIn(w http.ResponseWriter, r *http.Request) {
	_, ok := r.Context().Value(jwtmiddleware.UserIdKey).(string)
	if ok {
		// HACK: wont work if jwt is expired though
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "%s"}`, "already signed in")
		return
	}

	req := signInRequest{}

	// decode request body
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "%s"}`, "bad inputs")
		return
	}

	// validate inputs
	errMsg := validateInputs(req.Username, req.Password)
	if errMsg != "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "%s"}`, errMsg)
		return
	}

	// create account or sign in
	userId, err := createOrSignIn(w, r, h.userstorage, req)
	if err != nil {
		writeServerError(w, err, "error signing in")
		return
	} else if userId == "" {
		return
	}

	// generate and set jwt cookie
	cookie, err := accessjwt.GenerateCookie(userId)
	if err != nil {
		writeServerError(w, err, "error generating jwt")
		return
	}
	http.SetCookie(w, cookie)

	// generate and set refresh uuid cookie
	cookie, err = h.uuidstorage.GenerateUUIDCookie(r.Context(), userId)
	if err != nil {
		writeServerError(w, err, "error generating uuid")
		return
	}
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusOK)
}
