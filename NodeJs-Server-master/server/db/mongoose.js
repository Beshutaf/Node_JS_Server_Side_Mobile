var mongoose = require('mongoose');
process.env.NODE_ENV
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
var MongoClient = require('mongodb').MongoClient;

//var uri = "mongodb://alaaZme:DSM@mycluster0-shard-00-00-wpeiv.mongodb.net:27017,mycluster0-shard-00-01-wpeiv.mongodb.net:27017,mycluster0-shard-00-02-wpeiv.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
//MongoClient.connect(uri, function(err, db) {
//  db.close();
//});
//mongoose.connect(uri, function(err, db) {});
//mongoose.connect("mongodb://localhost:27017/users");

module.exports = {
	mongoose
};