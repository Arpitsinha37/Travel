require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const busRoutes = require('./routes/bus');
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bus', busRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);

// Database Connection Check
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully');
    release();
});

// Root Endpoint
app.get('/', (req, res) => {
    res.send('RedBus Clone API Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { pool }; // Export pool for usage in controllers
