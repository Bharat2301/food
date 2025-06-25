import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
          >
            Create Account
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white mb-2">Already have an account?</p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="text-white hover:underline hover:text-gray-200 transition-colors">
              Login
            </Link>
            <Link to="/admin-login" className="text-white hover:underline hover:text-gray-200 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;