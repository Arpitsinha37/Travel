-- Database Schema for RedBus Clone
-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: buses
CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    type VARCHAR(50) -- e.g., 'Sleeper', 'Seater', 'AC'
);

-- Table: trips
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    bus_id INT REFERENCES buses(id),
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Table: seats
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    bus_id INT REFERENCES buses(id),
    seat_number VARCHAR(10) NOT NULL,
    is_ladies_seat BOOLEAN DEFAULT FALSE,
    UNIQUE(bus_id, seat_number)
);

-- Table: seat_holds (Redis can also be used, but this is persistent fallback)
CREATE TABLE seat_holds (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(id),
    seat_id INT REFERENCES seats(id),
    user_id INT REFERENCES users(id),
    hold_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'HELD', -- 'HELD', 'RELEASED', 'BOOKED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(id),
    user_id INT REFERENCES users(id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CONFIRMED', -- 'CONFIRMED', 'CANCELLED'
    total_amount DECIMAL(10, 2) NOT NULL
);

-- Table: booking_seats (Many-to-Many link for seats in a booking)
CREATE TABLE booking_seats (
    booking_id INT REFERENCES bookings(id),
    seat_id INT REFERENCES seats(id),
    PRIMARY KEY (booking_id, seat_id)
);
