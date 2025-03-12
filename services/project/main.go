package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/project/server"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	if err := server.Run(os.Getenv("PORT")); err != nil {
		slog.Error("error running server", "err", err)
	}
}
