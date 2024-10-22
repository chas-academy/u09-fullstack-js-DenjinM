const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  registerUser, 
  getUserReviews, 
  addFavorite,
  getFavorites 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Lägg till och hämta favoriter
router.post('/favorites', protect, addFavorite);
router.get('/favorites', protect, getFavorites);

// Inloggningsrutter
router.post('/login', loginUser);

// Registrera användare
router.post('/register', registerUser);

// Hämta användarens profil (endast för inloggade användare)
router.get('/profile', protect, getUserProfile);

// Uppdatera användarens profil (endast för inloggade användare)
router.put('/profile', protect, updateUserProfile);

// Hämta användarens recensioner (endast för inloggade användare)
router.get('/reviews', protect, getUserReviews);

module.exports = router;
