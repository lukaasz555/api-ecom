import { Schema, model, Types } from 'mongoose';
import { ProductModel } from '../interfaces/ProductModel';

const ProductSchema = new Schema<ProductModel>({
	id: {
		type: String,
		required: true,
		unique: true,
	},

	title: {
		type: String,
		required: true,
	},
	authors: {
		type: [String],
		required: true,
	},
	releaseYear: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	categoryID: {
		type: Number,
		required: true,
	},
	format: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	description: String,
	pages: Number,
	language: String,
	label: String,
	publisher: String,
});

module.exports = model('Product', ProductSchema);
