package jwtmiddleware

import (
	"context"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

const (
	UserIdKey = "userId"
)

func ClaimsToContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jwtCookie, err := r.Cookie("jwt")
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		token, err := jwt.Parse(jwtCookie.Value, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil || !token.Valid {
			next.ServeHTTP(w, r)
			return
		}

		userId, ok := token.Claims.(jwt.MapClaims)[UserIdKey].(string)
		if !ok {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), UserIdKey, userId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
