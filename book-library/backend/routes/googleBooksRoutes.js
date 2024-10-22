const express = require('express');
const { searchBooks, getBooksByCategory } = require('../controllers/googleBooksController');
const router = express.Router();

// Sök efter böcker med Google Books API
router.get('/search', searchBooks);

// Hämta böcker baserat på kategori
router.get('/category/:category', getBooksByCategory);

module.exports = router;
