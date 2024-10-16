const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Betyg från 1 till 5
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Skapar "createdAt" och "updatedAt" fält automatiskt
});

module.exports = mongoose.model('Review', reviewSchema);
