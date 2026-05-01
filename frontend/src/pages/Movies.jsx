 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendar, FaFilm } from 'react-icons/fa';
import { movies } from '../data/mockData';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const genres = ['Action', 'Adventure', 'Comedy', 'Sci-Fi', 'Animation', 'Fantasy'];
  const statuses = ['now_showing', 'upcoming'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
    const matchesStatus = !selectedStatus || movie.status === selectedStatus;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
            Movie Collection
          </h1>
          <p className="text-gray-400 text-lg">Discover the best movies showing near you</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
            >
              <option value="">All Movies</option>
              <option value="now_showing">Now Showing</option>
              <option value="upcoming">Upcoming</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
                setSelectedStatus('');
              }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <FaFilm className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No movies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="card group">
                <Link to={`/movie/${movie.id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-96 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-cinema-red px-2 py-1 rounded text-sm font-semibold">
                      ★ {movie.rating}
                    </div>
                    {movie.status === 'upcoming' && (
                      <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded-full text-sm">
                        <FaCalendar className="inline mr-1" /> Coming Soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cinema-red transition">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
                      <span>{movie.duration} min</span>
                      <span>{movie.language}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movie.genre.slice(0, 2).map(g => (
                        <span key={g} className="text-xs bg-gray-700 px-2 py-1 rounded">
                          {g}
                        </span>
                      ))}
                    </div>
                    <div className="btn-primary w-full text-center inline-block">
                      {movie.status === 'now_showing' ? 'Book Tickets' : 'Notify Me'}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
