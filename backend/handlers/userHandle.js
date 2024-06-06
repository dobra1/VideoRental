const User = require('../db/user');
const bcrypt = require('bcrypt');

async function addUser(userModel) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userModel.password, saltRounds);
  
  let user = new User ({
      ...userModel,
      password: hashedPassword
  });

  await user.save();
  return user.toObject();
}

async function getUsers() {
  const users = await User.find();
  return users.map(x => x.toObject());

}
async function getUser(id) {
  const user = await User.findById(id);
  return user.toObject();

}
async function loginUser(userModel) {
  try {
      const user = await User.findOne({ email: userModel.email });
      if (!user) {
          console.log('Nem található felhasználó az e-mail cím alapján:', userModel.email);
          return { message: 'Érvénytelen felhasználói adatok', success: false };
      }
      const passwordMatch = await bcrypt.compare(userModel.password, user.password);
      if (passwordMatch) {
          return { message: 'Sikeres bejelentkezés!', success: true };
      } else {
          console.log('A jelszó nem egyezik a felhasználónak:', userModel.email);
          return { message: 'Érvénytelen e-mail vagy jelszó.', success: false };
      }
  } catch (error) {
      console.error('Hiba a felhasználó bejelentkezése során:', error);
      return { message: 'Belső szerver hiba', success: false };
  }
}




module.exports = {addUser, getUsers, getUser, loginUser };