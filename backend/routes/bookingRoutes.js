const express = require('express');
const { body, param } = require('express-validator');
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('showtimeId').notEmpty().withMessage('Showtime ID is required'),
    body('seats').isArray({ min: 1 }).withMessage('At least one seat must be selected'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be a number greater than 0'),
    body('movieTitle').notEmpty().withMessage('Movie title is required'),
    body('theaterName').notEmpty().withMessage('Theater name is required'),
    body('screenNumber').notEmpty().withMessage('Screen number is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('startTime').notEmpty().withMessage('Start time is required')
  ],
  createBooking
);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, [param('id').isMongoId().withMessage('Valid booking ID is required')], getBooking);
router.put('/:id/cancel', protect, [param('id').isMongoId().withMessage('Valid booking ID is required')], cancelBooking);

module.exports = router;
