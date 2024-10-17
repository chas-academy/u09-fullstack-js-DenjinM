import React, { useState, useContext } from 'react';
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import backgroundImage from '../../images/books-background.jpg';
import { AuthContext } from '../../contexts/AuthContext'; // Importera AuthContext för att hantera inloggning
import { useNavigate } from 'react-router-dom'; // Importera useNavigate för att omdirigera användaren

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext); // Använd login-funktionen från AuthContext
  const navigate = useNavigate(); // Använd navigate för omdirigering

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Skicka POST-förfrågan till backend för att logga in
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

      if (response.ok) {
        login(data.token); // Spara token i AuthContext
        console.log('Inloggning lyckades:', data);
        if (data.user.role==='admin'){
          navigate('/admin');
        } else {

        
        navigate('/profile'); // Omdirigera användaren till profilsidan 
      }
      } else {
        setError(data.message || 'Fel vid inloggning. Försök igen.');
      }
    } catch (error) {
      setError('Serverfel. Försök igen senare.');
      console.error('Inloggningsfel:', error);
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
      autoComplete="email" // Tillåt förslag på tidigare email-adresser
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
      autoComplete="new-password" // Förhindra automatisk ifyllning av lösenord
    />
  </div>
          <button type="submit" className="login-btn">Log in</button>
        </form>

        {error && <p className="error-message">{error}</p>} {/* Visa felmeddelande om något går fel */}

        <div className="login-footer">
          <a href="/forgot-password" className="login-link">Forgot password?</a>
          <p>Don't have an account yet? <a href="/RegisterPage" className="login-link">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
