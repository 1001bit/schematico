package server

import (
	"fmt"
	"net/http"

	"github.com/1001bit/schematico/services/user/handler"
	"github.com/1001bit/schematico/services/user/refreshuuid"
	"github.com/1001bit/schematico/services/user/usermodel"
)

func Run(port string, userstorage *usermodel.UserStorage, uuidstorage *refreshuuid.Storage) error {
	h := handler.New(userstorage, uuidstorage)

	r := newRouter(h)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
