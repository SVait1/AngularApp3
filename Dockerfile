# Этап сборки Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# Этап сервера (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist/angularapp3.client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
