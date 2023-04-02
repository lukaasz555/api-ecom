import { Schema, model, Types } from 'mongoose';
import { CustomerModel } from '../interfaces/CustomerModel';

const CustomerSchema = new Schema<CustomerModel>({
	customerEmail: {
		type: String,
		required: true,
	},
	customerName: {
		type: String,
		required: true,
	},
	newsletterConsent: {
		type: Boolean,
		required: true,
	},
	orders: Array,
});

module.exports = model('Customer', CustomerSchema);
