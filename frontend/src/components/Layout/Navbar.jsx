 import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilm, FaUser, FaSignOutAlt, FaBars, FaTimes, FaTicketAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold group">
            <FaFilm className="text-cinema-red group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
              CineBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-cinema-red transition-colors duration-200">Home</Link>
            <Link to="/movies" className="hover:text-cinema-red transition-colors duration-200">Movies</Link>
            {user && (
              <Link to="/my-bookings" className="hover:text-cinema-red transition-colors duration-200">
                My Bookings
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-cinema-red transition-colors duration-200">
                Admin Panel
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 bg-gradient-to-r from-cinema-red to-red-700 rounded-full flex items-center justify-center text-xs">
                    <FaUser />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-cinema-red px-4 py-1.5 rounded-lg hover:bg-red-700 transition transform hover:scale-105"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-cinema-red to-red-700 px-6 py-1.5 rounded-lg hover:scale-105 transition transform"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-cinema-red transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/movies" className="hover:text-cinema-red transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Movies
              </Link>
              {user && (
                <Link to="/my-bookings" className="hover:text-cinema-red transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                  My Bookings
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-cinema-red transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              {!user && (
                <Link to="/login" className="bg-cinema-red text-center px-4 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
              {user && (
                <button onClick={handleLogout} className="bg-cinema-red text-left px-4 py-2 rounded-lg">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

