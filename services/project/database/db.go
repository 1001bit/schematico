package database

import (
	"database/sql"
	"log/slog"
	"time"

	_ "github.com/lib/pq"
)

const retryTime = 5 * time.Second

func New(url string) (*sql.DB, error) {
	for {
		db, err := sql.Open("postgres", url)
		tries := 5
		if err == nil {
			err = db.Ping()
		}
		if err == nil {
			return db, nil
		}
		if tries == 0 {
			return nil, err
		}
		tries -= 1
		slog.Error("DB connect failed, retrying...")
		time.Sleep(retryTime)
	}
}
