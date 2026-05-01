 import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTicketAlt, FaCalendar, FaClock, FaMapMarker, FaChair, FaDownload } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/my');
        setBookings(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load bookings');
      }
    };

    fetchBookings();
  }, [location.state]);

  const handleDownloadTicket = (booking) => {
    const ticketHtml = `
      <html>
        <head>
          <title>CineBook Ticket - ${booking.movieTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .ticket { border: 2px solid #E50914; border-radius: 10px; padding: 20px; max-width: 500px; margin: 0 auto; }
            .movie-title { font-size: 24px; font-weight: bold; color: #E50914; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h2>CineBook</h2>
            <h3 class="movie-title">${booking.movieTitle}</h3>
            <p>Theater: ${booking.theaterName}</p>
            <p>Date: ${booking.date}</p>
            <p>Time: ${booking.startTime}</p>
            <p>Seats: ${booking.seats.join(', ')}</p>
            <p>Amount: $${booking.totalAmount}</p>
            <p>Booking ID: ${booking._id}</p>
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([ticketHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.movieTitle.replace(/\s/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (bookings.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <FaTicketAlt className="text-6xl text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
        <p className="text-gray-400 mb-6">You haven't booked any tickets yet</p>
        <a href="/movies" className="btn-primary inline-block">Browse Movies</a>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
          My Bookings
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cinema-red transition cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-cinema-red">{booking.movieTitle}</h3>
                    <p className="text-sm text-gray-400">Booking ID: {booking._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p className="text-lg font-bold text-cinema-red">${booking.totalAmount}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <FaMapMarker className="text-gray-400" />
                    <span>{booking.theaterName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendar className="text-gray-400" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-400" />
                    <span>{booking.startTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaChair className="text-gray-400" />
                    <span>Seats: {booking.seats.join(', ')}</span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadTicket(booking);
                  }}
                  className="mt-4 flex items-center space-x-2 text-cinema-red hover:text-red-500 transition"
                >
                  <FaDownload />
                  <span>Download Ticket</span>
                </button>
              </div>
            ))}
          </div>
          
          {/* Ticket Preview */}
          {selectedBooking && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 sticky top-24 border-2 border-cinema-red">
              <h2 className="text-xl font-bold mb-4 text-center">Your Ticket</h2>
              <div className="text-center mb-4">
                <QRCodeCanvas value={selectedBooking.qrCode} size={150} className="mx-auto" />
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Movie:</strong> {selectedBooking.movieTitle}</p>
                <p><strong>Theater:</strong> {selectedBooking.theaterName}</p>
                <p><strong>Screen:</strong> {selectedBooking.screenNumber}</p>
                <p><strong>Date:</strong> {selectedBooking.date}</p>
                <p><strong>Time:</strong> {selectedBooking.startTime}</p>
                <p><strong>Seats:</strong> {selectedBooking.seats.join(', ')}</p>
                <hr className="border-gray-700 my-2" />
                <p className="text-center text-xs text-gray-400">
                  Show this QR code at the cinema entrance
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
