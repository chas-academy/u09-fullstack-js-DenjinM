const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');

// Hämta alla användare
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
    res.status(500).json({ message: 'Serverfel vid hämtning av användare.' });
  }
};

// Lägg till en ny bok
exports.addBook = async (req, res) => {
  const { title, author, description, price, stock } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      description,
      price,
      stock,
    });

    await newBook.save();
    res.status(201).json({ message: 'Bok tillagd', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel när boken skulle läggas till', error: error.message });
  }
};

// Radera en bok
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Bok inte hittad' });
    }

    res.status(200).json({ message: 'Bok borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};

// Radera en användare
exports.deleteUser = async (req, res) => {
  try {
    // Förhindra att administratören tar bort sig själv
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'Du kan inte ta bort ditt eget konto.' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Användare inte hittad' });
    }

    // Använd korrekt Mongoose-metod för att ta bort användaren
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Användare borttagen' });
  } catch (error) {
    console.error('Fel vid borttagning av användare:', error);
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};


// Radera en recension
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Recension inte hittad' });
    }

    res.status(200).json({ message: 'Recension borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};

// Lägg till dessa funktioner om de inte redan finns
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel vid hämtning av böcker', error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('book', 'title');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel vid hämtning av recensioner', error: error.message });
  }
};
