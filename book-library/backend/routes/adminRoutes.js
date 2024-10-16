const express = require('express');
const router = express.Router();
const { addBook, deleteBook, deleteUser, deleteReview } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Lägg till en ny bok (endast admin)
router.post('/books', authMiddleware(true), addBook);

// Radera en bok (endast admin)
router.delete('/books/:id', authMiddleware(true), deleteBook);

// Radera en användare (endast admin)
router.delete('/users/:id', authMiddleware(true), deleteUser);

// Radera en recension (endast admin)
router.delete('/reviews/:id', authMiddleware(true), deleteReview);

module.exports = router;
