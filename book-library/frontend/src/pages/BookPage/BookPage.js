import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Använd axios för att anropa din backend

const BookPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState({
    drama: [],
    scifi: [],
    thriller: []
  });

  // Hämta böcker baserat på kategorier
  useEffect(() => {
    const fetchBooksByCategory = async (category) => {
      try {
        const response = await axios.get(`/api/googlebooks/category/${category}`);
        setCategories(prevState => ({ ...prevState, [category]: response.data }));
      } catch (error) {
        console.error(`Error fetching books by category ${category}:`, error);
      }
    };

    // Hämta böcker för varje kategori
    fetchBooksByCategory('drama');
    fetchBooksByCategory('scifi');
    fetchBooksByCategory('thriller');
  }, []); // Tom array för att köra detta endast vid komponentens inladdning

  // Sök efter böcker
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`/api/googlebooks/search?q=${searchQuery}`);
        console.log('Search results:', response.data); 
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching books:', error);
      }
    }
  };

  return (
    <div className="book-page">
      <h1>Book Page</h1>

      {/* Sökfunktion */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Sök efter en bok eller författare..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Sök</button>
      </div>

      {/* Visa sökresultat om det finns */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Sökresultat:</h2>
          <div className="book-grid">
            {searchResults.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                />
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kategorier */}
      <div className="category-section">
        <h2>Drama</h2>
        <div className="book-grid">
          {categories.drama.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
            </div>
          ))}
        </div>

        <h2>Sci-Fi</h2>
        <div className="book-grid">
          {categories.scifi.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
            </div>
          ))}
        </div>

        <h2>Thriller</h2>
        <div className="book-grid">
          {categories.thriller.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
