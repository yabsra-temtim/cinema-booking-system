const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const Showtime = require('../models/Showtime');

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { showtimeId, seats, totalAmount } = req.body;
    const userId = req.user.id;

    // Check if seats are still available
    for (const seat of seats) {
      const seatDoc = await Seat.findOne({
        showtimeId,
        seatId: `${seat.row}${seat.number}`,
        status: { $in: ['booked', 'locked'] }
      });
      
      if (seatDoc) {
        return res.status(400).json({
          success: false,
          message: `Seat ${seat.row}${seat.number} is no longer available`
        });
      }
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      showtimeId,
      seats,
      totalAmount,
      paymentStatus: 'completed',
      bookingStatus: 'active',
      qrCode: `BOOKING-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    });

    // Mark seats as booked
    for (const seat of seats) {
      await Seat.findOneAndUpdate(
        { showtimeId, seatId: `${seat.row}${seat.number}` },
        { status: 'booked' },
        { upsert: true }
      );
    }

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('showtimeId')
      .sort({ bookingDate: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('showtimeId')
      .populate('userId', 'name email');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Check if user owns booking or is admin
    if (booking.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    booking.bookingStatus = 'cancelled';
    await booking.save();
    
    // Free up seats
    await Seat.updateMany(
      { showtimeId: booking.showtimeId, seatId: { $in: booking.seats.map(s => `${s.row}${s.number}`) } },
      { status: 'available' }
    );
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
