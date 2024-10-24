const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Hämta alla användare från databasen
    res.json(users); // Returnera användardata som JSON
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
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Bok inte hittad' });
    }

    await book.remove();
    res.status(200).json({ message: 'Bok borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};

// Radera en användare
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Användare inte hittad' });
    }

    await user.remove();
    res.status(200).json({ message: 'Användare borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};

// Radera en recension
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Recension inte hittad' });
    }

    await review.remove();
    res.status(200).json({ message: 'Recension borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error: error.message });
  }
};
