const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
	customerName: {
		type: String,
		required: true,
	},
	customerEmail: {
		type: String,
		required: true,
	},
	newsletterConsent: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Customer', CustomerSchema);
