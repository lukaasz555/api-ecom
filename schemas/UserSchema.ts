import { Schema, model, Types } from 'mongoose';
import { User } from '../models/User';
import { DbOrderModel } from '../interfaces/OrderModel';
const Order = require('../schemas/Order');

const UserSchema = new Schema<User>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		orders: Array,
	},
	{ timestamps: true }
);

module.exports = model('UserSchema', UserSchema);
