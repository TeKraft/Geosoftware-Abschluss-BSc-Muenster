"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to communicate with database
 * 
 */

var dataTitle;
// var latlngArray;
var myUID;
var contentParse;
var myName;
var message;
var imageNumber = 0;

/**
 * @desc Method to create feature and launch saveToDB()
 * 
 */
function saveFeatureString() {
	JL("function: ").info("saveFeatureString");

	createJSON();
	if (checkInputField === false) {
		JL('error').info("not saved");
		alert("save to DB not possible");
	} else {
		saveToDB(featureString);
		clearInput();
	}
}; //saveFeatureString() end

/**
 * ajax call - POST
 * @desc Method to save feature to DB
 * @param jsonString {object} feature as object
 *
 */
function saveToDB(jsonString) {
	JL("function: ").info("saveToDB");

	var dataTitle;
	var url;
	var contentString = JSON.stringify(jsonString);
	var decodedcontentString = decodeURI(contentString);
	var content = JSON.parse(decodedcontentString);

	dataTitle = content.features[0].properties.name;
	url = 'localhost:2000' + '/addFeature?name=' + dataTitle;

	getFeatureNames(dataTitle);

	if (message === false) {
		// ajax Post
		$.ajax({
			url: '/addFeature?name=' + dataTitle,
			async: false,
			type: "POST",
			data: content,
			success: function(xhr, textStatus, data){
				// go to map.html
				//window.location.href = "map.html";
				JL("success: ").info("save");
				// do function loadFromDB() to refresh list, when save feature
				loadToEdit();
			},
			error: function(textStatus, errorThrown){
				JL("error").info("saveToDB ajax");
				console.log(errorThrown);
			}
		});
	} else {
		if (message === true) {

			$(function() {
				$("#dialog-confirm").dialog({
					resizable: false,
					height: "auto",
					width: 400,
					modal: true,
					buttons: {
						"update this Feature": function() {
							updateFeature(jsonString);
							$( this ).dialog( "close" );
							JL("success: ").info("update features");
							loadToEdit();
						},
						Cancel: function() {
							$( this ).dialog( "close" );
							JL("info: ").info("no update");
							loadToEdit();
						}
					}
				});
			});
		} else {
			JL("error").error("something is wrong");
		}
	}
}; //saveToDB() end

/**
 * ajax call - POST
 * @desc Method to update feature in DB
 * @param jsonString {object} feature as object
 *
 */
function updateFeature(jsonString) {
	JL("function: ").info("updateFeature");

	var dataTitle;
	var contentString = JSON.stringify(jsonString);
	var decodedcontentString = decodeURI(contentString); 
	var content = JSON.parse(decodedcontentString);

	dataTitle = content.features[0].properties.name;

	// ajax Post
	$.ajax({
		url: '/updateFeature?name=' + dataTitle,
		//async: false,
		type: "POST",
		data: content,
		
		success: function(xhr, textStatus, data){
			
			// go to map.html
			//window.location.href = "map.html";
			JL("info: ").info("updating feature");
			// do function loadFromDB() to refresh list, when save feature
			loadToEdit();
		},
		error: function(textStatus, errorThrown){
			JL("error").info("updateFeature ajax");
			console.log(errorThrown);
		}
	});
}; //updateFeature() end

/**
 * ajax call - GET
 * @desc ajax method to load all features from DB
 *
 */
function loadFromDB() {
	JL("function: ").info("loadFromDB");

	var uid;
	myUID = new Array();
	myName = new Array();

	//set url
	var url = 'http://' + window.location.host + '/getAllFeatures';

	 // ajax Get
	 $.ajax({
		url: url,
		async: false,
		type: 'GET',
		
		success: function(content, textStatus, xhr) {
			JL("success: ").info("load features");

			// remove existing items
			$('#tableStadienContents').empty();
			$('#permalinkContent').empty();
			$('#choosenStadium').empty();

			var contentString = JSON.stringify(content);
			var decoded = decodeURI(contentString);

			contentParse = null;
			contentParse = JSON.parse(decoded);
			
			var numberOfImage = 0;

			// create list in table to choose route
			for (var i=0; i< content.length; i++) {
				uid = contentParse[i]._id;		// define unique id
				//strings
				var myLink = contentParse[i].data.features[0].properties.link;
				var myCapacity = contentParse[i].data.features[0].properties.capacity;
				var myType = contentParse[i].data.features[0].properties.venue_type;
				var myEvent = contentParse[i].data.features[0].properties.event;
				//arrays
				var myImg = new Array();
				var myFeatureGeo = contentParse[i].data.features[0].geometry;
				var myPolygon = myFeatureGeo.coordinates;
				var myFeatureProp = contentParse[i].data.features[0].properties;
				var myStadium = myFeatureProp.coordinate;
				var myParking = myFeatureProp.parking;

				for(var j=0; j<contentParse[i].data.features[0].properties.images.length; j++) {
					myImg[j] = '<a title="click me" href="' + contentParse[i].data.features[0].properties.images[j] + '" data-lightbox="image-' + numberOfImage + '" data-title="' + contentParse[i].data.features[0].properties.name + '"><img id="myImg' + [j] + '" src="' + contentParse[i].data.features[0].properties.images[j] + '" alt="image-' + j + '" width="107" height="98"/></a>';
				}

				myUID[i] = uid;
				numberOfImage++;

				// append data to table
				$('#tableStadienContents').append(
					'<tr>'
					+ '<td>' + (i+1) + '</td>'		//number
					+ '<td>' + '<a title="click for more details" href="#map" onclick="getUniqueStadium(myUID['+ i +'])">' + contentParse[i].data.features[0].properties.name + '</a>' + '</td>'	//name
					+ '<td>' + myCapacity + '</td>'	//capacity
					+ '<td>' + myStadium + '</td>'	//coordinate stadium
					+ '<td>' + myParking + '</td>'	//coordinate parking
					+ '<td>' + myImg + '</td>'	//images
					+ '</tr>'
				)

				var nanMyParking = notNumber(myParking);
				var arrayMyParking = coordToArray(nanMyParking);

				// append data to table
				$('#permalinkContent').append(
					'<tr>'
					+ '<td>' + (i+1) + '</td>'		//number
					+ '<td>' 
						+ '<a title="click for more details" href="#map" onclick="getUniqueStadium(myUID['+ i +'])">' + contentParse[i].data.features[0].properties.name + '</a>' 
					+ '</td>'
					+ '<td>'
						+ '<button title="show route" type="button" class="btn btn-default" onclick="getRoute(' + arrayMyParking[0] + ', ' + arrayMyParking[1] + ')"><span class="glyphicon glyphicon-road" aria-hidden="true"></span></button>'
					+ '</td>'
					+ '</tr>'
				)
			}
			mapOn();
			// show data on map
			loadPropertiesFromDB(contentParse);
		},
		error: function(xhr, textStatus, errorThrown){
			JL('ajaxLogger').error("unable to get database content (" + errorThrown + ")");
		}
	});
}; //loadFromDB() end


/**
 * ajax call - GET
 * @desc ajax method to get names of all saved features
 *
 */
function getFeatureNames(title) {
	JL("function: ").info("getFeatureNames");

	// ajax Get
	$.ajax({
		url: '/getFeatureNames?name=' + title,
		async: false,
		type: "GET",
		success: function(content, textStatus, xhr){
			message = content;
			JL("success: ").info("get all featurenames");
			return message;
		},
		error: function(xhr, textStatus, errorThrown){
			JL("error").info("getFeatureNames ajax");
			console.log(errorThrown);
		}
	});
}; //getFeatureNames() end

/**
 * ajax call - GET
 * @desc ajax method to GET one specific Feature from database by unique id
 * @param id {String} unique id
 *
 */
function getUniqueStadium(id) {
	JL("function: ").info("getUniqueStadium");
	//set url
	var url = 'http://' + window.location.host + '/getOneFeature?id=' + id;

	// ajax Get
	$.ajax({
		type: 'GET',
		url:  url,
		success: function(content, textStatus ) {
			JL("success: ").info("get unique stadium");

			var newContentString = JSON.stringify(content);
			var newParse = JSON.parse(newContentString);

			// for simple handling
			var myFeatureGeo = newParse.features[0].geometry;
			var myFeatureProp = newParse.features[0].properties;

			var myPolygon = myFeatureGeo.coordinates[0];
			var myName = myFeatureProp.name;
			var myCapacity = myFeatureProp.capacity;
			var myType = myFeatureProp.venue_type;
			var myLink = myFeatureProp.link;
			var myEvent = myFeatureProp.event;
			var myImg = new Array();
			var myParking = myFeatureProp.parking;
			var myStadium = myFeatureProp.coordinate;

			// create array of images
			for(var j=0; j<myFeatureProp.images.length; j++) {
				myImg[j] = '<a title="click me" href="' + myFeatureProp.images[j] + '" data-lightbox="image-' + imageNumber + '" data-title="' + myFeatureProp.name + '"><img id="myImg' + [j] + '" src="' + myFeatureProp.images[j] + '" alt="image-' + j + '" width="86" height="74"/></a>'; //107,98
			}
			imageNumber ++;

			var nanmyStadium = notNumber(myStadium);
			var coordmyStadium = coordToArray(nanmyStadium);
			map.setView([coordmyStadium[0], coordmyStadium[1]], 14);

			$('#choosenStadium').empty();

			//create string for event
			var stringEvent = new Array();
			for(var eve=0; eve<myEvent.length; eve++) {
				stringEvent += '<b>' + myEvent[eve].name + ' - </b>' + myEvent[eve].date_start + ' till ' + myEvent[eve].date_end + '<br>';
			}

			// append data to table
			$('#choosenStadium').append(
				'<table id="choosenDetails" class="table table-hover">'
					+ '<tr>'
						+ '<td>' + myImg + '</td>'	//images
						+ '<td>'
							+ '<b>name: </b>' + myName	//name
							+ '<br>'
							+ '<b>capacity: </b>' + myCapacity	//capacity
							+ '<br>'
							+ '<b>type: </b>' + myType	//type
						+ '</td>'
						+ '<td>'
							+ stringEvent	//stadium marker coords
						+ '</td>'
						+ '<td>'
							+ '<a title="' + myLink + '" class="btn btn-default" href="' + myLink + '"><span class="glyphicon glyphicon-home" aria-hidden="true"></span></button>'
						+ '</td>'
					+ '</tr>'
				+ '</table>'
			)			
		},
		error: function(xhr, textStatus, errorThrown){
			JL('error: ').error("unable to get database content (" + errorThrown + ")");
		}
	});
}; //getUniqueStadium() end
