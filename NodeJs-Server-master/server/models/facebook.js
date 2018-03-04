const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facebookModel = new Schema({
	name: String,
	message: String,
	imageUrl: String
});

const Facebook = mongoose.model('facebook', facebookModel);
module.exports = Facebook;