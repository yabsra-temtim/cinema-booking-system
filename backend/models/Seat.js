const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  showtimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true
  },
  seatId: {
    type: String,
    required: true
  },
  row: String,
  number: Number,
  type: {
    type: String,
    enum: ['regular', 'vip'],
    default: 'regular'
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'locked'],
    default: 'available'
  },
  lockedBy: {
    type: String
  },
  lockedAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  }
});

// Index for TTL (auto-expire locked seats after 5 minutes)
seatSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Seat', seatSchema);
