const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');

// Registrera ny användare
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log('Registrering med lösenord:', password);

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "Användaren finns redan." });
//     }

//     // Skapa användare utan att hasha lösenordet här
//     const user = await User.create({
//       name,
//       email,
//       password: password.trim(),
//     });
    

//     console.log('Användare skapad:', user);

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log('Registrering med lösenord:', password);

  // Kontrollera att alla fält är ifyllda
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Alla fält är obligatoriska' });
  }

  // Kontrollera att lösenorden matchar
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Lösenorden matchar inte' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Användaren finns redan." });
    }

    // Hasha lösenordet innan du skapar användaren
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('Användare skapad:', user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inloggningsfunktion
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Inloggningsförsök med e-post:', email);
  console.log('Inskickat lösenord:', password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Användaren hittades inte.');
      return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
    }

    console.log('Användare hittad:', user);
    console.log('Hashat lösenord i databasen:', user.password);

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    console.log('Lösenord matchar:', isMatch);
    
    if (isMatch) {
      user.failedLoginAttempts = 0;
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      user.failedLoginAttempts += 1;
      console.log('Misslyckade inloggningsförsök:', user.failedLoginAttempts);
      if (user.failedLoginAttempts >= 4) {
        user.isLocked = true;
        await user.save();
        return res.status(403).json({ message: "Kontot är låst på grund av flera misslyckade inloggningsförsök." });
      }

      await user.save();
      return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
    }
  } catch (error) {
    console.error('Fel i loginUser:', error);
    res.status(500).json({ message: error.message });
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
      user.password = req.body.password; // Lösenordet kommer att hashas i pre('save') middleware
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

// Ta bort bok från favoriter
const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;  // Hämta bookId från URL-parametern

    // Använd $pull för att ta bort boken med rätt ID från användarens favoriter
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: { id: bookId } } },  // Ta bort boken med rätt ID
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Användare hittades inte.' });
    }

    res.status(200).json({ message: 'Bok borttagen från favoriter', favorites: user.favorites });
  } catch (error) {
    console.error('Fel vid borttagning av bok från favoriter:', error);
    res.status(500).json({ message: 'Fel vid borttagning av bok från favoriter' });
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
  removeFavorite,  // Lägg till funktionen här
};
