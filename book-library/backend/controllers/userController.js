const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrera ny användare
const registerUser = async (req, res) => {
  // Logga inkommande data för felsökning
  console.log(req.body);

  const { name, email, password, confirmPassword } = req.body;

  try {
    // Kontrollera om lösenorden matchar
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Lösenorden matchar inte.' });
    }

    // Kontrollera om användaren redan finns
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Användaren finns redan.' });
    }

    // Skapa en ny användare
    const hashedPassword = await bcrypt.hash(password, 10); // Hasha lösenordet
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Spara användaren i databasen
    await newUser.save();

    // Skapa en JWT-token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Skicka tillbaka JWT-token och användaruppgifter
    res.status(201).json({ message: 'Användare registrerad', token, user: newUser });

  } catch (error) {
    console.error('Registreringsfel:', error);
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

    // Uppdatera användarens information
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10); // Hasha lösenordet igen
    }

    const updatedUser = await user.save();
    res.json({ message: 'Profil uppdaterad', user: updatedUser });
  } catch (error) {
    console.error('Fel vid uppdatering av användarprofil:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};

module.exports = { registerUser, getUserProfile, updateUserProfile };
