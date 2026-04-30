const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  genre: [{
    type: String,
    required: true
  }],
  language: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  posterUrl: {
    type: String,
    required: true
  },
  backdropUrl: {
    type: String
  },
  trailerUrl: {
    type: String
  },
  cast: [{
    type: String
  }],
  director: {
    type: String
  },
  status: {
    type: String,
    enum: ['now_showing', 'upcoming', 'ended'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
