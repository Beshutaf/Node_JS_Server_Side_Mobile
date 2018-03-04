const mongoose = require('mongoose');
const commentsSchema = require('./comments');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String
	},
	Likes: {
		type: Number,
		required: true
	},
	comments: [commentsSchema],
	likedUsers: [String],
	Accepted: Boolean,
	status: String,
	AmountOfLikes: {
		type: Number,
		default: 0
	}
});

const Products = mongoose.model('products', productSchema);
module.exports = Products;