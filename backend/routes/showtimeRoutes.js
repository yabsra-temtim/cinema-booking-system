const express = require('express');
const {
  getShowtimes,
  getShowtime,
  createShowtime,
  updateShowtime,
  deleteShowtime
} = require('../controllers/showtimeController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getShowtimes);
router.get('/:id', getShowtime);
router.post('/', protect, admin, createShowtime);
router.put('/:id', protect, admin, updateShowtime);
router.delete('/:id', protect, admin, deleteShowtime);

module.exports = router;
