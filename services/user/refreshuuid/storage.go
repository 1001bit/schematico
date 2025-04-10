package refreshuuid

import (
	"context"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

const (
	uuidKeyPrefix = "refreshuuid:"
	uuidLifeTime  = 14 * (24 * time.Hour)
	secure        = true
)

type Storage struct {
	redisclient *redis.Client
}

func NewStorage(addr, pass string) *Storage {
	return &Storage{
		redisclient: redis.NewClient(&redis.Options{
			Addr:     addr,
			Password: pass,
			DB:       0,
		}),
	}
}

func (s *Storage) generateAndSetUUID(ctx context.Context, userId string) (string, error) {
	uuid := uuid.New().String()
	return uuid, s.redisclient.Set(ctx, uuidKeyPrefix+uuid, userId, uuidLifeTime).Err()
}

func (s *Storage) GenerateUUIDCookie(ctx context.Context, userId string) (*http.Cookie, error) {
	uuid, err := s.generateAndSetUUID(ctx, userId)
	if err != nil {
		return nil, err
	}
	return &http.Cookie{
		Name:     "uuid",
		Value:    uuid,
		Path:     "/api/user",
		SameSite: http.SameSiteStrictMode,
		HttpOnly: true,
		MaxAge:   int(uuidLifeTime.Seconds()),
		Secure:   secure,
	}, nil
}

func (s *Storage) DeleteUUID(ctx context.Context, uuid string) error {
	return s.redisclient.Del(ctx, uuidKeyPrefix+uuid).Err()
}

func (s *Storage) GetIdByUUID(ctx context.Context, uuid string) (string, error) {
	return s.redisclient.Get(ctx, uuidKeyPrefix+uuid).Result()
}
