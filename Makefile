start:
	@echo "\nStarting Docker containers..."
	docker compose up --build -d

restart: down start

frontend-run:
	npm --prefix frontend run dev

certs-gen:
	rm -rf certs/*
	mkdir certs/nginx

	openssl req -new -x509 -days 365 -nodes \
	-out certs/nginx/server.crt -keyout certs/nginx/server.key \
	-subj "/CN=localhost"

copyshared:
	@echo "\Copying shared..."
	python3 shared/shared.py shared

down:
	@echo "\nStopping Docker containers..."
	docker compose down

clean:
	@echo "\nCleaning up Docker resources..."
	docker compose down --rmi all --volumes --remove-orphans