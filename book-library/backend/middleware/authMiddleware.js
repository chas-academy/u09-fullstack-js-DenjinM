const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware för att autentisera användaren
const protect = async (req, res, next) => {
  let token;

  // Hämta token från Authorization-headern
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extrahera token från "Bearer <token>"

      // Verifiera token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Hämta användarinfo från token och spara den i req.user
      req.user = await User.findById(decoded.id).select('-password'); // Uteslut lösenordet

      next(); // Fortsätt till nästa middleware
    } catch (error) {
      console.error('Något gick fel med token-verifieringen:', error);
      res.status(401).json({ message: 'Åtkomst nekad. Token är ogiltig eller saknas.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Åtkomst nekad. Ingen token tillhandahållen.' });
  }
};

// Middleware för att kontrollera om användaren är admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    // Om användaren är admin, fortsätt
    next();
  } else {
    res.status(403).json({ message: 'Åtkomst nekad. Du har inte administratörsbehörighet.' });
  }
};

module.exports = { protect, admin };
