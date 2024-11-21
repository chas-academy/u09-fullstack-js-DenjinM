const bcrypt = require('bcryptjs');

// Simulera lösenord som används vid registrering och inloggning
const plainPassword = 'elefant';

(async () => {
  try {
    // Skapa en hash av lösenordet
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashat lösenord:', hashedPassword);

    // Kontrollera om bcrypt jämför korrekt
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Jämförelseresultat:', isMatch); // Bör vara true
  } catch (err) {
    console.error('Fel vid hashning eller jämförelse:', err);
  }
})();
