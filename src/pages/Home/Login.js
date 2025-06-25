import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-25 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-red text-center mb-6 font-serif">
          🍔 Burger Login
        </h2>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-yellow mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-yellow mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-white text-red-600 font-bold rounded-lg shadow-md hover:bg-yellow-100 transition-colors"
          >
            🍟 Sign In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-black mb-2">Don’t have an account?</p>
          <div className="flex justify-center gap-6">
            <Link
              to="/signup"
              className="text-blue font-semibold hover:underline hover:text-yellow-100 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/admin-login"
              className="text-blue font-semibold hover:underline hover:text-yellow-100 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
