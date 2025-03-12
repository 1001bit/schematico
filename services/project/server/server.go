package server

import (
	"fmt"
	"net/http"
)

func Run(port string) error {
	r := newRouter()

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
