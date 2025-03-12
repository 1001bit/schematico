package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/user/refreshuuid"
	"github.com/1001bit/schematico/services/user/server"
	"github.com/1001bit/schematico/services/user/shared/database"
	"github.com/1001bit/schematico/services/user/usermodel"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	port := "80"

	db, err := database.New(database.DBConf{
		Host:     "user-postgres",
		Port:     "5432",
		User:     os.Getenv("POSTGRES_USER"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		DBName:   os.Getenv("POSTGRES_DB"),
	})

	// TODO: Try to reconnect on error
	if err != nil {
		slog.Error("database connection error", "err", err.Error())
	}
	defer db.Close()

	userstorage := usermodel.NewUserStorage(db)
	uuidstorage := refreshuuid.NewStorage("user-redis:6379")

	if err := server.Run(port, userstorage, uuidstorage); err != nil {
		slog.Error("server run error", "err", err)
	}
}
