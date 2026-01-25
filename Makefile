.PHONY: help dev build test clean docker-build docker-up docker-down k8s-local k8s-apply

# Default target
help:
	@echo "DevOps Journey - Available Commands"
	@echo "===================================="
	@echo ""
	@echo "Development:"
	@echo "  make dev-backend     - Run backend in development mode"
	@echo "  make dev-frontend    - Run frontend in development mode"
	@echo "  make dev             - Run both (requires tmux or separate terminals)"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build    - Build all Docker images"
	@echo "  make docker-up       - Start all containers"
	@echo "  make docker-down     - Stop all containers"
	@echo "  make docker-logs     - View container logs"
	@echo ""
	@echo "Kubernetes (Local):"
	@echo "  make k8s-init        - Initialize local K8s cluster with Terraform"
	@echo "  make k8s-load        - Build and load images to kind"
	@echo "  make k8s-apply       - Apply Kubernetes manifests"
	@echo "  make k8s-delete      - Delete Kubernetes resources"
	@echo "  make k8s-destroy     - Destroy local K8s cluster"
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
# Kubernetes (Local with Kind)
# =========================
CLUSTER_NAME ?= devops-journey-local

k8s-init:
	cd terraform/local && terraform init && terraform apply -auto-approve
	@echo "Add these entries to your hosts file:"
	@echo "127.0.0.1 devops.local"
	@echo "127.0.0.1 api.devops.local"

k8s-load: docker-build
	kind load docker-image devops-journey-backend:latest --name $(CLUSTER_NAME)
	kind load docker-image devops-journey-frontend:latest --name $(CLUSTER_NAME)

k8s-apply:
	kubectl apply -k k8s/overlays/local

k8s-delete:
	kubectl delete -k k8s/overlays/local --ignore-not-found

k8s-destroy:
	cd terraform/local && terraform destroy -auto-approve

k8s-status:
	kubectl get all -n devops-journey

k8s-logs-backend:
	kubectl logs -f -l app=backend -n devops-journey

k8s-logs-frontend:
	kubectl logs -f -l app=frontend -n devops-journey

# =========================
# Testing
# =========================
test-backend:
	cd backend && go test -v ./...

test-frontend:
	cd frontend && npm test

test: test-backend test-frontend

# =========================
# Linting
# =========================
lint-backend:
	cd backend && golangci-lint run

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
	rm -rf terraform/local/.terraform
	rm -f terraform/local/kubeconfig

# =========================
# Database
# =========================
db-migrate:
	cd backend && go run ./cmd/migrate

db-seed:
	cd backend && go run ./cmd/seed
