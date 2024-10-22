const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');

// Registrera ny användare
const registerUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Lösenorden matchar inte.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Användaren finns redan.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({ message: 'Användare registrerad', token, user: newUser });
  } catch (error) {
    console.error('Registreringsfel:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

// Inloggningsfunktion
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Felaktig e-post eller lösenord.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Felaktig e-post eller lösenord.' });
    }

    // Skapa JWT-token med användarens roll inkluderad i nyttolasten
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Inkludera roll i token
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Skicka tillbaka token och användarinfo till frontend
    res.json({ token, user });
  } catch (error) {
    console.error('Inloggningsfel:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

// Hämta användarens profil
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Fel vid hämtning av användarprofil:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

// Uppdatera användarens profil
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte.' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10); // Hasha lösenordet
    }

    const updatedUser = await user.save();
    res.json({ message: 'Profil uppdaterad', user: updatedUser });
  } catch (error) {
    console.error('Fel vid uppdatering av användarprofil:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

// Hämta användarens recensioner
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).populate('book', 'title');
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'Inga recensioner hittades.' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Fel vid hämtning av recensioner:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

// Lägg till bok i favoriter
// Hämta användarens favoritböcker
const addFavorite = async (req, res) => {
  const { book } = req.body;

  if (!book || !book.id || !book.title) {
    return res.status(400).json({ message: 'Ogiltig bokdata.' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte.' });
    }

    // Kontrollera att favorites är en array
    if (!user.favorites) {
      user.favorites = [];  // Om favorites inte är initialiserat, skapa en tom array
    }

    const bookExists = user.favorites.some(fav => fav.id === book.id);
    if (bookExists) {
      return res.status(400).json({ message: 'Boken är redan tillagd som favorit.' });
    }

    user.favorites.push(book);  // Lägg till bok i favoriter
    await user.save();

    res.status(201).json({ message: 'Boken har lagts till som favorit.', favorites: user.favorites });
  } catch (error) {
    console.error('Fel vid läggande av favorit:', error);
    res.status(500).json({ message: 'Serverfel vid läggande av favorit.' });
  }
};


// Hämta användarens favoriter
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte.' });
    }

    // Return favorites directly
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Fel vid hämtning av favoriter' });
  }
};



module.exports = { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUserReviews,   
  addFavorite,
  getFavorites,
};
