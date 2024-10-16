const Book = require('../models/Book');

const getBooks = async (req, res) => {
  // Logik för att hämta alla böcker
};

const addBook = async (req, res) => {
  // Logik för att lägga till en bok (admin)
};

const deleteBook = async (req, res) => {
  // Logik för att ta bort en bok (admin)
};

module.exports = { getBooks, addBook, deleteBook };
