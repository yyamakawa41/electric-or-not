

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
	name: String,
	src: String,
	totalVotes: Number
});

module.exports = mongoose.model('teams', photoSchema)