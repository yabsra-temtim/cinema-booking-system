const express = require('express');
const {
  getTheaters,
  getTheater,
  createTheater,
  updateTheater,
  deleteTheater
} = require('../controllers/theaterController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getTheaters);
router.get('/:id', getTheater);
router.post('/', protect, admin, createTheater);
router.put('/:id', protect, admin, updateTheater);
router.delete('/:id', protect, admin, deleteTheater);

module.exports = router;
