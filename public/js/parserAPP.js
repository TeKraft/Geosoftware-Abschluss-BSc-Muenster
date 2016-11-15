"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to show data after load from DB
 * 
 */

var reveived = false;
//var lines;
var newArr;
var thisFeature;

/**
 * @desc Method to load geometry of a feature and add polygon to map
 * @param data {object} feature
 * 
 */
function loadGeometry(data) {
	JL("function: ").info("loadGeometry");

	for (var i=0; i<data.length; i++) {
		var overlay = L.geoJson(data[i].features[0]).addTo(map);
		myLayerControl.addOverlay(overlay, data[i].features[0].properties.name);
	}
}; //loadGeometry() end

/**
 * @desc Method to load properties of a feature
 * @param data {object} feature
 * 
 */
function loadProperties(data) {
	JL("function: ").info("loadProperties");

	for (var i=0; i<data.length; i++) {

		// load geometry of feature
		var geometry = L.geoJson(data[i].features[0]);
		// load properties of feature
		var markerStadium = data[i].features[0].properties.coordinate;
		var markerParking = data[i].features[0].properties.parking;
		var myImg = new Array();

		for(var j=0; j<data[i].features[0].properties.images.length; j++) {
			myImg[j] = '<img id="myImg' + [j] + '" src="' + data[i].features[0].properties.images[j] + '" width="107" height="98">';
		}

		//create popup
		createMarker(data[i].features[0].properties.name, myImg);
		// create marker
		drawStadiumMarker(markerStadium);
		drawParkingMarker(markerParking);
		var dSM= drawStadiumMarker(markerStadium);
		var dPM= drawParkingMarker(markerParking);
		var markerAll = L.layerGroup([dSM, dPM]);

		thisFeature = L.layerGroup([dSM, dPM, geometry]).addTo(map);
		myLayerControl.addOverlay(thisFeature, data[i].features[0].properties.name);
	}
}

/**
 * @desc Method to load json file by input
 * 
 */
function loadFile() {
	var input, file, fr;

	if (typeof window.FileReader !== 'function') {
		alert("The file API isn't supported on this browser yet.");
		return;
	}
	input = document.getElementById('fileinput');
	if (!input) {
		alert("Um, couldn't find the fileinput element.");
	}
	else if (!input.files) {
		alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
		alert("Please select a file before clicking 'Load'");
	}
	else {
		file = input.files[0];
		fr = new FileReader();
		fr.onload = receivedText;
		fr.readAsText(file);
	}

	function receivedText(e) {
		reveived = true;
		var lines;
		newArr = null;
		
		lines = e.target.result;
		newArr = JSON.parse(lines);

		var title = newArr.features[0].properties.name;
		var newArrParse = new Array();
		newArrParse.push(newArr);

		// show feature on map
		showOnEditMap(newArr);
	} //receivedText() end

}; //loadFile() end

/**
 * @desc Method to load feature data into map
 * @param json {object} feature
 * 
 */
function loadPropertiesFromDB(json) {
	JL("function: ").info("loadPropertiesFromDB");

	for (var i=0; i<json.length; i++) {
		// load geometry of feature
		var coordsToParse = json[i].data.features[0].geometry.coordinates;

		for(var fl=0; fl<coordsToParse.length; fl++) {
			var fi = parseFloat(coordsToParse[fl][0]);
			var sec = parseFloat(coordsToParse[fl][1]);
			coordsToParse[fl][0] = sec;
			coordsToParse[fl][1] = fi;
		}

		var geometry = new L.Polygon(coordsToParse);
		// load properties of feature
		var markerStadium = json[i].data.features[0].properties.coordinate;
		var markerParking = json[i].data.features[0].properties.parking;
		var myImg = new Array();

		for(var j=0; j<json[i].data.features[0].properties.images.length; j++) {
			myImg[j] = '<img id="myImg' + [j] + '" src="' + json[i].data.features[0].properties.images[j] + '" width="107" height="98">';
		}

		//create popup
		createMarker(json[i].data.features[0].properties.name, myImg);
		// create marker
		drawStadiumMarker(markerStadium);
		drawParkingMarker(markerParking);
		var dSM= drawStadiumMarker(markerStadium);
		var dPM= drawParkingMarker(markerParking);

		thisFeature = new L.FeatureGroup([dSM, dPM, geometry]).addTo(map);
		myLayerControl.addOverlay(thisFeature, json[i].data.features[0].properties.name);
	}
}; //loadPropertiesFromDB() end
