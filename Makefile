# Makefile for managing a Next.js project

# Run development server
dev:
	npm run dev

# Build the project
build:
	npm run build

# Start production server (after build)
start:
	npm run start

# Install dependencies
install:
	npm install

# Stop development server (manually Ctrl+C in terminal)
stop:
	@echo "To stop the server, press Ctrl+C in the terminal where it runs."

# Clean node_modules and lock files
clean:
	rm -rf node_modules package-lock.json

# Reinstall everything
reinstall: clean install

# Lint the code
lint:
	npm run lint

# Format the code
format:
	npm run format	

# Test the code
test:
	npm run test

# Run all tests
test-all:
	npm run test:all

# Makefile for managing a Next.js project

# Run development server
dev:
	npm run dev

# Build the project
build:
	npm run build

# Start production server (after build)
start:
	npm run start

# Install dependencies
install:
	npm install

# Stop development server (manually Ctrl+C in terminal)
stop:
	@echo "To stop the server, press Ctrl+C in the terminal where it runs."

# Clean node_modules and lock files
clean:
	rm -rf node_modules package-lock.json

# Reinstall everything
reinstall: clean install

# Lint the code
lint:
	npm run lint

# ────────────────────────────────────────────────
# Docker Compose commands

# Start all services
compose-up:
	docker compose up -d

# Stop all services
compose-down:
	docker compose down

# Stop and remove containers + volumes (data loss!)
compose-clean:
	docker compose down -v

# Rebuild and restart
compose-rebuild:
	docker compose up --build -d
