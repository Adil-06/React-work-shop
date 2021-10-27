const User = require('../../models/user');
const bcrypt = require('bcryptjs');

let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  createUser: async (args) => {
    try {
      const pswd = args.userInput.password;
      const email = args.userInput.email;
      const name = args.userInput.name;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        const error = new Error("User already exist");
        return error
      }
      else {
        if (emailFormat.test(email) & pswd.length > 4 & name.length > 3) {
          const cryptedPassword = await bcrypt.hash(pswd, 5);
          const postUser = new User({
            name: name,
            email: email,
            password: cryptedPassword
          })
          await postUser.save();
          return postUser;
        }
        else {
          const error = new Error("User data is not valid");
          return error
        }
      }
    }
    catch (err) {
      console.log(" error in creating User ", err.message);
      throw err
    }
  }
}