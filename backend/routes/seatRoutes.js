const express = require('express');
const { getSeatLayout, lockSeats } = require('../controllers/seatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:showtimeId', getSeatLayout);
router.post('/lock', protect, lockSeats);

module.exports = router;
