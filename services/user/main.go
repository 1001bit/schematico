package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/user/database"
	"github.com/1001bit/schematico/services/user/model"
	"github.com/1001bit/schematico/services/user/server"
)

func main() {
	port := os.Getenv("PORT")

	db, err := database.New(os.Getenv("POSTGRES_URL"))
	if err != nil {
		slog.Error("error creating database", "err", err)
	}
	defer db.Close()

	userstorage := model.NewUserStorage(db)
	server := server.New(userstorage)

	if err := server.Run(port); err != nil {
		slog.Error("error running server", "err", err)
	}
}
