CREATE TABLE IF NOT EXISTS offers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    vehicle VARCHAR(255),
    description VARCHAR(5000),
    price FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
