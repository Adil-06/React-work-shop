const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    email: {
        type : String,
        require : true
    },
    productIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }],
    date: {
        type : Date
    }
});

module.exports = mongoose.model('Customer', customerSchema);
