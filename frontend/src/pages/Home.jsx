 import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaChair, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { movies } from '../data/mockData';

const Home = () => {
  const featuredMovies = movies.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center bg-fixed" 
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div className="container-custom h-full flex items-center">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Experience the Magic of Cinema
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Book movie tickets online with ease. Choose your favorite movies,
                select your seats, and enjoy the show!
              </p>
              <Link to="/movies" className="btn-primary inline-flex items-center space-x-2 group">
                <span>Book Now</span>
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Now Showing</h2>
            <p className="text-gray-400 text-lg">Check out our featured movies</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
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
                      Book Tickets
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTicketAlt className="text-3xl" />,
                title: "Easy Booking",
                description: "Book your tickets in just a few clicks"
              },
              {
                icon: <FaChair className="text-3xl" />,
                title: "Choose Your Seat",
                description: "Interactive seat selection with real-time availability"
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: "24/7 Support",
                description: "Round-the-clock customer support"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card p-8 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-gradient-to-r from-cinema-red to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cinema-red/20 to-red-700/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Movie Night?</h2>
            <p className="text-gray-300 mb-8 text-lg">Grab your popcorn and book your tickets now!</p>
            <Link to="/movies" className="btn-primary inline-block text-lg px-8 py-3">
              Explore All Movies
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
