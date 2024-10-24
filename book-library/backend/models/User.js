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
    enum: ['user', 'admin'],
    default: 'user',
  },
  favorites: [
    {
      type: Object,  // För att lagra bokinformationen
    }
  ],
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Metod för att hasha lösenord innan sparning
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    console.log('Lösenordet har inte ändrats, hoppar över hashning.');
    return next();
  }
  console.log('Lösenord före hashning:', this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Lösenord efter hashning:', this.password);
  next();
});


module.exports = mongoose.model('User', userSchema);
