import React, { useState, useContext } from 'react';
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import backgroundImage from '../../images/books-background.jpg';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
      console.log('Svarande data från server:', data);
  
      if (response.ok) {
        login(data); // Skicka hela dataobjektet
        console.log('Inloggning lyckades:', data);
        navigate('/'); // Omdirigera användaren efter lyckad inloggning
      } else {
        console.error('Fel vid inloggning:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Nätverksfel eller serverfel:', error);
      setError('Ett fel uppstod. Vänligen försök igen senare.');
    }
  };  

  return (
    <div className="login-container"
    style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh' 
    }}>
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="login-btn">Log in</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="login-footer">
          <a href="/forgot-password" className="login-link">Forgot password?</a>
          <p>Don't have an account yet? <a href="/RegisterPage" className="login-link">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
