const express = require('express');
const router = express.Router();
const { loginUser, getUserProfile, updateUserProfile, registerUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Inloggningsroute
router.post('/login', loginUser);

// Registrera ny användare
router.post('/register', registerUser);

// Hämta användarprofil (endast inloggade användare)
router.get('/profile', protect, getUserProfile);  // Använd `protect` för autentisering

// Uppdatera användarprofil (endast inloggade användare)
router.put('/profile', protect, updateUserProfile); 

module.exports = router;
