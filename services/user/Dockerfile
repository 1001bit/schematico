FROM golang:1.24.4-alpine AS builder

WORKDIR /app

# dependencies
COPY go.* .
RUN go mod download
# other files
COPY . .

# compiling go -> ./main
RUN go build -o main main.go

# Final stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main ./main

ENTRYPOINT ["./main"]