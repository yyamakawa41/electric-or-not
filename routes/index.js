var express = require('express');
var router = express.Router();
var MongoClient = require ('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/hockeyTeam";
var db;
var mongoose = require('mongoose');
var Team = require('../models/teams')
db = mongoose.createConnection(mongoUrl)


/* GET home page. */
router.get('/', function(req, res, next) {

		Team.find(function(error, result){
			console.log(result);
			res.render('index', { photos: result });
		})




	// indes page should load random picture/item
	// 1. Get all pictures from the MongoDB
	// 2. Get the current user from MongoDB via req.ip
	// 3. Find which photos the current user has NOT voted on
	// 4. Load all those photos into an array.
	// 5. Choose a random image from the array and set it to a var
	// 6. res.render the index view and send it the photo
	// {name: 'http://chadconway.pbworks.com/f/1253765817/news-electriccar1.jpg'},
	// {name: 'https://c2.staticflickr.com/2/1307/4700132636_cd67861c4b_b.jpg'}	

	var serverPhotos =  [

	];
  
});

router.post('notUsed', function(req,res,next){
	
	
});

router.get('/standings', function(req, res, next){
	// 1. get All the photos
	// 2. sort them by the highest likes
	// 3. res.render the standings view and pass it the sorted photo array

	//Get all teams.
		Team.find(function(error, result){
			//we have all teams
			//now, figure out who has the highest win % by wins / totalvotes
			//Create a new array that holds all teh win% + team
			//Sort by win%
			//send the array to standings view below
			var standingsWinPercentage = []
			res.render('standings', {standingsWinPercentage:'Standings'});
		})


	//Send 

	
});

router.post('/winners', function(req, res, next){
	// this will run for all posted pages
	MongoClient.connect('mongodb://localhost:27017/hockeyTeam', function (error, db){
		db.collection('users').insertOne({
			ip: req.ip,
			vote: 'winner',
			image: req.body.srcWinner
		})
		db.collection('users').insertOne({
			ip: req.ip,
			vote: 'loser',
			image: req.body.srcLoser
		})
	})

	Team.findOne({ imagePath: req.body.srcWinner }, function (err, doc){
		var newVotes = doc.totalVotes + 1;
		var newWins = doc.wins + 1;
 		doc.totalVotes = newVotes;
 		doc.wins = newWins;
 		doc.save();
	});

	Team.findOne({ imagePath: req.body.srcLoser }, function (err, doc){
		var newVotes = doc.totalVotes + 1
 		doc.totalVotes = newVotes;
 		doc.save();
	}); 
		
	res.redirect('/');
});

module.exports = router;










