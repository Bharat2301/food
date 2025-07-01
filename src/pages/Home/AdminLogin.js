import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminLogin.css';
import Burger from '../../assets/hero/hero-2.png';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://backened-76cg.onrender.com//api/auth/admin-login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      toast.success('Admin login successful!');
      setIsLoading(false);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin login failed. Please try again.');
      setError(err.response?.data?.message || 'Admin login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Left Side - Login Form */}
      <div className="admin-login-form-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="admin-login-form"
        >
          <div className="admin-login-header">
            <h1>Admin Login</h1>
            <p className="admin-welcome">Restricted access - authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter admin email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Admin Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter admin password"
                  required
                  disabled={isLoading}
                />
                <span className="toggle-password" onClick={togglePassword}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <motion.button
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              type="submit"
              className={`admin-login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Admin Login'}
            </motion.button>

            <div className="user-options">
              Not an admin? <Link to="/Login">User Login</Link> or <Link to="/Signup">Sign Up</Link>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Side - Burger Section */}
      <div className="burger-section">
        <div className="curved-top-section"></div>
        <div className="sloped-edge"></div>
        
        {/* Decorative Burgers */}
        <motion.div 
          className="heart-decoration heart-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.span
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🍔
          </motion.span>
        </motion.div>

        <motion.div 
          className="heart-decoration heart-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.span
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            🍟
          </motion.span>
        </motion.div>

        <motion.div 
          className="heart-decoration heart-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.span
            animate={{ 
              y: [0, -12, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🥤
          </motion.span>
        </motion.div>

        <div className="burger-title-container">
          <motion.h2 
            className="burger-title-line"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ADMIN
          </motion.h2>
          <motion.h2 
            className="burger-title-line"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ACCESS
          </motion.h2>
          <motion.h2 
            className="burger-title-line"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ONLY
          </motion.h2>
        </div>
        
        <motion.div 
          className="burger-image-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={Burger} className="burger-image" alt="Delicious Burger" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLogin;