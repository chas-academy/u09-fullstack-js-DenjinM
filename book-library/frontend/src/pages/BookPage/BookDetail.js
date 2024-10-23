import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Lägg till useNavigate här
import './BookDetail.css'; // Importera din CSS-fil

const BookDetail = () => {
  const { id } = useParams(); // Få id från URL:en
  const [book, setBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetail();
  }, [id]);

  const cleanDescription = (description) => {
    if (!description) return 'No description available';
    // Ta bort alla HTML-taggar med hjälp av en reguljär uttryck
    return description.replace(/<\/?[^>]+(>|$)/g, "");
  };
  

  // Funktion för att lägga till bok i favoriter
  const handleAddToFavorites = async (book) => {
    const token = localStorage.getItem('token');

    const bookId = book.id || (book.volumeInfo.industryIdentifiers?.[0]?.identifier || book.volumeInfo.title);

    if (!bookId) {
      setMessage('Ogiltig bokdata, kunde inte hitta ett giltigt ID.');
      return;
    }

    try {
      const favoriteBook = {
        id: bookId,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', '),
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      };

      await axios.post('http://localhost:5001/api/users/favorites', { book: favoriteBook }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites([...favorites, book]);
      setMessage('Bok tillagd som favorit!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      setMessage(`Kunde inte lägga till boken som favorit: ${error.response?.data?.message || 'Serverfel'}`);
    }
  };

  return (
    <div className="book-detail-container">
      {book ? (
        <div className="book-detail-box">
          <h1 className="book-title">{book.volumeInfo.title}</h1>
          <img
            className="book-thumbnail"
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
          />
          <p className="book-author"><strong>Author:</strong> {book.volumeInfo.authors?.join(', ')}</p>
          <p className="book-description">
            <strong>Description:</strong> {cleanDescription(book.volumeInfo.description)}
          </p>
          {/* Lägg till i favoriter */}
          <button className="favorite-btn" onClick={() => handleAddToFavorites(book)}>
            Add to Favorites
          </button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetail;
