const Showtime = require('../models/Showtime');
const Theater = require('../models/Theater');
const Seat = require('../models/Seat');

// @desc    Get all showtimes
// @route   GET /api/showtimes
exports.getShowtimes = async (req, res) => {
  try {
    const { movieId, date } = req.query;
    let query = {};

    if (movieId) query.movieId = movieId;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const showtimes = await Showtime.find(query)
      .populate('movieId', 'title duration posterUrl')
      .populate('theaterId', 'name location');
      
    res.json({ success: true, count: showtimes.length, data: showtimes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single showtime
// @route   GET /api/showtimes/:id
exports.getShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate('movieId')
      .populate('theaterId');
      
    if (!showtime) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }
    res.json({ success: true, data: showtime });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create showtime
// @route   POST /api/showtimes
exports.createShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.create(req.body);
    
    // Initialize seats for this showtime
    const theater = await Theater.findById(showtime.theaterId);
    if (theater) {
      const screen = theater.screens.find(s => s.screenNumber === showtime.screenNumber);
      if (screen && screen.seatLayout) {
        const { rows, seatsPerRow } = screen.seatLayout;
        const seatDocs = [];
        
        for (const row of rows) {
          for (let i = 1; i <= seatsPerRow; i++) {
            seatDocs.push({
              showtimeId: showtime._id,
              seatId: `${row}${i}`,
              status: 'available',
              price: screen.seatLayout.vipRows.includes(row) ? showtime.vipPrice : showtime.regularPrice
            });
          }
        }
        await Seat.insertMany(seatDocs);
      }
    }

    res.status(201).json({ success: true, data: showtime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update showtime
// @route   PUT /api/showtimes/:id
exports.updateShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!showtime) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }
    res.json({ success: true, data: showtime });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete showtime
// @route   DELETE /api/showtimes/:id
exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }
    // Delete associated seats
    await Seat.deleteMany({ showtimeId: req.params.id });
    
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
