# Gopher Garage

Учебный выпускной проект, выполненный в рамках курса "Fullstack-разработчик на языке Golang".

Представляет собой площадку для размещения объявлений о продаже автомобилей.

Бэкенд реализован в виде REST API на языке Go.

Фронтенд - Single Page Application с использованием библиотеки React.

## Стек технологий
- Golang
- PostgreSQL
- React
- Docker
- Vite
- JWT

## Основной функционал
- Регистрация и авторизация пользователей
- Размещение объявлений с возможностью загрузки фотографий
- Поиск и фильтрация по различным параметрам
- Пагинация объявлений
- Архивирование своих объявлений

## Локальное развёртывание проекта
### Требования
- Docker & Docker compose
- Node.js
- [golang-migrate](https://github.com/golang-migrate/migrate)

1. Переменные окружения
```bash
cp .env.example .env
```

Тестовые данные:
>POSTGRES_HOST=postgres
>POSTGRES_PORT=5432
>POSTGRES_DEV_PORT=5433
>POSTGRES_USER=gopher_garage
>POSTGRES_PASSWORD=testpass
>POSTGRES_DB=gg

2. Сборка фронтенда
```sh
make build-frontend
```

3. Запуск бэкенда и базы данных

```sh
docker compose up --build -d
```

4. Выполнение миграций
```sh
make migrate-up
```

Для разработки использовать
```sh
make dev
```

Приложение будет доступно на порту, указанном в SERVER_PORT. По умолчанию: http://localhost:8080.