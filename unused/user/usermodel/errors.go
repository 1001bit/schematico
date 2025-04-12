package usermodel

import (
	"database/sql"
	"errors"

	"github.com/lib/pq"
)

var (
	ErrAlreadyExists      = errors.New("already exists")
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrNotFound           = errors.New("not found")
	ErrNoDb               = errors.New("no database connection")
)

func getErrFromSql(err error) error {
	pqErr, ok := err.(*pq.Error)
	switch {
	case err == sql.ErrNoRows:
		return ErrNotFound
	case ok && pqErr.Code.Name() == "unique_violation":
		return ErrAlreadyExists
	default:
		return err
	}
}
