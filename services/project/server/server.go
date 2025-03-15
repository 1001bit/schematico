package server

import (
	"fmt"
	"net/http"

	"github.com/1001bit/schematico/services/project/handler"
	"github.com/1001bit/schematico/services/project/projectmodel"
)

func Run(port string, projstorage *projectmodel.ProjectStorage) error {
	h := handler.New(projstorage)

	r := newRouter(h)

	addr := fmt.Sprintf(":%s", port)
	return http.ListenAndServe(addr, r)
}
