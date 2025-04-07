start:
	@echo "\nStarting Docker containers..."
	docker compose up --build -d

restart: down start

frontend-run:
	npm --prefix services/frontend run dev

copyshared:
	@echo "\Copying shared..."
	python3 shared/shared.py shared

down:
	@echo "\nStopping Docker containers..."
	docker compose down

clean:
	@echo "\nCleaning up Docker resources..."
	docker compose down --rmi all --volumes --remove-orphans