package main

import (
	"log/slog"

	"github.com/1001bit/schematico/services/gateway/server"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(nil, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	port := "80"
	userAddr := "http://user:80"
	if err := server.Run(port, userAddr); err != nil {
		slog.Error("server run error", "err", err)
	}
}
