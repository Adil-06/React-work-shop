const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type: String,
        max: 1024
    },
    date : {
        type :  Date,
        default : Date.now
    },
    token : {
        type: String
    }
  
    
});

module.exports = mongoose.model('User', userSchema);