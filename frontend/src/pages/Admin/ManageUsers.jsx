 import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaTimes, FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@cinebook.com', role: 'admin', joinDate: '2024-01-01', bookings: 0 },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2024-02-15', bookings: 3 },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', joinDate: '2024-03-10', bookings: 5 },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', joinDate: '2024-03-20', bookings: 2 },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      toast.success('User updated successfully!');
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        bookings: 0
      };
      setUsers([...users, newUser]);
      toast.success('User added successfully!');
    }
    
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'user' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully!');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowModal(true);
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role === 'user').length,
    totalBookings: users.reduce((sum, u) => sum + u.bookings, 0)
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', role: 'user' });
            setShowModal(true);
          }}
          className="bg-cinema-red px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <FaUserPlus />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Total Users</p>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Active Users</p>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl p-6">
          <p className="text-sm opacity-90">Total Bookings</p>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Join Date</th>
                <th className="text-left py-3 px-4">Bookings</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4">#{user.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-gray-400" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-gray-400" />
                      <span>{user.joinDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.bookings}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition"
                      >
                        <FaEdit className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold">{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red rounded-lg hover:bg-red-700 transition"
                >
                  {editingUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
