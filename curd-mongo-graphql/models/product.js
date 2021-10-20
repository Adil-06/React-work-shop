const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type : String,
        require : true
    },
    price: {
        type: Number,
        require : true
    },
    description: {
      type: String,
      require: true
    },
    customer : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    }
    ,
    date : {
      type : Date
    }
});

module.exports = mongoose.model('Product', productSchema);