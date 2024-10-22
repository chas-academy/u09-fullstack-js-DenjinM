const axios = require('axios');

// Funktion för att söka böcker via Google Books API
const searchBooks = async (req, res) => {
  const query = req.query.q;  // Hämta sökfrågan från query params
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;  // Se till att nyckeln finns i din .env-fil

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    res.json(response.data.items);  // Skicka tillbaka resultaten
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching books from Google Books API' });
  }
};

// Funktion för att hämta böcker baserat på kategori
const getBooksByCategory = async (req, res) => {
  const category = req.params.category;  // Hämta kategorin från route params
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}`);
    res.json(response.data.items);  // Skicka tillbaka böckerna i kategorin
  } catch (error) {
    console.error('Error fetching books by category from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching books by category from Google Books API' });
  }
};

module.exports = {
  searchBooks,
  getBooksByCategory
};
