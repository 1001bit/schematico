package usermodel

import (
	"context"

	"golang.org/x/crypto/bcrypt"
)

func (us *UserStorage) AddUser(ctx context.Context, username string, password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	id := ""
	err = us.db.QueryRowContext(ctx, "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING id", username, hash).Scan(&id)
	return id, getErrFromSql(err)
}
