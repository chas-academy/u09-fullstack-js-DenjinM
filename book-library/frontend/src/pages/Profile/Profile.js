import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import { AuthContext } from '../../contexts/AuthContext'; // Importera AuthContext
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(AuthContext); // Hämta användardata och logout-funktion
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Ny del: Omdirigera till LoginPage om användaren inte finns (dvs inte inloggad)
  useEffect(() => {
    if (!user) {
      window.location.href = '/LoginPage'; // Omdirigera till inloggningssidan
    }
  }, [user]);

  // Hämta användarens recensioner och favoritböcker
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const reviewsResponse = await axios.get('/api/users/reviews', config);
        const favoritesResponse = await axios.get('/api/users/favorites', config);
        setReviews(reviewsResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        console.error('Fel vid hämtning av profildata:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Hantera profiluppdatering
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Lösenorden matchar inte');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedData = { name, email };
      if (password) {
        updatedData.password = password;
      }

      const response = await axios.put('/api/users/profile', updatedData, config);
      alert('Profilen uppdaterad');
    } catch (error) {
      console.error('Fel vid uppdatering av profil:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Min Profil</h2>
      <form onSubmit={handleProfileUpdate}>
        <div className="profile-section">
          <h3>Uppdatera Profil</h3>
          <div className="profile-input-group">
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="password">Nytt Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="confirm-password">Bekräfta Lösenord</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="profile-btn">Uppdatera Profil</button>
        </div>
      </form>

      <div className="profile-section">
        <h3>Mina Recensioner</h3>
        <div className="profile-reviews">
          <ul>
            {reviews.length === 0 ? (
              <p>Du har inga recensioner.</p>
            ) : (
              reviews.map((review) => (
                <li key={review._id}>
                  <h4>{review.book.title}</h4>
                  <p>{review.comment}</p>
                  <p>Betyg: {review.rating}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="profile-section">
        <h3>Mina Favoritböcker</h3>
        <div className="profile-favorites">
          <ul>
            {favorites.length === 0 ? (
              <p>Du har inga favoritmarkerade böcker.</p>
            ) : (
              favorites.map((book) => (
                <li key={book._id}>
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <button onClick={logout} className="logout-btn">Logga ut</button>
    </div>
  );
};

export default Profile;
