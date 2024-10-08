import React, { useState } from 'react';
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hantera inloggning här
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Log in</button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password" className="login-link">Forgot password?</a>
          <p>Don't have an account yet? <a href="/RegisterPage" className="login-link">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
