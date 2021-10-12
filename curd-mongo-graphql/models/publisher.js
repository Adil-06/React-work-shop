const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const publisherSchema = mongoose.Schema({
    name: {
        type: String
    },
    year : { type : Number},
    location: {
        type: String
    },
    publishedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]


}, { timestamps: true });

module.exports = mongoose.model('Publisher', publisherSchema);