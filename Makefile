start:
	@echo "\nStarting Docker containers..."
	docker compose up --build -d

restart: down start

frontend-run:
	npm --prefix services/frontend run dev

ssl-gen:
	rm -rf ssl/*
	mkdir ssl/nginx ssl/user-postgres ssl/project-postgres

	openssl req -new -x509 -days 365 -nodes \
	-out ssl/nginx/server.crt -keyout ssl/nginx/server.key \
	-subj "/CN=nginx.local"

	openssl req -new -x509 -days 365 -nodes \
	-out ssl/user-postgres/server.crt -keyout ssl/user-postgres/server.key \
	-subj "/CN=user-postgres.local"

	openssl req -new -x509 -days 365 -nodes \
	-out ssl/project-postgres/server.crt -keyout ssl/project-postgres/server.key \
	-subj "/CN=project-postgres.local"

	chmod 600 ssl/*/*.key
	sudo chown 999:999 ssl/*/*.key

copyshared:
	@echo "\Copying shared..."
	python3 shared/shared.py shared

down:
	@echo "\nStopping Docker containers..."
	docker compose down

clean:
	@echo "\nCleaning up Docker resources..."
	docker compose down --rmi all --volumes --remove-orphans