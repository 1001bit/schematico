package usermodel

import (
	"context"

	"golang.org/x/crypto/bcrypt"
)

func (us *UserStorage) AddUser(ctx context.Context, username string, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = us.db.ExecContext(ctx, "INSERT INTO users (username, passhash) VALUES ($1, $2)", username, hash)
	return getErrFromSql(err)
}
