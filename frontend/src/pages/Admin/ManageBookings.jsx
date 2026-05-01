 import React, { useState, useEffect } from 'react';
import { FaEye, FaDownload, FaPrint } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      return booking.date === new Date().toISOString().split('T')[0];
    }
    return true;
  });

  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTickets = filteredBookings.reduce((sum, b) => sum + (b.seats?.length || 0), 0);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDownloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      filter: filter,
      totalBookings: filteredBookings.length,
      totalRevenue: totalRevenue,
      totalTickets: totalTickets,
      bookings: filteredBookings
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <div className="flex space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
          >
            <option value="all">All Bookings</option>
            <option value="today">Today's Bookings</option>
          </select>
          <button
            onClick={handleDownloadReport}
            className="bg-cinema-red px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
          >
            <FaDownload />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Total Bookings</p>
          <p className="text-3xl font-bold">{filteredBookings.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Total Tickets Sold</p>
          <p className="text-3xl font-bold">{totalTickets}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Average Ticket Price</p>
          <p className="text-3xl font-bold">
            ${totalTickets > 0 ? (totalRevenue / totalTickets).toFixed(2) : '0'}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="text-left py-3 px-4">Booking ID</th>
                <th className="text-left py-3 px-4">Movie</th>
                <th className="text-left py-3 px-4">Theater</th>
                <th className="text-left py-3 px-4">Seats</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4 text-sm">#{booking.id}</td>
                  <td className="py-3 px-4">{booking.movie}</td>
                  <td className="py-3 px-4">{booking.theater}</td>
                  <td className="py-3 px-4">{booking.seats?.join(', ')}</td>
                  <td className="py-3 px-4">{booking.date}</td>
                  <td className="py-3 px-4">{booking.time}</td>
                  <td className="py-3 px-4">${booking.totalAmount}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition"
                    >
                      <FaEye className="text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-400">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <p><strong>Booking ID:</strong> #{selectedBooking.id}</p>
              <p><strong>Movie:</strong> {selectedBooking.movie}</p>
              <p><strong>Theater:</strong> {selectedBooking.theater}</p>
              <p><strong>Screen:</strong> {selectedBooking.screen}</p>
              <p><strong>Date:</strong> {selectedBooking.date}</p>
              <p><strong>Time:</strong> {selectedBooking.time}</p>
              <p><strong>Seats:</strong> {selectedBooking.seats?.join(', ')}</p>
              <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount}</p>
              <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleString()}</p>
              <p><strong>QR Code:</strong> {selectedBooking.qrCode}</p>
            </div>
            <div className="p-6 border-t border-gray-700">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full bg-cinema-red py-2 rounded-lg hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
