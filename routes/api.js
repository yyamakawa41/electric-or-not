var express = require('express');
var router = express.Router();
var mongoUrl = "mongodb://localhost:27017/hockeyTeam";
var db;
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);
var Photo = require('../models/photos')

/* GET home page. */
router.get('/photos/get', function(req, res, next) {
	Photo.find(function(err, photosResult){
		if (err){
			console.log(err);
		}else{
			res.json(photosResult);
		}
	})
});


module.exports = router;



	