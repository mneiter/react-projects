include make/docker.mk

# Makefile for managing a Next.js + FastAPI project

# ─────────────── Frontend ───────────────

# Run development server
dev:
	cd frontend && npm run dev

# Build the project
build:
	cd frontend && npm run build

# Start production server (after build)
start:
	npm run start

# Install dependencies
install:
	npm install

# Lint the code
lint:
	npm run lint

# Format the code
format:
	npm run format

# Run frontend tests (React)
test:
	npx jest

# ─────────────── Backend ───────────────

# Run backend with reload (FastAPI)
fastapi:
	cd backend && uvicorn app.main:app --reload

# Run backend tests (pytest)
test-api:
	cd backend && pytest

# ─────────────── Maintenance ───────────────

# Clean node_modules and lock files
clean:
	rm -rf node_modules package-lock.json

# Reinstall everything
reinstall: clean install

# Stop development server (manual)
stop:
	@echo "To stop the server, press Ctrl+C in the terminal where it runs."


# --------------------------------------------
# Help Menu
# --------------------------------------------

help:
	@echo ""