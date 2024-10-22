const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const googleBooksRoutes = require('./routes/googleBooksRoutes'); // Lägg till Google Books routes
const bookRoutes = require('./routes/bookRoutes'); // Dina egna bok-routes

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB-anslutning med Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Använd userRoutes för alla förfrågningar relaterade till användare
app.use('/api/users', userRoutes);

// Använd adminRoutes för alla förfrågningar relaterade till administratörsfunktioner
app.use('/api/admin', adminRoutes);

app.use('/api/googlebooks', googleBooksRoutes); // Google Books API routes
app.use('/api/books', bookRoutes); // Dina egna böcker i databasen

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
