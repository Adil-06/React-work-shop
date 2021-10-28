const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const { dateToString } = require('../helper/date');
const { transformBooking, transformEvent} = require('./merge')


module.exports = {
  bookings: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('UnAuthenticated');
    }
    try {
      const fetchBookings = await Booking.find();
      return fetchBookings.map((booking) => {
        return transformBooking(booking);
      });
    }
    catch (err) {
      console.log('error in fetching bookings', err);
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if(!req.isAuth) {
      throw new Error("Unauthenticated");
    }
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
        return transformBooking(result);
      }
    }
    catch (err) {
      console.log('error in booking event');
      throw err
    }
  },

  cancelBooking: async (args, req) => {
    if(!req.isAuth) {
      throw new Error("Unauthenticated")
    }
    try {
      const removeBooking = await Booking.findById(args.bookingId).populate('event');
      const removedEvent = transformEvent(removeBooking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return removedEvent;
    }
    catch (err) {
      console.log('error in cancel booking', err);
      throw err
    }
  }

}
