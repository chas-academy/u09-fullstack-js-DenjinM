import React, { useState } from 'react';
import './RegisterPage.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import backgroundImage from '../../images/register-background.jpg';
import axiosInstance from '../../api/axiosInstance'; // Justera sökvägen om nödvändigt
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera att lösenord och bekräftat lösenord matchar
    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    try {
      // Skicka POST-förfrågan till backend med axiosInstance
      const response = await axiosInstance.post('users/register', {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.ok) {
        setSuccess('Registrering lyckades!');
        setError('');
        console.log('Success:', response.data);
        // Eventuell omdirigering, t.ex. till inloggningssidan:
        // window.location.href = '/LoginPage';
      } else {
        setError(data.message || 'Registreringsfel, försök igen.');
      }
    } catch (error) {
      setError('Något gick fel. Försök igen senare.');
      console.error('Error:', error);
    }
  };

  return (
    <div
  className="register-container"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  }}
>
  <div className="register-box">
    <h2>Register</h2>
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <FaUser className="input-icon" />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="off" // Förhindra förslag för namn
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
          autoComplete="off" // Tillåt tidigare email-förslag
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
          autoComplete="new-password" // Förhindra automatisk ifyllning av lösenord
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
          autoComplete="new-password" // Förhindra automatisk ifyllning av lösenord
        />
      </div>
      <button type="submit" className="register-btn">Register</button>
    </form>

    {error && <p className="error-message">{error}</p>}
    {success && <p className="success-message">{success}</p>}

    <div className="register-footer">
      <p>
        Already have an account? <a href="/LoginPage" className="register-link">Log in</a>
      </p>
    </div>
  </div>
</div>
  );
};

export default RegisterPage;
