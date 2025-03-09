package usermodel

import (
	"context"

	"golang.org/x/crypto/bcrypt"
)

func (us *UserStorage) Login(ctx context.Context, username string, password string) (string, error) {
	hash := ""
	id := ""
	err := us.db.QueryRowContext(ctx, "SELECT passhash, id FROM users WHERE LOWER(username) = LOWER($1)", username).Scan(&hash, &id)
	if err != nil {
		return id, getErrFromSql(err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return id, ErrInvalidCredentials
	}
	return id, nil
}
