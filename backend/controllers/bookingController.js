const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const Showtime = require('../models/Showtime');

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { showtimeId, seats, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    // Fetch showtime with populated movie and theater
    const showtime = await Showtime.findById(showtimeId)
      .populate('movieId')
      .populate('theaterId');

    if (!showtime) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }

    // Check if seats are still available
    const unavailableSeats = await Seat.find({
      showtimeId,
      seatId: { $in: seats },
      status: 'booked'
    });
    
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Some seats are no longer available: ${unavailableSeats.map(s => s.seatId).join(', ')}`
      });
    }

    // Map seatIds to the structure expected by the model
    const seatItems = seats.map(seatId => ({
      row: seatId.charAt(0),
      number: parseInt(seatId.substring(1)),
      type: seatId.charAt(0) >= 'E' ? 'vip' : 'regular' // Simple logic or fetch from Seat model
    }));

    // Create booking
    const booking = await Booking.create({
      userId,
      showtimeId,
      movieTitle: showtime.movieId.title,
      theaterName: showtime.theaterId.name,
      screenNumber: showtime.screenNumber.toString(),
      date: showtime.date,
      startTime: showtime.startTime,
      seats: seatItems,
      totalAmount,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'completed',
      bookingStatus: 'active',
      qrCode: `BOOKING-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    });

    // Mark seats as booked and notify via Socket.io
    const io = req.app.get('socketio');
    for (const seatId of seats) {
      await Seat.findOneAndUpdate(
        { showtimeId, seatId },
        { status: 'booked', userId },
        { upsert: true }
      );
      
      if (io) {
        io.to(showtimeId).emit('seat-updated', { seatId, status: 'booked' });
      }
    }

    // Mock email notification
    console.log(`[NOTIFY] Email sent to ${req.user.email}: Booking confirmed for ${showtime.movieId.title}! Booking ID: ${booking._id}`);

    res.status(201).json({ 
      success: true, 
      message: 'Booking confirmed! A notification has been sent to your email.',
      data: booking 
    });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ bookingDate: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

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
    
    // Free up seats and notify via Socket.io
    const io = req.app.get('socketio');
    const seatIds = booking.seats.map(s => `${s.row}${s.number}`);
    
    for (const seatId of seatIds) {
      await Seat.findOneAndUpdate(
        { showtimeId: booking.showtimeId, seatId },
        { status: 'available', $unset: { userId: 1 } }
      );
      
      if (io) {
        io.to(booking.showtimeId).emit('seat-updated', { seatId, status: 'available' });
      }
    }
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
