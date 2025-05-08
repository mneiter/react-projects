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
