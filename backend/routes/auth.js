const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    // Mock Login
    res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Demo User' } });
});

module.exports = router;
