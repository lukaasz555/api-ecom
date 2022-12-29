const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
		type: Array,
		required: true,
	},

	releaseYear: {
		type: String,
		required: true,
	},

	description: {
		type: String,
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

	pages: {
		type: Number,
		required: false,
	},

	language: {
		type: String,
		required: false,
	},

	label: {
		type: String,
		required: false,
	},

	publisher: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('Product', ProductSchema);
