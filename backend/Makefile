# ========================
# ✅ Python Makefile (Win)
# ========================

.PHONY: help install dev test lint format compose-up compose-down stop clean

help:
	@echo ""
	@echo "	Makefile commands:"
	@echo "  make install         - Install Python dependencies"
	@echo "  make dev             - Run FastAPI app locally"
	@echo "  make test            - Run pytest tests"
	@echo "  make lint            - Run flake8 linting"
	@echo "  make format          - Auto-format code with black"
	@echo "  make clean           - Delete __pycache__ and .pyc files"
	@echo "  make mypy            - Run type checking with mypy"
	@echo "  make check           - Run linting and formatting checks"
	@echo ""

install:
	pip install -r requirements.txt

dev:
	python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

test:
	pytest -v

lint:
	python -m flake8 app

format:
	python -m black app

clean:
	del /s /q *.pyc
	del /s /q __pycache__
	del /s /q .pytest_cache

mypy:
	mypy app --config-file mypy.ini

# ============================================
# Full Code Cleanup: lint → format → clean
# ============================================

check:
	@echo "Running flake8..."
	python -m flake8 app || exit 1

	@echo "Running black..."
	python -m black app

	@echo "Running mypy..."
	python -m mypy app --config-file mypy.ini || exit 1

	@echo "Cleaning __pycache__ and .pyc files..."
	del /s /q *.pyc 2>nul
	del /s /q __pycache__ 2>nul
