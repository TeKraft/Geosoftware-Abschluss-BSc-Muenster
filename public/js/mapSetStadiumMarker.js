"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to create stadium marker
 * 
 */
 
// set stadium-marker
var pointArray1 = new Array();
var newStadiumMarker;

/**
 * @desc method to enable function to add marker of stadium location
 *
 */
$('#getStadiumMarker').on('click', function() {
	enableAddStadiumMarker();
});

/**
 * @desc Method to enable onclick set stadium marker
 * 
 */
function enableAddStadiumMarker() {
	JL("function: ").info("enableAddStadiumMarker");

	map.on('click', addStadiumMarker);
}; //enableAddStadiumMarker() end

/**
 * @desc Method to check if marker already exists and add stadium marker
 * @param e {object} marker
 * 
 */
function addStadiumMarker(e) {
	JL("function: ").info("addStadiumMarker");
	
	if (newStadiumMarker === undefined) {
		setStadiumMarker(e.latlng);
	} else {
		map.removeLayer(newStadiumMarker);
		JL("success").info("stadium marker removed");
		setStadiumMarker(e.latlng);
	}
	getStadiumPoint(e.latlng);
	document.getElementById('stadium-marker-view').value = pointArray1[0] + ', ' + pointArray1[1];

	map.off('click', addStadiumMarker);
	JL("success").info("add stadium marker");
}; //addStadiumMarker() end

/**
 * @desc method to set stadium marker with popup on map
 * @param object {object} param for marker latitude and marker longitude
 *
 */
function setStadiumMarker(object) {
	JL("function: ").info("setStadiumMarker");

	getStadiumPoint(object);
	newStadiumMarker = new L.marker(pointArray1,{
		 draggable: false
	});
	map.addLayer(newStadiumMarker);
	newStadiumMarker.bindPopup("<b>new popup</b><br />stadium here").openPopup();
}; //setStadiumMarker() end

/**
 * @desc Method to convert point to array
 * @param object {object} point
 * 
 */
function getStadiumPoint(object) {
	JL("function: ").info("getStadiumPoint");

	pointArray1 = new Array();
	pointArray1[0] = object.lat;
	pointArray1[1] = object.lng;
}; //getStadiumPoint() end

/**
* @desc function to create object point
* @param lat {number} latitude of a point
* @param lon {number} longitude of a point
* @return point {object} object point of two coordinates
*/
function Point(lat, lon) {
	JL("function: ").info("Point");
	
	this.latitude = lat;
	this.longitude = lon;
} //Point() end
