 import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaFilm, FaCalendarAlt, FaUsers, FaTicketAlt, 
  FaChartLine, FaCog 
} from 'react-icons/fa';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <FaChartLine /> },
    { path: '/admin/movies', name: 'Movies', icon: <FaFilm /> },
    { path: '/admin/showtimes', name: 'Showtimes', icon: <FaCalendarAlt /> },
    { path: '/admin/bookings', name: 'Bookings', icon: <FaTicketAlt /> },
    { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
    { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="h-full bg-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <FaChartLine className="text-cinema-red text-2xl" />
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive 
                    ? 'bg-cinema-red text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
