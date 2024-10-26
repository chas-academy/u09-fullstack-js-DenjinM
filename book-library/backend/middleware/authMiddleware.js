// middleware/AuthMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware för autentisering
const protect = async (req, res, next) => {
  let token;

  // Kontrollera om Authorization-headern finns och börjar med 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrahera tokenet
      token = req.headers.authorization.split(' ')[1];
      
      // Verifiera tokenet
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Hämta användaren från databasen utan att inkludera lösenordet
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error('Fel vid tokenverifiering:', error);
      res.status(401).json({ message: 'Åtkomst nekad. Token är ogiltig.' });
    }
  } else {
    res.status(401).json({ message: 'Åtkomst nekad. Ingen token tillhandahållen.' });
  }
};

// Middleware för att kontrollera admin-åtkomst
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Åtkomst nekad. Du har inte administratörsbehörighet.' });
  }
};

module.exports = { protect, admin };
