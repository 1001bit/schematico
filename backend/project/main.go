package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/backend/project/database"
	"github.com/1001bit/schematico/backend/project/model"
	"github.com/1001bit/schematico/backend/project/server"
)

func main() {
	port := os.Getenv("PORT")

	db, err := database.New(os.Getenv("POSTGRES_URL"))
	if err != nil {
		slog.Error("error creating database", "err", err)
	}
	defer db.Close()

	projstorage := model.NewProjectStorage(db)
	server := server.New(projstorage)

	if err := server.Run(port); err != nil {
		slog.Error("error running server", "err", err)
	}
}
