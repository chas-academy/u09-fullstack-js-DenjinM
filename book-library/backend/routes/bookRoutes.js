// routes/bookRoutes.js

const express = require('express');
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware'); // Importera dina befintliga middleware

// GET /api/books - Hämta alla böcker
router.get('/', getBooks);

// POST /api/books - Lägg till en ny bok (Endast admin)
router.post('/', protect, admin, addBook);

// DELETE /api/books/:id - Radera en bok (Endast admin)
router.delete('/:id', protect, admin, deleteBook);

module.exports = router;
