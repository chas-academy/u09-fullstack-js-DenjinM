const express = require('express');
const { searchBooks, getBooksByCategory } = require('../controllers/googleBooksController');
const router = express.Router();

// Rutt för att söka böcker
router.get('/search', searchBooks);

// Rutt för att hämta böcker via kategori
router.get('/category/:category', getBooksByCategory);

module.exports = router;
