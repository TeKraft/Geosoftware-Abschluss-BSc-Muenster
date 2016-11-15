"use strict";

// --------------------------------------------------
// Imports
// --------------------------------------------------

// Load the application's configuration
var config = require('./config');

// Required
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var color = require('colors');

// --------------------------------------------------
// Start Message
// --------------------------------------------------

console.log('############################################################');
console.log('############################################################');
console.log('               STARTING SERVER...');
console.log('############################################################');
console.log('############################################################');

// Set up the express web server
var app = express();

/* get home page */
app.use(express.static("../server"));
app.use(express.static("../public"));

// enable processing of the received post content
app.use(bodyParser.urlencoded({extended: true})); // to enable processing of the received post content

// --------------------------------------------------

// code which is executed on every request
app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);
    res.header('Access-Control-Allow-Origin', '*');    // allow CORS
    next();
});


// --------------------------------------------------
// Starting Services
// --------------------------------------------------

// Start the web server
var server = app.listen(config.express_port, function() {
    console.log('------------------------------------------------------------');
    console.log('  Express server listening on port', config.express_port.toString().cyan);
    console.log('------------------------------------------------------------');
});

/* launch database */
// connect to database
mongoose.connect(config.mongodb_host);
var database = mongoose.connection;

/*// database connection 
mongoose.connect('mongodb://localhost:' + config.mongodb_port + '/gsoft-server');
var database = mongoose.connection;*/

// open database
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {
  console.log('connection to database established on mongo-port ' + config.mongodb_port.toString().cyan);
});

/* http routing */
// code which is executed on every request
app.use(function(req, res, next) {
	console.log(req.method + ' ' + req.url + ' was requested by ' + req.connection.remoteAddress);

	res.header('Access-Control-Allow-Origin', '*');    // allow CORS
	//res.header('Access-Control-Allow-Methods', 'GET,POST');

	next();
});


// --------------------------------------------------
// Featureschema definition
// --------------------------------------------------

/* database schema */
var featureSchema = mongoose.Schema({
	name: String,
	data: {}
});
var Feature = mongoose.model('Feature', featureSchema);

// --------------------------------------------------
// Server requests
// --------------------------------------------------

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
});

/*app.get('/stadium*', function(req, res, next) {
  res.render('stadium');
});*/

// returns json of all stored features
app.get('/getAllFeatures', function(req, res) {
	Feature.find(function(error, features) {
		if (error) return console.error(error);
		// console.log(features);
		res.send(features);
	});
});

// returns name of all stored features
app.get('/getFeatureNames*', function(req, res) {
	console.log("try to get all Feature names");
	var title = req.url.substring(22, req.url.length);
	var message;

	Feature.find({name : title}, function(err, document) {
		if (document.length === 0) {
			message = false;	// = 0; no existing feature with same name
		} else {
			message = true;	// = >0; existing feature with same name
		// console.log("document");
		// console.log(document);
		};
		res.send(message);
	});
	console.log("getFeatureNames successfull");
});

// returns only one specific feature, choosen/filtered by their unique object id
app.get('/getOneFeature*', function(req, res) {
	console.log("inside getOneFeature*");
	// console.log(req.url);
	var uniqueID = req.url.substring(18, req.url.length);	//19		iwas hier stimmt nicht!!!
	console.log("uniqueID " + uniqueID);

	Feature.findOne({_id : uniqueID}, function(err, document) {
		console.log(document.name);
		res.send(document.data);
	});

	console.log("successfull");
});


// takes a json document via POST, which will be added to the database
// name is passed via URL
// url format: /addFeature?name=
app.post('/addFeature*', function(req, res) {
	var title = req.url.substring(17, req.url.length);
	// console.log(title);
	// console.log(req.body);
	var feature = new Feature({
		name: title, // extract name from url
		data: req.body
	});

	feature.save(function(error){
		var message = error ? 'failed to save feature: ' + error 
							: 'feature saved: ' + feature.name;
		console.log(message + ' from ' + req.connection.remoteAddress);
		res.send(message);
	});
});

// takes a json document via POST, which will be added to the database
// and the already existing document will be updated by the new
// name is passed via URL
// url format: /updateFeature?name=*
app.post('/updateFeature*', function(req, res) {
	var title = req.url.substring(20, req.url.length);
	Feature.update(
		{ name: title },
		{$set: { data: req.body } },
		function(error){
		var message = error ? 'failed to update feature: ' + error 
							: 'feature updated: ' + title;
		console.log(message + ' from ' + req.connection.remoteAddress);
		res.send(message);
	});
	console.log("update successfull");
});

/*// returns only one specific feature, choosen/filtered by their unique object id
app.get('/getFeatureByID*', function(req, res) {
	console.log("inside getOneFeature*");

	var uniqueID = req.url.substring(30, req.url.length);	//19		iwas hier stimmt nicht!!!
	console.log("uniqueID " + uniqueID);

	Feature.findOne({_id : uniqueID}, function(err, document) {
		console.log(document.name);
		res.send(document.data);
	});

	console.log("successfull");
});
*/