const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../helper/date');
const { transformEvent} = require('./merge');



module.exports = {
  events: async () => {
    const getEvents = await Event.find({});
    try {
      return getEvents.map((event) => {
        return transformEvent(event);
      })
    }
    catch (err) {
      console.log(err.message);
      throw err
    }
  },
  createEvent: async (args ,req) => {
    if(!req.isAuth) {
      throw new Error("Unauthenticated")
    }
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
}