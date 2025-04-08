package server

import (
	"fmt"
	"net/http"
)

func Run(port, userAddr, projAddr, frontAddr string) error {
	r, err := newRouter(userAddr, projAddr, frontAddr)
	if err != nil {
		return err
	}

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
