const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  createdEvent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);