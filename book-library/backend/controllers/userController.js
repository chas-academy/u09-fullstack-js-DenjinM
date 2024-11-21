

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Review = require('../models/Review');


// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body; 

//   // Kontrollera att alla fält är ifyllda
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Alla fält är obligatoriska' });
//   }

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "Användaren finns redan." });
//     }

//     // Hasha lösenordet innan du skapar användaren
//     const hashedPassword = await bcrypt.hash(password.trim(), 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
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


// // Inloggningsfunktion
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Inloggningsförsök med e-post:', email);
//   console.log('Inskickat lösenord:', password);

//   try {
//     // Kontrollera om användaren finns
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('Användaren hittades inte.');
//       return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
//     }

//     console.log('Användare hittad:', user);
//     console.log('Hashat lösenord i databasen:', user.password);

//     // Jämför lösenord
//     const isMatch = await bcrypt.compare(password, user.password); // Ta bort .trim() här om det inte behövs
//     console.log('Resultat av lösenordsjämförelse:', isMatch); // Kolla om bcrypt jämför lösenordet korrekt

//     if (isMatch) {
//       // Återställ antalet misslyckade inloggningsförsök om lösenordet matchar
//       user.failedLoginAttempts = 0;
//       await user.save();

//       // Generera JWT-token och logga det för att se om den skapas korrekt
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "30d",
//       });
//       console.log('Genererad token:', token);

//       // Skicka tillbaka användardata och token som svar
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token,
//       });
//     } else {
//       // Om lösenordet inte stämmer, öka antalet misslyckade inloggningsförsök
//       user.failedLoginAttempts += 1;
//       console.log('Misslyckade inloggningsförsök:', user.failedLoginAttempts);

//       // Lås kontot efter för många misslyckade försök
//       if (user.failedLoginAttempts >= 4) {
//         user.isLocked = true;
//         await user.save();
//         console.log("Kontot är nu låst.");
//         return res.status(403).json({ message: "Kontot är låst på grund av flera misslyckade inloggningsförsök." });
//       }

//       await user.save();
//       return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
//     }
//   } catch (error) {
//     console.error('Fel i loginUser:', error);
//     res.status(500).json({ message: error.message });
//   }
// };





// // Hämta användarens profil
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'Användare hittades inte.' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Fel vid hämtning av användarprofil:', error);
//     res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
//   }
// };

// // Uppdatera användarens profil
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'Användare hittades inte.' });
//     }

//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password; // Lösenordet kommer att hashas i pre('save') middleware
//     }

//     const updatedUser = await user.save();
//     res.json({ message: 'Profil uppdaterad', user: updatedUser });
//   } catch (error) {
//     console.error('Fel vid uppdatering av användarprofil:', error);
//     res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
//   }
// };


// // Hämta användarens recensioner
// const getUserReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ user: req.user._id }).populate('book', 'title');
//     if (reviews.length === 0) {
//       return res.status(404).json({ message: 'Inga recensioner hittades.' });
//     }
//     res.json(reviews);
//   } catch (error) {
//     console.error('Fel vid hämtning av recensioner:', error);
//     res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
//   }
// };

// // Lägg till bok i favoriter
// const addFavorite = async (req, res) => {
//   const { book } = req.body;

//   if (!book || !book.id || !book.title) {
//     return res.status(400).json({ message: 'Ogiltig bokdata.' });
//   }

//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'Användare hittades inte.' });
//     }

//     // Kontrollera att favorites är en array
//     if (!user.favorites) {
//       user.favorites = [];  // Om favorites inte är initialiserat, skapa en tom array
//     }

//     const bookExists = user.favorites.some(fav => fav.id === book.id);
//     if (bookExists) {
//       return res.status(400).json({ message: 'Boken är redan tillagd som favorit.' });
//     }

//     user.favorites.push(book);  // Lägg till bok i favoriter
//     await user.save();

//     res.status(201).json({ message: 'Boken har lagts till som favorit.', favorites: user.favorites });
//   } catch (error) {
//     console.error('Fel vid läggande av favorit:', error);
//     res.status(500).json({ message: 'Serverfel vid läggande av favorit.' });
//   }
// };

// // Hämta användarens favoriter
// const getFavorites = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: 'Användare hittades inte.' });
//     }

//     // Return favorites directly
//     res.status(200).json({ favorites: user.favorites });
//   } catch (error) {
//     console.error('Error fetching favorites:', error);
//     res.status(500).json({ message: 'Fel vid hämtning av favoriter' });
//   }
// };

// // Ta bort bok från favoriter
// const removeFavorite = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const bookId = req.params.bookId;  // Hämta bookId från URL-parametern

//     // Använd $pull för att ta bort boken med rätt ID från användarens favoriter
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $pull: { favorites: { id: bookId } } },  // Ta bort boken med rätt ID
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'Användare hittades inte.' });
//     }

//     res.status(200).json({ message: 'Bok borttagen från favoriter', favorites: user.favorites });
//   } catch (error) {
//     console.error('Fel vid borttagning av bok från favoriter:', error);
//     res.status(500).json({ message: 'Fel vid borttagning av bok från favoriter' });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     if (req.params.id === req.user._id.toString()) {
//       return res.status(400).json({ message: "Du kan inte ta bort dig själv" });
//     }
//     const user = await User.findById(req.params.id);

//     if (user) {
//       await user.deleteOne();
//       res.json({ message: "Användare borttagen" });
//     } else {
//       res.status(404).json({ message: "Användare hittades inte" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Kunde inte ta bort användare" });
//   }
// };


// module.exports = { 
//   registerUser, 
//   loginUser, 
//   deleteUser,
//   getUserProfile, 
//   updateUserProfile, 
//   getUserReviews,   
//   addFavorite,
//   getFavorites,
//   removeFavorite,  // Lägg till funktionen här
// };

//vi testar 


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Alla fält är obligatoriska.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Användaren finns redan.' });
    }

    // Hash lösenordet
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    console.log('Hashat lösenord:', hashedPassword);

    // Skapa användaren
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Fel vid registrering:', error);
    res.status(500).json({ message: 'Serverfel. Försök igen senare.' });
  }
};



// Inloggningsfunktion
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Felaktig e-post eller lösenord.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Fel vid inloggning:', error);
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

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Du kan inte ta bort dig själv" });
    }
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "Användare borttagen" });
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kunde inte ta bort användare" });
  }
};


module.exports = { 
  registerUser, 
  loginUser, 
  deleteUser,
  getUserProfile, 
  updateUserProfile, 
  getUserReviews,   
  addFavorite,
  getFavorites,
  removeFavorite,  // Lägg till funktionen här
};
