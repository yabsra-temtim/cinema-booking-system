 import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { showtimes, movies, theaters } from '../../data/mockData';
import toast from 'react-hot-toast';

const ManageShowtimes = () => {
  const [showtimeList, setShowtimeList] = useState(showtimes);
  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [formData, setFormData] = useState({
    movieId: '',
    theaterId: '',
    screen: '',
    date: '',
    startTime: '',
    price: '',
    vipPrice: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingShowtime) {
      const updatedShowtimes = showtimeList.map(showtime =>
        showtime.id === editingShowtime.id ? { ...showtime, ...formData, price: parseFloat(formData.price), vipPrice: parseFloat(formData.vipPrice) } : showtime
      );
      setShowtimeList(updatedShowtimes);
      toast.success('Showtime updated successfully!');
    } else {
      const newShowtime = {
        id: Date.now(),
        ...formData,
        endTime: 'Calculated',
        price: parseFloat(formData.price),
        vipPrice: parseFloat(formData.vipPrice)
      };
      setShowtimeList([...showtimeList, newShowtime]);
      toast.success('Showtime added successfully!');
    }
    
    setShowModal(false);
    setEditingShowtime(null);
    setFormData({
      movieId: '',
      theaterId: '',
      screen: '',
      date: '',
      startTime: '',
      price: '',
      vipPrice: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this showtime?')) {
      setShowtimeList(showtimeList.filter(showtime => showtime.id !== id));
      toast.success('Showtime deleted successfully!');
    }
  };

  const handleEdit = (showtime) => {
    setEditingShowtime(showtime);
    setFormData({
      movieId: showtime.movieId,
      theaterId: showtime.theaterId,
      screen: showtime.screen,
      date: showtime.date,
      startTime: showtime.startTime,
      price: showtime.price,
      vipPrice: showtime.vipPrice
    });
    setShowModal(true);
  };

  const getMovieName = (movieId) => {
    const movie = movies.find(m => m.id === parseInt(movieId));
    return movie ? movie.title : 'Unknown';
  };

  const getTheaterName = (theaterId) => {
    const theater = theaters.find(t => t.id === parseInt(theaterId));
    return theater ? theater.name : 'Unknown';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Showtimes</h1>
        <button
          onClick={() => {
            setEditingShowtime(null);
            setFormData({
              movieId: '',
              theaterId: '',
              screen: '',
              date: '',
              startTime: '',
              price: '',
              vipPrice: ''
            });
            setShowModal(true);
          }}
          className="bg-cinema-red px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <FaPlus />
          <span>Add Showtime</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="text-left py-3 px-4">Movie</th>
                <th className="text-left py-3 px-4">Theater</th>
                <th className="text-left py-3 px-4">Screen</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">VIP Price</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showtimeList.map((showtime) => (
                <tr key={showtime.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4">{getMovieName(showtime.movieId)}</td>
                  <td className="py-3 px-4">{getTheaterName(showtime.theaterId)}</td>
                  <td className="py-3 px-4">{showtime.screen}</td>
                  <td className="py-3 px-4">{showtime.date}</td>
                  <td className="py-3 px-4">{showtime.startTime}</td>
                  <td className="py-3 px-4">${showtime.price}</td>
                  <td className="py-3 px-4">${showtime.vipPrice}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(showtime)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition"
                      >
                        <FaEdit className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(showtime.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold">{editingShowtime ? 'Edit Showtime' : 'Add Showtime'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Movie</label>
                <select
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                >
                  <option value="">Select Movie</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Theater</label>
                <select
                  name="theaterId"
                  value={formData.theaterId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                >
                  <option value="">Select Theater</option>
                  {theaters.map(theater => (
                    <option key={theater.id} value={theater.id}>{theater.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Screen Number</label>
                <input
                  type="number"
                  name="screen"
                  value={formData.screen}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Regular Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">VIP Price ($)</label>
                  <input
                    type="number"
                    name="vipPrice"
                    value={formData.vipPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red rounded-lg hover:bg-red-700 transition"
                >
                  {editingShowtime ? 'Update' : 'Add'} Showtime
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShowtimes;