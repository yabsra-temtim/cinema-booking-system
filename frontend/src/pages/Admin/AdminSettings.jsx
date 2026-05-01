 import React, { useState } from 'react';
import { FaSave, FaTimes, FaBell, FaCreditCard, FaGlobe, FaMailBulk, FaMobileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'CineBook',
    siteEmail: 'info@cinebook.com',
    contactPhone: '+1 234 567 8900',
    currency: 'USD',
    timezone: 'America/New_York',
    bookingTimeLimit: '30',
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enablePushNotifications: true,
    seatHoldTime: '5',
    maxSeatsPerBooking: '10',
    allowCancellation: true,
    cancellationWindow: '24'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('cinemaSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaGlobe className="mr-2 text-cinema-red" />
            General Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Site Email</label>
              <input
                type="email"
                name="siteEmail"
                value={settings.siteEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCreditCard className="mr-2 text-cinema-red" />
            Booking Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Booking Time Limit (minutes)</label>
              <input
                type="number"
                name="bookingTimeLimit"
                value={settings.bookingTimeLimit}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
              <p className="text-xs text-gray-400 mt-1">Time to complete checkout before seats are released</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Seat Hold Time (minutes)</label>
              <input
                type="number"
                name="seatHoldTime"
                value={settings.seatHoldTime}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
              <p className="text-xs text-gray-400 mt-1">How long selected seats are reserved</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Seats Per Booking</label>
              <input
                type="number"
                name="maxSeatsPerBooking"
                value={settings.maxSeatsPerBooking}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cancellation Window (hours)</label>
              <input
                type="number"
                name="cancellationWindow"
                value={settings.cancellationWindow}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
              <p className="text-xs text-gray-400 mt-1">Hours before showtime to allow cancellations</p>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer">
                <span>Allow Ticket Cancellation</span>
                <input
                  type="checkbox"
                  name="allowCancellation"
                  checked={settings.allowCancellation}
                  onChange={handleChange}
                  className="toggle-checkbox"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaBell className="mr-2 text-cinema-red" />
            Notification Settings
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <FaMailBulk />
                <span>Email Notifications</span>
              </div>
              <input
                type="checkbox"
                name="enableEmailNotifications"
                checked={settings.enableEmailNotifications}
                onChange={handleChange}
                className="toggle-checkbox"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <FaMobileAlt />
                <span>SMS Notifications</span>
              </div>
              <input
                type="checkbox"
                name="enableSMSNotifications"
                checked={settings.enableSMSNotifications}
                onChange={handleChange}
                className="toggle-checkbox"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
          >
            <FaTimes />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-cinema-red rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
          >
            <FaSave />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
