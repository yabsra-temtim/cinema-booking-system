const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
exports.getMovies = async (req, res) => {
  try {
    const { status, genre, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (genre) query.genre = genre;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ releaseDate: -1 });
    res.json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    console.error('Error in getMovies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    console.error('Error in getMovie:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create movie
// @route   POST /api/movies
exports.createMovie = async (req, res) => {
  try {
    console.log('Creating movie with data:', req.body);
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    console.error('Error in createMovie:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    console.error('Error in updateMovie:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteMovie:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
