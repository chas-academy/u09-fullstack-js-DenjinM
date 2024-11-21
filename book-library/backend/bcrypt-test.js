const bcrypt = require('bcryptjs');

// Kopiera lösenordshashen från databasen
const hashedPassword = '$2a$10$676KifjGPdDJoZ3IXPfRiu6LFgEBDWXgtM9z9x30kupEQxGi.V2QW';
const plainPassword = 'lejon'; // Ditt testlösenord

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
  if (err) {
    console.error('Fel vid lösenordsjämförelse:', err);
  } else {
    console.log('Lösenordsjämförelse resultat:', result); // true om lösenordet stämmer
  }
});
