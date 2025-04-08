package main

import (
	"log/slog"
	"os"

	"github.com/1001bit/schematico/services/gateway/server"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	port := "80"
	userAddr := "http://user:80"
	projAddr := "http://project:80"
	frontAddr := "http://frontend:3000"
	if err := server.Run(port, userAddr, projAddr, frontAddr); err != nil {
		slog.Error("server run error", "err", err)
	}
}
