import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [favorites, setFavorites] = useState([]); // Default to an empty array
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      window.location.href = '/LoginPage';
    }
  }, [user]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const favoritesResponse = await axios.get('/api/users/favorites', config);
        setFavorites(favoritesResponse.data.favorites || []); // Ensure it's an array
      } catch (error) {
        console.error('Fel vid hämtning av profildata:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleRemoveFavorite = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/users/favorites/${bookId}`, config);
      setFavorites(favorites.filter(book => book.id !== bookId));
      setMessage('Boken borttagen från dina favoriter');
    } catch (error) {
      console.error('Fel vid borttagning av bok från favoriter:', error);
      setMessage('Ett fel uppstod vid borttagning av boken');
    }
  };

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

      await axios.put('/api/users/profile', updatedData, config);
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
              autoComplete="off"
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="password">Nytt Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="confirm-password">Bekräfta Lösenord</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="profile-btn">Uppdatera Profil</button>
        </div>
      </form>

      <div className="profile-section">
        <h3>Mina Recensioner</h3>
        <div className="profile-reviews">
          <ul>
            {reviews && reviews.length === 0 ? (
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
            {favorites && favorites.length === 0 ? (
              <p>Du har inga favoritmarkerade böcker.</p>
            ) : (
              favorites.map((book) => (
                <li key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <img src={book.thumbnail} alt={book.title} style={{ width: '100px', height: 'auto' }} />
                  </div>
                  <button onClick={() => handleRemoveFavorite(book.id)} className="remove-btn">
                    Ta bort <FaTrash />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      <button onClick={logout} className="logout-btn">Logga ut</button>
    </div>
  );
};

export default Profile;
