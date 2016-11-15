"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: create marker (not options)
 * 
 */

var polygonOnLoad;
var convertMyPolygon;

/**
 * @desc Method to show polygon on map
 * @param polygonOrigin {array} array of coordinates
 * 
 */
function drawPolygon(polygonOrigin) {
	JL("function: ").info("drawPolygon");

	convertMyPolygon = null;
	convertMyPolygon = polygonOrigin;
	var polygon = polygonOrigin;

	for (var j=0; j<polygon.length; j++) {
		var lon = parseFloat(polygon[j][0]);
		var lat = parseFloat(polygon[j][1]);
		polygon[j][0] = lat;
		polygon[j][1] = lon;
	}
	polygonOnLoad = new L.Polygon(polygon);
	map.addLayer(polygonOnLoad);
}; //drawPolygon() end

// using in loadTestdata.js for loading testData
/**
 * @desc Method to create stadium marker
 * @param stadiumMarker {array} array of stringified coordinates of feature
 * @return split {array} array of coordinate pairs
 */
function drawStadiumMarker(stadiumMarker) {
	JL("function: ").info("drawStadiumMarker");

	var nanStadium = notNumber(stadiumMarker);
	var spltStadium = coordToArray(nanStadium);
	var stadiumMark;
	var index = 0;

	for (var i=0; i<spltStadium.length; i++) {
		index++;
		stadiumMark = new L.Marker([spltStadium[0], spltStadium[1]], {
			icon: markerIcon
		}).bindPopup(stadiumPopup, customOptions);
		i++;
	}
	return stadiumMark;
}; //drawStadiumMarker() end

/**
 * @desc Method to create parking marker
 * @param stadiumMarker {array} array of stringified coordinates of feature
 * @return split {array} array of coordinate pairs
 */
function drawParkingMarker(parkingMarker) {
	JL("function: ").info("drawParkingMarker");

	var nanPark = notNumber(parkingMarker);
	var spltPark = coordToArray(nanPark);
	var parkingMark;
	var index = 0;

	for (var i=0; i<spltPark.length; i++) {
		index++;
		parkingMark = new L.Marker([spltPark[0], spltPark[1]]);
		i++;
	}
	parkingMark.bindPopup(parkingPopup, customOptions).openPopup();
	return parkingMark;
}; //drawParkingMarker() end

