const mongoose = require('mongoose');

const commentsSchema = require('./comments');

const Schema = mongoose.Schema;

const pendingProductSchema = new Schema({
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
	}
});

const pendingProduct = mongoose.model('pendingProduct', pendingProductSchema);
module.exports = pendingProduct;