package accessjwt

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func ExtractUserId(token string) (string, error) {
	jwtToken, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := jwtToken.Claims.(jwt.MapClaims)
	if !ok || !jwtToken.Valid {
		return "", ErrInvalidToken
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return "", ErrInvalidToken
	}
	return userId, nil
}
