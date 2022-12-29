const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
		},

		customer: {
			customerData: {
				name: {
					type: String,
					required: true,
				},
				lastname: {
					type: String,
					required: true,
				},
				nip: {
					type: String,
				},
				companyName: {
					type: String,
				},
			},

			contact: {
				email: {
					type: String,
					required: true,
				},
				phoneNumber: {
					type: String,
					required: true,
				},
			},

			address: {
				address1: {
					type: String,
					required: true,
				},
				address2: {
					type: String,
					required: false,
				},
				postalCode: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				country: {
					type: String,
					required: true,
				},
			},
		},

		order: {
			items: {
				type: Array,
				required: true,
			},
			qty: {
				type: Number,
				required: true,
			},
			value: {
				type: Number,
				required: true,
			},
			ship: {
				inpost: {
					type: String,
					required: true,
				},
				cost: {
					type: Number,
					required: true,
				},
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
