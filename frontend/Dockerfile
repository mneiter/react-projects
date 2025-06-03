FROM node:20-slim

# Create app dir
WORKDIR /app

# Установим зависимости системы
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Копируем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
