const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Uppdatera med rätt sökväg

const updatePassword = async () => {
  const email = 'tiger@tiger.tiger'; // Användarens e-post
  const newPassword = 'tiger'; // Nytt lösenord

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    console.log('Lösenord uppdaterat:', user);
  } catch (error) {
    console.error('Fel vid uppdatering av lösenord:', error);
  }
};

updatePassword();
