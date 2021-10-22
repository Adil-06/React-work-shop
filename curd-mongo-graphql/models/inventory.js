const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    item : {
        name : {
            type: String,
            require: true
        },
        code : {
            type : Number,
            require: true
        }
    },
    quantity:  {
      type : Number,
      require: true
    },
    tags:[String]
});

module.exports = mongoose.model('Inventory', inventorySchema);