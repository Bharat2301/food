import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../../src/index.css';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-root">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        <div className="login-content">
          <h2 className="login-title">🍔 Admin Login</h2>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div className="form-group password-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Admin Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter admin password"
                required
              />
              <span
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '44px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="login-button"
            >
              🍟 Admin Sign In
            </motion.button>
          </form>

          <div className="login-links">
            <p>Not an admin?</p>
            <div className="links-container">
              <Link to="/" className="auth-link">
                User Login
              </Link>
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
