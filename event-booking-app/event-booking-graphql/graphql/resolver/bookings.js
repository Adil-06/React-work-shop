const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const { dateToString } = require('../helper/date');
const { getUserData, singleEvent } = require('./merge')

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: getUserData.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: getUserData.bind(this, event.creator)
  }
}
module.exports = {
  bookings: async () => {
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
        return transformBooking(result);
      }
    }
    catch (err) {
      console.log('error in booking event');
      throw err
    }
  },

  cancelBooking: async (args) => {
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
