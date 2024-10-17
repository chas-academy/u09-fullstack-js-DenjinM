const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  registerUser, 
  getUserReviews,  
  getUserFavorites 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Importera korrekt middleware

// Inloggningsroute
router.post('/login', loginUser);

// Registrera ny användare
router.post('/register', registerUser);

// Hämta användarprofil (endast inloggade användare)
router.get('/profile', protect, getUserProfile);  // Skydda med `protect`

// Uppdatera användarprofil (endast inloggade användare)
router.put('/profile', protect, updateUserProfile);  // Skydda med `protect`

// Hämta användarens recensioner (endast inloggade användare)
router.get('/reviews', protect, getUserReviews);  // Ny route för att hämta användarens recensioner, skyddad

// Hämta användarens favoritböcker (endast inloggade användare)
router.get('/favorites', protect, getUserFavorites);  // Ny route för att hämta användarens favoritböcker, skyddad

module.exports = router;
