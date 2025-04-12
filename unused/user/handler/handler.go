package handler

import (
	"github.com/1001bit/schematico/services/user/refreshuuid"
	"github.com/1001bit/schematico/services/user/usermodel"
)

type Handler struct {
	userstorage *usermodel.UserStorage
	uuidstorage *refreshuuid.Storage
}

func New(userstorage *usermodel.UserStorage, uuidstorage *refreshuuid.Storage) *Handler {
	return &Handler{
		userstorage: userstorage,
		uuidstorage: uuidstorage,
	}
}
