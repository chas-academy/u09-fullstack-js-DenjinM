import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);

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

  return (
    <div>
      {book ? (
        <div className="book-detail">
          <h1>{book.volumeInfo.title}</h1>
          <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
          <p>Description: {book.volumeInfo.description}</p>
          {/* Add to favorites functionality */}
          <button>Add to Favorites</button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetail;
