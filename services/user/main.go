package main

import (
	"log/slog"

	"github.com/1001bit/schematico/services/user/server"
)

func init() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(nil, &slog.HandlerOptions{Level: slog.LevelDebug})))
}

func main() {
	s := server.New()

	if err := s.Run("80"); err != nil {
		slog.Error("server run error", "err", err)
	}
}
