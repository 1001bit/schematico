package usermodel

import "golang.org/x/crypto/bcrypt"

func (us *UserStorage) AddUser(username string, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = us.db.Exec("INSERT INTO users (username, passhash) VALUES ($1, $2)", username, hash)
	return getError(err)
}
