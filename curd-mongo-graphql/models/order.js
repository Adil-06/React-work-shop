const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	customerName: {
		type: String,
		require: true
	},
	productName: {
		type: String,
		require: true
	},
	productPrice: {
		type: Number,
		require: true
	},
	status: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);