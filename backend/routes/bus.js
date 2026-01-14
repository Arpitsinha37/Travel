const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

router.get('/search', busController.searchBuses);
router.get('/:tripId/seats', busController.getTripSeats);

module.exports = router;
