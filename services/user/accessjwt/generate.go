package accessjwt

import (
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const (
	expTime = 5 * time.Minute
	secure  = false
)

func generate(userId string) (string, error) {
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": userId,
		"exp":    time.Now().Add(expTime).Unix(),
	})

	return jwtToken.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func GenerateCookie(userId string) (*http.Cookie, error) {
	jwt, err := generate(userId)
	if err != nil {
		return nil, err
	}
	return &http.Cookie{
		Name:     "jwt",
		Value:    jwt,
		Path:     "/api",
		SameSite: http.SameSiteStrictMode,
		HttpOnly: true,
		MaxAge:   int(expTime),
		Secure:   secure, // NOT SECURE
	}, nil
}
