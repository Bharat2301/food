import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons
import '../../../src/index.css';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="login-root">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        <div className="login-content">
          <h2 className="login-title">🍔 Create Account</h2>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group password-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
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

            <div className="form-group password-group" style={{ position: 'relative' }}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirm your password"
                required
              />
              <span
                onClick={toggleConfirmPassword}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '44px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="login-button"
            >
              🍟 Create Account
            </motion.button>
          </form>

          <div className="login-links">
            <p>Already have an account?</p>
            <div className="links-container">
              <Link to="/" className="auth-link">
                Login
              </Link>
              <Link to="/AdminLogin" className="auth-link">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
