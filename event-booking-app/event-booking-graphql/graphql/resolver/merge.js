const Event = require('../../models/event');
const User = require('../../models/user');
const {dateToString} = require('../helper/date');

const transformEvent = event => {
	return {
		...event._doc,
		_id: event.id,
		date: dateToString(event._doc.date),
		creator: getUserData.bind(this, event.creator)
	}
}

const getEventsData = async (eventIds) => {
	try {
		const fetchEvent = await Event.find({ _id: { $in: eventIds } });
		return fetchEvent.map((event) => {
			return transformEvent(event);
		});
	}
	catch (err) {
		console.log("error in fetch events", err);
		throw err;
	}

}
const singleEvent = async (eventID) => {
	try {
		const fetchSingleEvent = await Event.findById(eventID)
		return transformEvent(fetchSingleEvent)
	}
	catch (err) {
		console.log('error in single event', err);
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

exports.getUserData = getUserData;
exports.singleEvent = singleEvent;
exports.getEventsData = getEventsData;