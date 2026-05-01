 import React, { useState, useEffect } from 'react';
import { 
  FaFilm, FaCalendarAlt, FaTicketAlt, FaUsers, 
  FaDollarSign, FaStar, FaChartLine, FaArrowUp, FaArrowDown 
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { movies, showtimes } from '../../../data/mockData';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalShowtimes: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    occupancyRate: 0
  });

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    setStats({
      totalMovies: movies.length,
      totalShowtimes: showtimes.length,
      totalBookings: bookings.length,
      totalUsers: users.length || 5,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
      occupancyRate: 68
    });
  }, []);

  const revenueData = [
    { day: 'Mon', revenue: 1250, bookings: 85 },
    { day: 'Tue', revenue: 980, bookings: 62 },
    { day: 'Wed', revenue: 1420, bookings: 94 },
    { day: 'Thu', revenue: 1680, bookings: 112 },
    { day: 'Fri', revenue: 2450, bookings: 168 },
    { day: 'Sat', revenue: 3240, bookings: 225 },
    { day: 'Sun', revenue: 2890, bookings: 198 },
  ];

  const moviePopularity = movies.map(movie => ({
    name: movie.title.split(' ')[0],
    bookings: Math.floor(Math.random() * 200) + 50,
    revenue: Math.floor(Math.random() * 5000) + 1000
  }));

  const COLORS = ['#E50914', '#F5C518', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

  const statCards = [
    { title: 'Total Movies', value: stats.totalMovies, icon: <FaFilm />, color: 'from-blue-500 to-blue-700', trend: '+2', trendUp: true },
    { title: 'Total Showtimes', value: stats.totalShowtimes, icon: <FaCalendarAlt />, color: 'from-green-500 to-green-700', trend: '+5', trendUp: true },
    { title: 'Total Bookings', value: stats.totalBookings, icon: <FaTicketAlt />, color: 'from-purple-500 to-purple-700', trend: '+12', trendUp: true },
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'from-pink-500 to-pink-700', trend: '+3', trendUp: true },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: <FaDollarSign />, color: 'from-yellow-500 to-yellow-700', trend: '+15%', trendUp: true },
    { title: 'Occupancy Rate', value: `${stats.occupancyRate}%`, icon: <FaChartLine />, color: 'from-red-500 to-red-700', trend: '-2%', trendUp: false },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className={`bg-gradient-to-r ${card.color} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-start mb-4">
              <div className="text-3xl">{card.icon}</div>
              <div className={`flex items-center space-x-1 text-sm ${card.trendUp ? 'text-green-300' : 'text-red-300'}`}>
                {card.trendUp ? <FaArrowUp /> : <FaArrowDown />}
                <span>{card.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-sm opacity-90 mt-1">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Trend (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#E50914" name="Revenue ($)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Daily Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
              <Bar dataKey="bookings" fill="#F5C518" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moviePopularity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="bookings"
              >
                {moviePopularity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Top Grossing Movies</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moviePopularity.slice(0, 5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Bar dataKey="revenue" fill="#E50914" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Booking ID</th>
                <th className="text-left py-3 px-4">Movie</th>
                <th className="text-left py-3 px-4">Seats</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.getItem('bookings') || '[]').slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4 text-sm">#{booking.id}</td>
                  <td className="py-3 px-4">{booking.movie}</td>
                  <td className="py-3 px-4">{booking.seats?.join(', ')}</td>
                  <td className="py-3 px-4">${booking.totalAmount}</td>
                  <td className="py-3 px-4">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </td>
                </tr>
              ))}
              {JSON.parse(localStorage.getItem('bookings') || '[]').length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No bookings yet. Make a booking first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
