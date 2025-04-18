module github.com/1001bit/schematico/services/user

go 1.24.1

require github.com/go-chi/chi/v5 v5.2.1

require github.com/lib/pq v1.10.9

require golang.org/x/crypto v0.36.0

require (
	github.com/golang-jwt/jwt/v5 v5.2.1
	github.com/google/uuid v1.6.0
	github.com/redis/go-redis/v9 v9.7.1
	github.com/rs/cors v1.11.1
)

require (
	github.com/cespare/xxhash/v2 v2.2.0 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/go-chi/httprate v0.15.0 // indirect
	github.com/klauspost/cpuid/v2 v2.2.10 // indirect
	github.com/zeebo/xxh3 v1.0.2 // indirect
	golang.org/x/sys v0.31.0 // indirect
)
