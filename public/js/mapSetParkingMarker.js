"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to create parking marker
 * 
 */

// set parking marker
var pointArray2 = new Array();
var newParkingMarker;

/**
 * @desc method to enable function to add marker of parking location
 *
 */
$('#getParkingMarker').on('click', function() {
	enableAddParkingMarker();
});

/**
 * @desc Method to enable onclick set parking marker
 * 
 */
function enableAddParkingMarker() {
	JL("function: ").info("enableAddParkingMarker");

	map.on('click', addParkingMarker);
}; //enableAddParkingMarker() end

/**
 * @desc Method to check if marker already exists and add parking marker
 * @param e {object} marker
 * 
 */
function addParkingMarker(e) {
	JL("function: ").info("addParkingMarker");

	if (newParkingMarker === undefined) {
		setParkingMarker(e.latlng);
	} else {
		map.removeLayer(newParkingMarker);
		JL("success").info("parking marker removed");
		setParkingMarker(e.latlng);
	}
	getParkingPoint(e.latlng);
	document.getElementById('parking-marker-view').value = pointArray2[0] + ',' + pointArray2[1];

	map.off('click', addParkingMarker);
	JL("success").info("add parking marker");
}; //addParkingMarker() end

/**
 * @desc method to set parking marker with popup on map
 * @param object {object} param for marker latitude and marker longitude
 *
 */
function setParkingMarker(object) {
	JL("function: ").info("setParkingMarker");

	getParkingPoint(object);
	newParkingMarker = new L.marker(pointArray2,{
		draggable: false
	});
	map.addLayer(newParkingMarker);
	newParkingMarker.bindPopup("<b>new popup</b><br />parking here").openPopup();
}; //setParkingMarker() end

/**
 * @desc Method to convert point to array
 * @param object {object} point
 * 
 */
function getParkingPoint(object) {
	JL("function: ").info("getParkingPoint");

	pointArray2 = new Array();
	pointArray2[0] = object.lat;
	pointArray2[1] = object.lng;
}; //getParkingPoint() end
