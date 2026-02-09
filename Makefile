.PHONY: help dev docker-build docker-up docker-down push test lint clean

# Registry configuration
REGISTRY ?= gitea.azizedursun.com/azize-projects
BACKEND_IMAGE ?= $(REGISTRY)/fsdevops-backend
FRONTEND_IMAGE ?= $(REGISTRY)/fsdevops-frontend
TAG ?= latest

# Default target
help:
	@echo "Full-stack DevOps Portfolio - Available Commands"
	@echo "================================================="
	@echo ""
	@echo "Development:"
	@echo "  make dev-backend     - Run backend in development mode"
	@echo "  make dev-frontend    - Run frontend in development mode"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build    - Build all Docker images"
	@echo "  make docker-up       - Start all containers"
	@echo "  make docker-down     - Stop all containers"
	@echo "  make docker-logs     - View container logs"
	@echo "  make docker-clean    - Stop containers and remove volumes"
	@echo ""
	@echo "Registry:"
	@echo "  make push            - Build and push images to Gitea registry"
	@echo "  make push-backend    - Push only backend image"
	@echo "  make push-frontend   - Push only frontend image"
	@echo ""
	@echo "Testing:"
	@echo "  make test-backend    - Run backend tests"
	@echo "  make test-frontend   - Run frontend tests"
	@echo "  make test            - Run all tests"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make lint            - Run linters"

# =========================
# Development
# =========================
dev-backend:
	cd backend && go run ./cmd/server

dev-frontend:
	cd frontend && npm run dev

# =========================
# Docker
# =========================
docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

docker-clean:
	docker compose down -v --rmi local

# =========================
# Registry (Gitea)
# =========================
push-backend:
	docker build -t $(BACKEND_IMAGE):$(TAG) ./backend
	docker push $(BACKEND_IMAGE):$(TAG)

push-frontend:
	docker build --build-arg NEXT_PUBLIC_API_URL=https://api.devops.azizedursun.com -t $(FRONTEND_IMAGE):$(TAG) ./frontend
	docker push $(FRONTEND_IMAGE):$(TAG)

push: push-backend push-frontend

# =========================
# Testing
# =========================
test-backend:
	cd backend && go test -v ./...

test-frontend:
	cd frontend && npm run lint

test: test-backend test-frontend

# =========================
# Linting
# =========================
lint-backend:
	cd backend && go vet ./...

lint-frontend:
	cd frontend && npm run lint

lint: lint-backend lint-frontend

# =========================
# Cleaning
# =========================
clean:
	rm -rf frontend/.next
	rm -rf frontend/node_modules
	rm -rf backend/vendor
	rm -f backend/server

# =========================
# Database
# =========================
db-migrate:
	cd backend && go run ./cmd/migrate

db-seed:
	cd backend && go run ./cmd/seed
