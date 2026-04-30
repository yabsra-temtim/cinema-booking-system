const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add theater name']
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  screens: [{
    screenNumber: Number,
    totalSeats: Number,
    seatLayout: {
      rows: [String],
      seatsPerRow: Number,
      vipRows: [String]
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theater', theaterSchema);
