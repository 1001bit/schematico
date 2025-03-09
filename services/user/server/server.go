package server

import (
	"fmt"
	"net/http"

	"github.com/1001bit/schematico/services/user/handler"
)

func Run(port string) error {
	h := handler.New()

	r := newRouter(h)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
