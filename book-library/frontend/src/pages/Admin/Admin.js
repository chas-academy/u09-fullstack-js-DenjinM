import React, { useContext, useState, useEffect } from 'react';
import './Admin.css';
import { AuthContext } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';



const Admin = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    description: ''
  });
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Uppdaterad URL med bas-URL
        const response = await axiosInstance.get('admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
        setError('Kunde inte hämta användardata.');
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!user || !isAdmin) {
      window.location.href = '/LoginPage';
    }
  }, [user, isAdmin]);

  // Hämta användare, böcker och recensioner
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const usersResponse = await axiosInstance.get('admin/users');
        const booksResponse = await axiosInstance.get('admin/books');
        const reviewsResponse = await axiosInstance.get('admin/reviews');

        setUsers(usersResponse.data);
        setBooks(booksResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Fel vid hämtning av admin-data:', error);
      }
    };

    fetchData();
  }, []);

  // Lägg till en ny bok
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axiosInstance.post('admin/books', newBook);
      alert('Boken har lagts till!');
      setNewBook({ title: '', author: '', price: '', description: '' });
    } catch (error) {
      console.error('Fel vid tillägg av bok:', error);
    }
  };

  // Ta bort en bok
  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axiosInstance.delete(`admin/books/${bookId}`);
      alert('Boken har tagits bort!');
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Fel vid borttagning av bok:', error);
    }
  };

  // Ta bort en användare
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axiosInstance.delete(`admin/users/${userId}`);
      alert(response.data.message);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Fel vid borttagning av användare:', error.response.data);
      alert(`Kunde inte ta bort användaren: ${error.response.data.message}`);
    }
  };

  // Ta bort en recension
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axiosInstance.delete(`admin/reviews/${reviewId}`);
      alert('Recensionen har tagits bort!');
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Fel vid borttagning av recension:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-section">
        <h3>Lägg till Ny Bok</h3>
        <form onSubmit={handleAddBook}>
          <div className="admin-input-group">
            <label htmlFor="title">Titel</label>
            <input
              type="text"
              id="title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              required
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="author">Författare</label>
            <input
              type="text"
              id="author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="price">Pris</label>
            <input
              type="number"
              id="price"
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              required
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea
              id="description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            />
          </div>
          <button type="submit" className="admin-btn">Lägg till Bok</button>
        </form>
      </div>

      <div className="admin-section">
        <h3>Hantera Böcker</h3>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <p>{book.title} - {book.author}</p>
              <button onClick={() => handleDeleteBook(book._id)}>Ta bort bok</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h3>Hantera Användare</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>{user.name} ({user.email})</p>
              <button onClick={() => handleDeleteUser(user._id)}>Ta bort användare</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h3>Hantera Recensioner</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.comment} - Betyg: {review.rating}</p>
              <button onClick={() => handleDeleteReview(review._id)}>Ta bort recension</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={logout} className="admin-logout-btn">Logga ut</button>
    </div>
  );
};

export default Admin;
