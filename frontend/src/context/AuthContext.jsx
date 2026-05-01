 import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - In real app, this would call API
      if (email === 'admin@cinebook.com' && password === 'admin123') {
        const userData = { id: 1, name: 'Admin User', email, role: 'admin' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Admin login successful!');
        return { success: true };
      } else if (email && password) {
        const userData = { id: 2, name: email.split('@')[0], email, role: 'user' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful!');
        return { success: true };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userData = { id: Date.now(), name, email, role: 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
