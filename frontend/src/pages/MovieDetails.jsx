 import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaClock, FaCalendar, FaLanguage, FaTicketAlt, FaArrowLeft, FaMapMarker, FaUsers } from 'react-icons/fa';
import { movies, showtimes, theaters } from '../data/mockData';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [availableShowtimes, setAvailableShowtimes] = useState([]);
  
  const movie = movies.find(m => m.id === parseInt(id));
  
  // Generate next 7 days for date selector
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      date: date.getDate(),
      full: dateStr
    };
  };

  useEffect(() => {
    if (selectedDate && selectedTheater) {
      const filtered = showtimes.filter(st => 
        st.movieId === movie?.id && 
        st.date === selectedDate && 
        st.theaterId === parseInt(selectedTheater)
      );
      setAvailableShowtimes(filtered);
      setSelectedShowtime(null);
    }
  }, [selectedDate, selectedTheater, movie?.id]);

  if (!movie) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <Link to="/movies" className="btn-primary mt-4 inline-block">Back to Movies</Link>
      </div>
    );
  }

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleContinueBooking = () => {
    if (selectedShowtime) {
      navigate(`/seat-selection/${selectedShowtime.id}`);
    }
  };

  return (
    <div className="pb-12">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center space-x-2 text-white hover:text-cinema-red transition"
          >
            <FaArrowLeft /> <span>Back</span>
          </button>
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              className="w-48 md:w-64 rounded-xl shadow-2xl"
            />
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500" />
                  <span>{movie.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
                  <FaClock />
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
                  <FaLanguage />
                  <span>{movie.language}</span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
                  <FaCalendar />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{movie.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Cast:</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map(actor => (
                    <span key={actor} className="bg-gray-800 px-3 py-1 rounded-full text-sm">{actor}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Director:</h3>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">{movie.director}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map(g => (
                  <span key={g} className="bg-cinema-red/20 text-cinema-red px-3 py-1 rounded-full text-sm">{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-6">Trailer</h2>
        <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
          <iframe
            src={movie.trailerUrl}
            title={`${movie.title} Trailer`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Showtimes Section */}
      {movie.status === 'now_showing' && (
        <div className="container-custom py-12">
          <h2 className="text-2xl font-bold mb-6">Select Showtime</h2>
          
          {/* Step 1: Date Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3 flex items-center">
              <FaCalendar className="mr-2 text-cinema-red" />
              Step 1: Select Date
            </label>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
              {dates.map(date => {
                const dateObj = formatDate(date);
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-xl text-center transition transform hover:scale-105 ${
                      isSelected 
                        ? 'bg-cinema-red text-white' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{dateObj.day}</div>
                    <div className="text-xl font-bold">{dateObj.date}</div>
                    <div className="text-xs">{dateObj.month}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Theater/Location Selector */}
          {selectedDate && (
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 flex items-center">
                <FaMapMarker className="mr-2 text-cinema-red" />
                Step 2: Select Location
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {theaters.map(theater => (
                  <button
                    key={theater.id}
                    onClick={() => setSelectedTheater(theater.id.toString())}
                    className={`p-4 rounded-xl text-left transition transform hover:scale-105 ${
                      selectedTheater === theater.id.toString()
                        ? 'bg-cinema-red text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{theater.name}</div>
                    <div className="text-sm opacity-80">{theater.location}</div>
                    <div className="text-xs mt-2 flex items-center">
                      <FaUsers className="mr-1" /> {theater.screens.length} Screens
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Time Selector */}
          {selectedDate && selectedTheater && (
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3 flex items-center">
                <FaClock className="mr-2 text-cinema-red" />
                Step 3: Select Time
              </label>
              {availableShowtimes.length === 0 ? (
                <div className="text-center py-8 bg-gray-800/50 rounded-xl">
                  <p className="text-gray-400">No showtimes available for this date and location</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableShowtimes.map(showtime => (
                    <button
                      key={showtime.id}
                      onClick={() => handleShowtimeSelect(showtime)}
                      className={`p-4 rounded-xl text-center transition transform hover:scale-105 ${
                        selectedShowtime?.id === showtime.id
                          ? 'bg-cinema-red text-white ring-2 ring-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-xl font-bold">{showtime.startTime}</div>
                      <div className="text-sm mt-1">Screen {showtime.screen}</div>
                      <div className="text-xs mt-2">
                        From ${showtime.price}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {selectedShowtime && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-4 z-40">
              <div className="container-custom">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Selected Showtime</p>
                    <p className="font-semibold">
                      {selectedShowtime.startTime} • Screen {selectedShowtime.screen}
                    </p>
                  </div>
                  <button
                    onClick={handleContinueBooking}
                    className="btn-primary px-8 py-3 text-lg flex items-center space-x-2"
                  >
                    <FaTicketAlt />
                    <span>Continue to Seat Selection</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
