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
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState(''); // Lägg till ett tillstånd för meddelandet

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
        // Hämta favoriter
        const favoritesResponse = await axios.get('/api/users/favorites', config);
        setFavorites(favoritesResponse.data.favorites);
      } catch (error) {
        console.error('Fel vid hämtning av profildata:', error);
      }
    };
    fetchProfileData();
  }, []);

  // Funktion för att ta bort bok från favoriter
  const handleRemoveFavorite = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(bookId);
      await axios.delete(`/api/users/favorites/${bookId}`, config);
            setFavorites(favorites.filter(book => book.id !== bookId)); // Uppdatera state för att ta bort boken lokalt
      setMessage('Boken borttagen från dina favoriter'); // Visa meddelande
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
              autoComplete="off" // Förhindra automatisk ifyllning av email
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="password">Nytt Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" // Förhindra automatisk ifyllning av lösenord
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="confirm-password">Bekräfta Lösenord</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password" // Förhindra automatisk ifyllning av lösenord
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
        {message && <p className="message">{message}</p>} {/* Visa meddelande */}
      </div>

      <button onClick={logout} className="logout-btn">Logga ut</button>
    </div>
  );
};


export default Profile;
