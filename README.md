```markdown
# Todo App — Fullstack приложение на Angular 21 и ASP.NET Core 8

Проект представляет собой современное приложение для управления задачами, включающее фронтенд на Angular 21 и backend на ASP.NET Core 8 с использованием SQLite. Приложение демонстрирует архитектуру клиент–сервер, работу с REST API и Entity Framework Core.

---

## 🏷️ Бейджи

![Tech Stack](https://img.shields.io/badge/Frontend-Angular_21-dd0031?logo=angular)
![Backend](https://img.shields.io/badge/Backend-ASP.NET_Core_8-512bd4?logo=dotnet)
![Database](https://img.shields.io/badge/Database-SQLite-07405e?logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Build-Passing-brightgreen)

---

## ✨ Основные возможности

- Создание, редактирование и удаление задач  
- Отметка задач как выполненных  
- Хранение данных в SQLite  
- Автоматическое создание базы данных  
- Swagger UI в режиме разработки  
- CORS для Angular dev-сервера  
- Автоматическая сборка Angular при сборке backend  

---

## 🧱 Технологический стек

### Frontend
- Angular 21  
- Standalone Components  
- HttpClient  
- Angular Animations  
- TypeScript 5.9  
- RxJS 7.8  

### Backend
- ASP.NET Core 8  
- Entity Framework Core 8  
- SQLite  
- Minimal Hosting Model  

---

## 🧩 Архитектурная диаграмма

Ниже представлена упрощённая схема взаимодействия компонентов приложения:

```
┌──────────────────────┐        HTTP REST        ┌────────────────────────┐
│      Angular 21       │  <------------------->  │    ASP.NET Core 8 API   │
│  (UI, Components,     │                        │  Controllers, Services   │
│   HttpClient, RxJS)   │                        │  EF Core, SQLite         │
└───────────┬───────────┘                        └───────────┬────────────┘
            │                                                │
            │                                                │
            ▼                                                ▼
   Browser Rendering                                 SQLite Database
   (HTML, CSS, JS)                                   (app.db — хранение задач)
```

---

## 🔌 API эндпоинты

Все эндпоинты доступны по адресу:

```
/api/todo
```

### Получить все задачи  
**GET** `/api/todo`

### Получить задачу по ID  
**GET** `/api/todo/{id}`

### Создать задачу  
**POST** `/api/todo`

Тело:
```json
{
  "title": "New task"
}
```

### Обновить задачу  
**PUT** `/api/todo/{id}`

### Удалить задачу  
**DELETE** `/api/todo/{id}`

---

## 🚀 Как запустить проект

### Backend

```bash
cd AngularApp3.Server
dotnet run
```

### Frontend

```bash
cd angularapp3.client
npm install
ng serve --proxy-config proxy.conf.json
```

---

## 📁 Структура проекта

```
AngularApp3/
 ├── AngularApp3.Server/           
 │    ├── Controllers/             
 │    ├── AppDbContext.cs          
 │    ├── TodoItem.cs              
 │    └── Program.cs               
 │
 ├── angularapp3.client/           
 │    ├── src/                     
 │    ├── angular.json             
 │    └── package.json             
 │
 ├── screenshots/                  
 └── README.md
```

---

## ☁️ Деплой

### Linux (Nginx + systemd)

1. Сборка Angular:
   ```bash
   ng build --configuration production
   ```
2. Публикация backend:
   ```bash
   dotnet publish -c Release -o out
   ```
3. Настройка Nginx:
   ```
   location / {
       proxy_pass http://localhost:5000;
   }
   ```
4. Запуск как systemd‑сервис.

### Windows (IIS)

- Установить ASP.NET Core Hosting Bundle  
- Создать сайт в IIS  
- Указать путь на папку publish  

### Docker

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish AngularApp3.Server -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AngularApp3.Server.dll"]
```

---

## 🧭 Планы развития проекта

- Добавление авторизации (JWT + роли)  
- Поддержка категорий задач  
- Фильтры и сортировка  
- Drag‑and‑drop задач  
- Тёмная тема  
- Docker Compose для полного окружения  
- CI/CD через GitHub Actions  
- Unit‑тесты для Angular и .NET  
- Возможность прикреплять файлы к задачам  

---

## 📄 Лицензия

Проект открыт для изучения, модификации и использования.
