package server

import (
	"fmt"
	"net/http"
)

func Run(port string, userAddr string) error {
	r, err := newRouter(userAddr)
	if err != nil {
		return err
	}

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
