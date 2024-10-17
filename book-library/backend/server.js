const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

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

app.get('/booktest', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=AIzaSyACIzTTImaFlhxZNHDGyqgkdCLjHpKcT_c');  // Byt ut YOUR_API_KEY med din riktiga API-nyckel
    
    // Skicka JSON-svaret tillbaka till klienten (Insomnia eller webbläsare)
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    
    // Skicka ett felmeddelande om något går fel
    res.status(500).send('Error fetching data from Google Books API');
  }
})

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
