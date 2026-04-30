const Seat = require('../models/Seat');
const Showtime = require('../models/Showtime');

// @desc    Get seat layout for showtime
// @route   GET /api/seats/:showtimeId
exports.getSeatLayout = async (req, res) => {
  try {
    const { showtimeId } = req.params;
    
    // Get showtime to know theater layout
    const showtime = await Showtime.findById(showtimeId).populate('theaterId');
    if (!showtime) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }
    
    // Get all seats for this showtime
    const seats = await Seat.find({ showtimeId });
    
    res.json({
      success: true,
      data: {
        showtime,
        seats,
        layout: showtime.theaterId.screens.find(s => s.screenNumber === showtime.screenNumber)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Lock seats temporarily
// @route   POST /api/seats/lock
exports.lockSeats = async (req, res) => {
  try {
    const { showtimeId, seats, userId } = req.body;
    const lockExpiry = new Date(Date.now() + 5 * 60000); // 5 minutes
    
    for (const seat of seats) {
      await Seat.findOneAndUpdate(
        { showtimeId, seatId: seat },
        {
          status: 'locked',
          lockedBy: userId,
          lockedAt: new Date(),
          expiresAt: lockExpiry
        },
        { upsert: true }
      );
    }
    
    res.json({ success: true, message: 'Seats locked for 5 minutes' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
