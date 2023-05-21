import { Schema, model } from 'mongoose';
import { ContactMessageModel } from '../interfaces/ContactMessageModel';

const MessageSchema = new Schema<ContactMessageModel>({
	email: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

// module.exports = model('ContactMessage', MessageSchema);
// module.exports = model('Product', ProductSchema);
export const ContactMessage = model('ContactMessage', MessageSchema);
