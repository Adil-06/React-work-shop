const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const bcrypt = require('bcryptjs');

let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getEventsData = async(eventIds) => {
  try {
    const fetchEvent = await Event.find({ _id: {$in : eventIds } });
    return fetchEvent.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator : getUserData.bind(this, event.creator)
      }
    });
  }
  catch(err) {
    console.log("error in fetch events", err);
    throw err;
  }
  
}
const singleEvent = async(eventID) =>{
  try{
    const fetchSingleEvent = await Event.findById(eventID)
    return {
      ...fetchSingleEvent._doc,
      _id : fetchSingleEvent.id,
      creator: getUserData.bind(this, fetchSingleEvent.creator)
    }
  }
  catch(err) {
    console.log('error in single event',err);
    throw err
  }
}

const getUserData = async (userID) => {
  try {
    const fetchedUser = await User.findById(userID)
    return {
      ...fetchedUser._doc,
      _id: fetchedUser.id,
      createdEvent: getEventsData.bind(this, fetchedUser._doc.createdEvent)
    }
  }
  catch (err) {
    console.log("error in fetched user", err)
    throw err
  }
}


module.exports = {
  events: async () => {
    const getEvents = await Event.find({});
    try {
      return getEvents.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: getUserData.bind(this, event._doc.creator)
        }
      })
    }
    catch (err) {
      console.log(err.message);
      throw err
    }
  },

  bookings: async () => {
    try {
      const fetchBookings = await Booking.find();
      return fetchBookings.map((booking) => {
        return {
          ...booking._doc,
          _id : booking.id,
          user: getUserData.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt : new Date(booking._doc.createdAt).toISOString(),
          updatedAt : new Date(booking._doc.updatedAt).toISOString()
        }
      });
    }
    catch(err) {
      console.log('error in fetching bookings', err);
      throw err;
    }
  },

  createEvent: async (args) => {
    try {
      const uEmail = args.eventInput.userEmail;
      const userByEmail = await User.findOne({ email: uEmail });
      const postEvent = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      postEvent.creator = userByEmail
      await postEvent.save();
      const userbyId = await User.findById({ _id: userByEmail._id });
      await userbyId.createdEvent.push(postEvent);
      await userbyId.save();

      return postEvent;
    }
    catch (err) {
      console.log(err.message);
      throw err
    }
  },

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
      console.log(err.message);
      const error = new Error(" error in creating User ");
      return error
    }
  },

  bookEvent: async (args) => {
    try {
      const eventTitle = args.eventTitle;
      const userEmail = args.userEmail;

      if (eventTitle !== '' & emailFormat.test(userEmail)) {
        const eventByTitle = await Event.findOne({ title: eventTitle });
        const userByEmail = await User.findOne({ email: userEmail });
        const booking = new Booking({
          event: eventByTitle,
          user: userByEmail
        });
        const result = await booking.save();
        return {
          ...result._doc,
          _id: result.id,
          user: getUserData.bind(this, result._doc.user),
          event: singleEvent.bind(this, result._doc.event),
          createdAt: new Date(result._doc.createdAt).toISOString(),
          updatedAt: new Date(result._doc.updatedAt).toISOString()
        }
      }

    }
    catch (err) {
      console.log('error in booking event');
      throw err
    }
  },

  cancelBooking : async (args) => {
    try {
      const removeBooking = await Booking.findById(args.bookingId).populate('event');
      const removedEvent = {
        ...removeBooking.event._doc,
        _id: removeBooking.event.id,
        creator: getUserData.bind(this, removeBooking.event._doc.creator)
      }
      await Booking.deleteOne({_id : args.bookingId});
      return removedEvent;
    }
    catch(err) {
      console.log('error in cancel booking', err);
      throw err
    }
  }

}