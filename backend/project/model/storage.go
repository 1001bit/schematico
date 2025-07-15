package model

import "database/sql"

type ProjectStorage struct {
	db *sql.DB
}

func NewProjectStorage(db *sql.DB) *ProjectStorage {
	return &ProjectStorage{db: db}
}
