const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');

// Lägg till en ny bok
exports.addBook = async (req, res) => {
  // Din kod för att lägga till en bok
};

// Radera en bok
exports.deleteBook = async (req, res) => {
  // Din kod för att radera en bok
};

// Radera en användare
exports.deleteUser = async (req, res) => {
  // Din kod för att radera en användare
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
