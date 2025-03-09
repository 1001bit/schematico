package usermodel

import (
	"errors"

	"github.com/lib/pq"
)

var (
	ErrUserAlreadyExists = errors.New("user already exists")
)

func getError(err error) error {
	pqErr, ok := err.(*pq.Error)
	if !ok {
		return err
	}

	switch pqErr.Code.Name() {
	case "unique_violation":
		return ErrUserAlreadyExists
	default:
		return err
	}
}
