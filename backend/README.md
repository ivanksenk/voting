# Система голосования за идеи

Система для публичного голосования за идеи развития продукта с защитой от накруток.

## Установка и запуск

### 1. Запуск базы данных
```bash
docker-compose up -d
```

### 2. Настройка бэкенда
```bash
npm install
# Создайте файл .env
cp .env.example .env
# Отредактируйте .env при необходимости
```

### 3. Инициализация тестовыми данными
```bash
npm run db:seed
```

### 4. Запуск
```bash
# Разработка
npm run dev
# Или продакшен
npm run build
npm start
# Бэкенд будет доступен на http://localhost:4200
```
### 5. Настройка фронденда
```bash
npm install
```

### 5. Запуск фронденда
```bash
npm run dev
# Фронтенд будет доступен на http://localhost:3000
```

# Api EndPoints
```bash
Создать идею
POST /api/ideas
```
```bash
Получить список идей
GET /api/ideas
```
```bash
Получить идею по id
GET /api/ideas/:id
```
```bash
Проголосовать за идею
POST /api/votes/:ideaId/vote
```
```bash
Получить свой статус голосования
GET /api/votes/status
```
Все EndPoint доступны в Insomnia_2025-10-03.yaml