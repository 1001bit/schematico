package handler

import "github.com/1001bit/schematico/services/user/usermodel"

type Handler struct {
	userstorage *usermodel.UserStorage
}

func New(us *usermodel.UserStorage) *Handler {
	return &Handler{
		userstorage: us,
	}
}
