const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');
const { pool } = require('../server'); // Import DB pool connection

router.post('/login', (req, res) => {
    // Legacy Mock Login - Keep for reference or fallback
    res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Demo User' } });
});

router.post('/google', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // 1. Verify ID Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, name, email, picture } = decodedToken;

        // 2. Check if user exists in DB
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        let user;

        if (userQuery.rows.length > 0) {
            // User exists
            user = userQuery.rows[0];
        } else {
            // Create new user
            // Note: DB schema expects password_hash, we need to handle that. 
            // Ideally schema should change. For now we insert a dummy or handle it if schema was updated.
            // Since we didn't run the migration yet, this insert might fail if password_hash is NOT NULL.
            // We'll use a placeholder hash for Google users.
            const newUser = await pool.query(
                'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
                [name, email, 'GOOGLE_AUTH_USER']
            );
            user = newUser.rows[0];
        }

        res.json({ message: 'Auth successful', user });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
