package handler

import "net/http"

func HandleSignIn(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "html/signin.html")
}
