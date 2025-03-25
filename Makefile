# Variables
DOCKER_COMPOSE = docker compose
TSC = tsc
SHARED_SCRIPT = python3 shared/shared.py
SHARED_PATH = shared

# Build and start
all: start tscompile

# Build the Docker containers
start:
	@echo "\nStarting Docker containers..."
	$(DOCKER_COMPOSE) up --build -d

# Compile typescript
tscompile:
	@echo "\nCompiling typescript..."
	$(TSCOMPILER)

# Copy packages from shared to their destinations
copyshared:
	@echo "\Copying shared..."
	$(SHARED_SCRIPT) $(SHARED_PATH)

# Stop the Docker containers
down:
	@echo "\nStopping Docker containers..."
	$(DOCKER_COMPOSE) down

# Clean up Docker resources
clean:
	@echo "\nCleaning up Docker resources..."
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans