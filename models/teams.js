var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	name: String,
	imagePath: String,
	totalVotes: Number,
	wins: Number
});

module.exports = mongoose.model('teams', teamSchema)