"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: map functions
 * 
 */
 
var mapping;
var editing;

/**
 * @desc onclick method to display map element with three second fade
 * for map.html
 * 
 */
function myFunctionMap() {
	JL("function: ").info("myFunctionMap");

	mapping = true;
	editing = false;

	$("map").fadeIn(3000);
	leaflet();
	status = "true";
} //myFunctionMap() end

/**
 * @desc onClick method to display map element with three second fade
 * 	for edit.html
 *
 */
function myFunctionEdit() {
	JL("function: ").info("myFunctionEdit");

	mapping = false;
	editing = true;

	$("map").fadeIn(3000);
	leaflet();
	status = "true";
}; //myFunctionEdit() end

/**
 * @desc onClick method to display map element with one second fade
 * 	and load again - button "karte anzeigen"
 *
 */
function mapOn() {
	JL("function: ").info("mapOn");

	if (status != "true") {
		$("#map").fadeIn(1000);
		//show map
		leaflet();
		status = "true";
	}
	else {
		//$("#map").fadeOut(250);
		map.remove();
		$("#map").fadeIn(1000);
		//show map
		leaflet();
		status = "true";
	}
}; //mapOn() end

/**
 * @desc onClick method to hide map with one second fade
 * Space on page occupied by map will not stay blank.
 *
 */
function mapOff() {
	JL("function: ").info("mapOff");

	$("#map").fadeOut(1000);
	map.remove();
	status = "false";
}; //mapOff() end

/**
 * @desc onClick method to go to viewpoint of map
 * moves to center of map
 *
 */
function centerMap() {
	JL("function: ").info("centerMap");
	
	map.setView([-22.90833, -43.19639], 12);
}; //centerMap() end
