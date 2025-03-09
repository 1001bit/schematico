package server

import (
	"fmt"
	"net/http"

	"github.com/1001bit/schematico/services/user/handler"
	"github.com/1001bit/schematico/services/user/usermodel"
)

func Run(port string, us *usermodel.UserStorage) error {
	h := handler.New(us)

	r := newRouter(h)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
