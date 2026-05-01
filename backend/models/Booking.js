const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  showtimeId: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  theaterName: {
    type: String,
    required: true
  },
  screenNumber: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  seats: [{
    row: String,
    number: Number,
    type: {
      type: String,
      enum: ['regular', 'vip'],
      default: 'regular'
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  },
  qrCode: {
    type: String
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
