CREATE TYPE vehicle_fuel AS ENUM ('petrol', 'diesel');
CREATE TYPE vehicle_gearbox AS ENUM ('auto', 'manual');

CREATE TABLE IF NOT EXISTS offers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    make VARCHAR(255),
    model VARCHAR(255),
    year SMALLINT,
    gearbox vehicle_gearbox DEFAULT 'auto',
    mileage INT,
    color VARCHAR(255),
    fuel vehicle_fuel DEFAULT 'petrol',
    price INT,
    owners SMALLINT,
    negotiable BOOL DEFAULT TRUE,
    description VARCHAR(5000),
    archived_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)