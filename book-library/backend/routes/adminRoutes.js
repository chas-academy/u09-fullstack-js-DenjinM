const express = require('express');
const router = express.Router();
const { addBook, deleteBook, deleteUser, deleteReview } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware'); // Importera middleware

// Använd `protect` för att skydda alla rutter och `admin` för att begränsa till admin
router.use(protect); // Skyddar alla rutter med inloggning
router.use(admin);   // Begränsar till admin-användare

// Lägg till en ny bok
router.post('/books', addBook);

// Radera en bok
router.delete('/books/:id', deleteBook);

// Radera en användare
router.delete('/users/:id', deleteUser);

// Radera en recension
router.delete('/reviews/:id', deleteReview);

module.exports = router;
