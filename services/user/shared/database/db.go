package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type DBConf struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
}

func New(conf DBConf) (*sql.DB, error) {
	connStr := fmt.Sprintf("host=%s user=%s password=%s port=%s dbname=%s sslmode=disable", conf.Host, conf.User, conf.Password, conf.Port, conf.DBName)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}
