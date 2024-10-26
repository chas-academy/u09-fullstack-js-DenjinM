// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const googleBooksRoutes = require('./routes/googleBooksRoutes'); // Google Books routes
const bookRoutes = require('./routes/bookRoutes'); // Your custom book routes

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with Mongoose
// Test
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/googlebooks', googleBooksRoutes); // Google Books API routes
app.use('/api/books', bookRoutes); // Your own book routes

// Catch all route for undefined routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
