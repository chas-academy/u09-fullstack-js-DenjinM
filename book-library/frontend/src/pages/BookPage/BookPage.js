import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./BookPage.css"
import axiosInstance from '../../api/axiosInstance'; // Justera sökvägen om nödvändigt
const BookPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState({
    drama: [],
    scifi: [],
    thriller: []
  });
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState(null); // Feedback-meddelande

  const navigate = useNavigate();

  // Hämta böcker baserat på kategori
  useEffect(() => {
    const fetchBooksByCategory = async (category) => {
      try {
        const response = await axiosInstance.get(`/googlebooks/category/${category}`);

        setCategories(prevState => ({ ...prevState, [category]: response.data }));
      } catch (error) {
        console.error(`Error fetching books by category ${category}:`, error);
      }
    };

    fetchBooksByCategory('drama');
    fetchBooksByCategory('scifi');
    fetchBooksByCategory('thriller');
  }, []);

  // Hantera sökning
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axiosInstance.get(`/googlebooks/search?q=${searchQuery}`);

        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching books:', error);
      }
    }
  };

  // Lägg till bok i favoriter
  const handleAddToFavorites = async (book) => {
    const token = localStorage.getItem('token');

    // Hantera olika sätt att identifiera boken (använd id eller ISBN)
    const bookId = book.id || (book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : null);

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
    
      await axiosInstance.post('users/favorites', { book: favoriteBook }, {
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

  // Hantera "Läs mer"
  const handleReadMore = (book) => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-page">

      {/* Sökning */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a book or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Visa meddelande */}
      {message && <div className="message-box">{message}</div>}

      {/* Visa sökresultat */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <div className="bookpage-grid">
            {searchResults.map((book) => (
              <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} className="book-card">
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
                <button onClick={() => handleReadMore(book)}>Read More</button>
                <span onClick={() => handleAddToFavorites(book)}>⭐</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visa kategorier */}
      <div className="category-section">
        <h2>Drama</h2>
        <div className="bookpage-grid">
          {categories.drama.map((book) => (
            <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => handleReadMore(book)}>Read More</button>
              <span onClick={() => handleAddToFavorites(book)}>⭐</span>
            </div>
          ))}
        </div>

        <h2>Sci-Fi</h2>
        <div className="bookpage-grid">
          {categories.scifi.map((book) => (
            <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => handleReadMore(book)}>Read More</button>
              <span onClick={() => handleAddToFavorites(book)}>⭐</span>
            </div>
          ))}
        </div>

        <h2>Thriller</h2>
        <div className="bookpage-grid">
          {categories.thriller.map((book) => (
            <div key={book.id || book.volumeInfo.industryIdentifiers?.[0]?.identifier} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => handleReadMore(book)}>Read More</button>
              <span onClick={() => handleAddToFavorites(book)}>⭐</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
