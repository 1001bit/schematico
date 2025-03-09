package usermodel

import (
	"context"

	"golang.org/x/crypto/bcrypt"
)

func (us *UserStorage) Login(ctx context.Context, username string, password string) error {
	hash := ""
	err := us.db.QueryRowContext(ctx, "SELECT passhash FROM users WHERE username = $1", username).Scan(&hash)
	if err != nil {
		return getErrFromSql(err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return ErrInvalidCredentials
	}
	return nil
}
