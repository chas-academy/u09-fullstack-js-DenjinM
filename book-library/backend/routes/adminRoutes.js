const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Hämta alla användare
router.get('/users', protect, admin, adminController.getAllUsers);

// Radera en användare
router.delete('/users/:id', protect, admin, adminController.deleteUser);

// Lägg till en bok
router.post('/books', protect, admin, adminController.addBook);

// Radera en bok
router.delete('/books/:id', protect, admin, adminController.deleteBook);

// Hämta alla böcker
router.get('/books', protect, admin, adminController.getAllBooks);

// Hämta alla recensioner
router.get('/reviews', protect, admin, adminController.getAllReviews);

// Radera en recension
router.delete('/reviews/:id', protect, admin, adminController.deleteReview);

module.exports = router;
