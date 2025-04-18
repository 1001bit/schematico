package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/project/projectmodel"
	"github.com/1001bit/schematico/services/project/server"
	"github.com/1001bit/schematico/services/project/shared/database"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	port := os.Getenv("PORT")

	db, err := database.New(os.Getenv("POSTGRES_URL"))
	// TODO: try to reconnect on error
	if err != nil {
		slog.Error("error creating database", "err", err)
	}

	projstorage := projectmodel.NewProjectStorage(db)

	if err := server.Run(port, projstorage); err != nil {
		slog.Error("error running server", "err", err)
	}
}
