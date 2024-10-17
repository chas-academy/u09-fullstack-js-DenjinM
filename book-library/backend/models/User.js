const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Lägger till roller: 'user' eller 'admin'
    default: 'user', // Default är 'user' om inget annat anges
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
