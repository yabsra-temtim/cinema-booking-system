 import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaStar, FaTimes } from 'react-icons/fa';
import { movies } from '../../data/mockData';
import toast from 'react-hot-toast';

const ManageMovies = () => {
  const [movieList, setMovieList] = useState(movies);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    genre: '',
    language: '',
    rating: '',
    posterUrl: '',
    status: 'now_showing'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMovie) {
      const updatedMovies = movieList.map(movie => 
        movie.id === editingMovie.id ? { 
          ...movie, 
          ...formData, 
          genre: formData.genre.split(','),
          rating: parseFloat(formData.rating),
          duration: parseInt(formData.duration)
        } : movie
      );
      setMovieList(updatedMovies);
      toast.success('Movie updated successfully!');
    } else {
      const newMovie = {
        id: Date.now(),
        ...formData,
        genre: formData.genre.split(','),
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration),
        releaseDate: new Date().toISOString().split('T')[0],
        backdropUrl: formData.posterUrl,
        cast: ['New Actor'],
        director: 'New Director'
      };
      setMovieList([...movieList, newMovie]);
      toast.success('Movie added successfully!');
    }
    
    setShowModal(false);
    setEditingMovie(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      genre: '',
      language: '',
      rating: '',
      posterUrl: '',
      status: 'now_showing'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovieList(movieList.filter(movie => movie.id !== id));
      toast.success('Movie deleted successfully!');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      genre: movie.genre.join(','),
      language: movie.language,
      rating: movie.rating,
      posterUrl: movie.posterUrl,
      status: movie.status
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Movies</h1>
        <button
          onClick={() => {
            setEditingMovie(null);
            setFormData({
              title: '',
              description: '',
              duration: '',
              genre: '',
              language: '',
              rating: '',
              posterUrl: '',
              status: 'now_showing'
            });
            setShowModal(true);
          }}
          className="bg-cinema-red px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <FaPlus />
          <span>Add Movie</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movieList.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <FaStar className="text-yellow-500" />
                <span>{movie.rating}/5</span>
                <span>•</span>
                <span>{movie.duration} min</span>
                <span>•</span>
                <span>{movie.language}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{movie.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.genre.map(g => (
                  <span key={g} className="text-xs bg-gray-700 px-2 py-1 rounded">{g}</span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded ${
                  movie.status === 'now_showing' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {movie.status === 'now_showing' ? 'Now Showing' : 'Upcoming'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Genre (comma separated)</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    placeholder="Action, Sci-Fi, Drama"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Poster URL</label>
                <input
                  type="url"
                  name="posterUrl"
                  value={formData.posterUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                >
                  <option value="now_showing">Now Showing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
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
                  {editingMovie ? 'Update' : 'Add'} Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
