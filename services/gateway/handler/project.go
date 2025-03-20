package handler

import "net/http"

func HandleProject(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "html/project.html")
}
