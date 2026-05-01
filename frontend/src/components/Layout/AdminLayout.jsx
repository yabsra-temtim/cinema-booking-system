 import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminSidebar from '../Admin/AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-cinema-red p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
