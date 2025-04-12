package handler

import "github.com/1001bit/schematico/services/project/projectmodel"

type Handler struct {
	projStorage *projectmodel.ProjectStorage
}

func New(projStorage *projectmodel.ProjectStorage) *Handler {
	return &Handler{
		projStorage: projStorage,
	}
}
