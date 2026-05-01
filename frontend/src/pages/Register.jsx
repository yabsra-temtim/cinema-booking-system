 import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2">Join CineBook today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cinema-red to-red-700 py-2 rounded-lg font-semibold hover:scale-105 transition transform"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cinema-red hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
