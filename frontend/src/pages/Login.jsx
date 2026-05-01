 import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cinema-red to-cinema-gold bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cinema-red to-red-700 py-2 rounded-lg font-semibold hover:scale-105 transition transform"
          >
            Login
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-cinema-red hover:underline">
            Sign up
          </Link>
        </p>
        
        <p className="text-center mt-4 text-xs text-gray-500">
          Demo: Use any email/password or admin@cinebook.com / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
