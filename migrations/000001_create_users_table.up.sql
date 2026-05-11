CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY
    first_name VARCHAR(255)
    last_name VARCHAR(255)
    patronymic VARCHAR(255) NULLABLE
    password VARCHAR
)
