 import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart, FaFilm } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black/95 border-t border-gray-800 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <FaFilm className="text-cinema-red" />
              <span className="bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
                CineBook
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for movie tickets. Book your favorite movies
              with ease and enjoy the cinema experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/movies" className="hover:text-cinema-red transition">Now Showing</a></li>
              <li><a href="/movies" className="hover:text-cinema-red transition">Upcoming Movies</a></li>
              <li><a href="/my-bookings" className="hover:text-cinema-red transition">My Bookings</a></li>
              <li><a href="#" className="hover:text-cinema-red transition">Offers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cinema-red transition">FAQ</a></li>
              <li><a href="#" className="hover:text-cinema-red transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-cinema-red transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cinema-red transition">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-cinema-red text-2xl transition transform hover:scale-110">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-red text-2xl transition transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-red text-2xl transition transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-red text-2xl transition transform hover:scale-110">
                <FaYoutube />
              </a>
            </div>
            <p className="text-gray-500 text-xs flex items-center">
              Made with <FaHeart className="text-cinema-red mx-1 text-xs" /> for cinema lovers
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 CineBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
