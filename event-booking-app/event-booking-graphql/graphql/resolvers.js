const Event = require('../models/event');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  events: async () => {
    const getEvents = await Event.find({});
    return getEvents;
  },
  createEvent: async (args) => {
    try {
      const postEvent = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      await postEvent.save();
      return postEvent;
    }
    catch (err) {
      console.log(err.message);
      throw err
    }
  },
  createUser: async(args) => {    
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
        const cryptedPassword = await bcrypt.hash(pswd, 5);
        const postUser = new User({
          name: name,
          email: email,
          password: cryptedPassword
        })
        await postUser.save();
        return postUser;
      }
    }
    catch(err) {
      console.log(err.message);
      const error = new Error("User data is not valid");
      return error
    }
  }

}