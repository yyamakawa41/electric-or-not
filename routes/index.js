var express = require('express');
var router = express.Router();
var MongoClient = require ('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/electric-or-not/hockeyTeam";
var db;
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {

	MongoClient.connect('mongodb://localhost:27017/hockeyTeam', function(error, db){
		db.collection('hockeyTeam').find().toArray(function(error, result){
			console.log(result);
			res.render('index', { photos: result });
		})
	});






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

router.post('*', function(req,res,next){
	
	MongoClient.connect(mongoUrl, function(error, db){
		db.collection('photos').find({src: req.body.src}).toArray(function(error, result){
			var updateVotes = function(db, votes, callback) {
				var newVotes = votes+1;
				
				
			   db.collection('photos').updateOne(
			      { "src" : req.body.src },
			      {
			        $set: { "totalVotes": newVotes },
			        $currentDate: { "lastModified": true }
			      }, function(err, results) {
			      console.log(results);
			      callback();
			   });
			};

			MongoClient.connect(mongoUrl, function(error, db) {
				console.log(result);
				updateVotes(db,result[0].totalVotes, function() {});

			});
		});
	});	
});

router.get('/standings', function(req, res, next){
	// 1. get All the photos
	// 2. sort them by the highest likes
	// 3. res.render the standings view and pass it the sorted photo array
	res.render('standings', {title:'Standings'});
});

router.post('/winners', function(req, res, next){
	// this will run for all posted pages
	MongoClient.connect('mongodb://localhost:27017/hockeyTeam', function (error, db){
		db.collection('users').insertOne({
			ip: req.ip,
			vote: 'winner',
			image: req.body
		})
	})
	res.redirect('../');
});


// router.post('/losers', function(req, res, next){
// 	// this will run for all posted pages
// 	MongoClient.connect('mongodb://localhost:27017/hockeyTeam', function (error, db){
// 		db.collection('users').insertOne({
// 			ip: req.ip,
// 			vote: 'loser',
// 			image: req.body
// 		})
// 	})
// 	res.redirect('../');
// });

module.exports = router;










