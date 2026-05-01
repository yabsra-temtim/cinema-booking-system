
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';
import AdminStats from './components/AdminStats';
import ManageMovies from './ManageMovies';
import ManageShowtimes from './ManageShowtimes';
import ManageBookings from './ManageBookings';
import ManageUsers from './ManageUsers';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminStats />} />
        <Route path="/movies" element={<ManageMovies />} />
        <Route path="/showtimes" element={<ManageShowtimes />} />
        <Route path="/bookings" element={<ManageBookings />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
