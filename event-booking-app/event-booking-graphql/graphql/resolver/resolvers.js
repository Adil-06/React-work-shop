const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

let emailFormat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  events: async () => {
    const getEvents = await Event.find({}).populate('creator');
    try {
      return getEvents.map((event) => {
        return {
          ...event._doc,
          _id : event.id,
          date: new Date(event._doc.date).toISOString()
        }
      })
    }
    catch(err) {
      console.log(err.message);
      throw err
    }
  },
  createEvent: async (args) => {
    try {
      const uEmail = args.eventInput.userEmail;
      const userByEmail = await User.findOne({email : uEmail});
      const postEvent = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      postEvent.creator = userByEmail._id
      await postEvent.save();
      const userbyId = await User.findById({_id: userByEmail._id});
      await userbyId.createdEvent.push(postEvent);
      await userbyId.save();

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
    catch(err) {
      console.log(err.message);
      const error = new Error(" error in creating User ");
      return error
    }
  }

}