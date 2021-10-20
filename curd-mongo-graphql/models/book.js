const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    year: {
        type: Number
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    }, 
    pubName : {
        type : String
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)