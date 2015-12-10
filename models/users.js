var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: String,
	src: String,
	totalVotes: Number
});

module.exports = mongoose.model('users', usersSchema)