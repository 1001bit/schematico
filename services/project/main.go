package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/project/database"
	"github.com/1001bit/schematico/services/project/projectmodel"
	"github.com/1001bit/schematico/services/project/server"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	port := os.Getenv("PORT")

	db, err := database.New(os.Getenv("POSTGRES_URL"))
	if err != nil {
		slog.Error("error creating database", "err", err)
	}
	defer db.Close()

	projstorage := projectmodel.NewProjectStorage(db)
	server := server.New(projstorage)

	if err := server.Run(port); err != nil {
		slog.Error("error running server", "err", err)
	}
}
