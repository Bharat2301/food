import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Admin Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter admin email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter admin password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
          >
            Admin Sign In
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white mb-2">Not an admin?</p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="text-white hover:underline hover:text-gray-200 transition-colors">
              User Login
            </Link>
            <Link to="/signup" className="text-white hover:underline hover:text-gray-200 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;