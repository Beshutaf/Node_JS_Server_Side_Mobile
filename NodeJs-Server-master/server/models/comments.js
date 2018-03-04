const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	}
})

module.exports = commentsSchema;