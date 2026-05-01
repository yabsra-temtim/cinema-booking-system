const express = require('express');
const { body } = require('express-validator');
const { getSeatLayout, lockSeats } = require('../controllers/seatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:showtimeId', getSeatLayout);
router.post(
  '/lock',
  protect,
  [
    body('showtimeId').notEmpty().withMessage('Showtime ID is required'),
    body('seats').isArray({ min: 1 }).withMessage('At least one seat is required')
  ],
  lockSeats
);

module.exports = router;
