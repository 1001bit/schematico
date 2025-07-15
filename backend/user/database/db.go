package database

import (
	"database/sql"
	"log/slog"
	"time"

	_ "github.com/lib/pq"
)

const (
	retryTime = 5 * time.Second
	maxTries  = 5
)

func New(url string) (*sql.DB, error) {
	tries := maxTries
	for {
		db, err := sql.Open("postgres", url)
		if err == nil {
			err = db.Ping()
		}
		if err != nil {
			if tries == 0 {
				return nil, err
			}
			tries -= 1
			slog.Warn("DB connect failed, retrying...")
			time.Sleep(retryTime)
			continue
		}

		return db, nil
	}
}
