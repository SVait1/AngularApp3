# ---------- БАЗОВЫЙ BUILDER ----------
FROM node:20-alpine AS builder

# Рабочая директория
WORKDIR /app

# Кэшируем зависимости: сначала копируем только package*.json
COPY package*.json ./

# Устанавливаем зависимости (npm ci быстрее и детерминированнее)
RUN npm install

# Теперь копируем весь проект
COPY . .

# Сборка Angular
RUN npm run build -- --configuration production


# ---------- NGINX ДЛЯ ПРОДА ----------
FROM nginx:1.27-alpine AS production

# Удаляем дефолтный конфиг и копируем свой (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранный Angular
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
