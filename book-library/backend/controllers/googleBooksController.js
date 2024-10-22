const axios = require('axios');

// Search for books via Google Books API
const searchBooks = async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    
    if (response.data.items && response.data.items.length > 0) {
      res.json(response.data.items);
    } else {
      res.status(404).json({ message: 'No books found for the query' });
    }
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching books from Google Books API' });
  }
};

// Get books by category
const getBooksByCategory = async (req, res) => {
  const category = req.params.category;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}`);
    
    if (response.data.items && response.data.items.length > 0) {
      res.json(response.data.items);
    } else {
      res.status(404).json({ message: `No books found for category ${category}` });
    }
  } catch (error) {
    console.error('Error fetching books by category from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching books by category from Google Books API' });
  }
};

module.exports = {
  searchBooks,
  getBooksByCategory
};
