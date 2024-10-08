import React, { useState } from 'react';
import './RegisterPage.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hantera registrering här
    console.log({ name, email, password, confirmPassword });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <FaUser className="input-icon" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <FaLock className="input-icon" />
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/LoginPage" className="register-link">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
