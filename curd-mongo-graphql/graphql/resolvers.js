const UserSignUp = require('../models/SignupModel')
const bcrypt = require('bcryptjs');

module.exports = {
  hello() {
    return {
      text: 'Hello Graphql',
      view: 12345
    }
  },
  getUsers: async (args) => {
    const allUsers = await UserSignUp.find({});
    // console.log("getting all users")
    return allUsers;
  },
  user: async (args, req, res) => {
    const id = args.id
    const singleUser = await UserSignUp.findById(id);
    // console.log('getting single User');

    return singleUser;
  },
  createUser: async (args, req, res) => {
    const name = args.name;
    const email = args.email;
    const password = args.password
    const cryptedPassword = await bcrypt.hash(password, 5);
    const postNewUser = new UserSignUp({
      name,
      email,
      password: cryptedPassword
    });
    const newlyCreatedUser = await postNewUser.save();
    //console.log('user created')     
    return newlyCreatedUser;
  },
  updateUser: async (args, req, res) => {
    const id = args.id;
    const name = args.name;
    const email = args.email;
    const updatedUser = await UserSignUp.findByIdAndUpdate({ _id: id },
      { $set: { name: name, email: email } },
      { new: true });
    await updatedUser.save();
    return updatedUser;
  },
  deleteUser : async (args) => {
    const id = args.id;
    const userToDelete = await UserSignUp.findById(id);
    if(id.match(userToDelete._id)) {
      const removedUser = await userToDelete.remove();
     return removedUser;
    } 
    const error = new Error("User not found");
    throw error
  }

}