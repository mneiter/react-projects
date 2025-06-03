# ============================================
# 🐳 Docker Compose Section (Git Bash Compatible)
# ============================================

.PHONY: \
	compose-up \
	compose-down \
	compose-build \
	compose-clean \
	compose-rebuild \
	compose-restart \
	compose-logs \
	compose-backend \
	compose-frontend \
	docker-help

# 🚀 Start all services with build
compose-up:
	docker-compose up --build

# 🛑 Stop all running services
compose-down:
	docker-compose down

# 🔧 Build Docker images only (no containers started)
compose-build:
	docker-compose build

# 💣 Stop and remove containers + volumes (⚠️ data loss!)
compose-clean:
	docker-compose down -v

# 🔄 Rebuild and start in detached mode
compose-rebuild:
	docker-compose up --build -d

# 🔁 Restart all services (down + up --build)
compose-restart:
	docker-compose down && docker-compose up --build

# 📜 Tail logs from all running services
compose-logs:
	docker-compose logs -f

# 🧠 Start only the backend service
compose-backend:
	docker-compose up --build backend

# 🎨 Start only the frontend service
compose-frontend:
	docker-compose up --build frontend

# ============================================
# 📖 Docker Compose Help
# ============================================

docker-help:
	@echo ""
	@echo "🛠  Docker Compose Commands:"
	@echo "  make compose-up         - Start all services with build"
	@echo "  make compose-down       - Stop all running services"
	@echo "  make compose-build      - Build Docker images only"
	@echo "  make compose-clean      - Stop and remove containers + volumes (data loss)"
	@echo "  make compose-rebuild    - Rebuild and start in detached mode"
	@echo "  make compose-restart    - Restart all services"
	@echo "  make compose-logs       - Tail logs from all running services"
	@echo "  make compose-backend    - Start only the backend service"
	@echo "  make compose-frontend   - Start only the frontend service"
	@echo "  make docker-help        - Show this help message"
	@echo ""
