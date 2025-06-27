import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css';
import Burger from '../../assets/hero/hero-2.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempted with:', { email, password });
      alert('Login form submitted! Check console for details.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-form-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="login-form"
        >
          <div className="login-header">
            <h1>Login</h1>
            <p className="user-name">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter Email Or Phone No.</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email or phone"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <span className="toggle-password" onClick={togglePassword}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" disabled={isLoading} />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>

            <motion.button
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              type="submit"
              className={`logins-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </motion.button>

            <div className="signup-link">
              Don't have an account? <a href="#signup">Sign up</a>
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

        {/* Additional floating burger elements */}
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
            BEST
          </motion.h2>
          <motion.h2 
            className="burger-title-line"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            BURGER
          </motion.h2>
          <motion.h2 
            className="burger-title-line"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            IN TOWN
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

export default Login;