"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: clear input fields for creating stadium
 * 
 */

/**
 * @desc Method to clear one edit-fields
 * @param inputField {string} clear specific edit-field
 * 
 */
function clearAllFields(inputField) {
	JL("function: ").info("clearAllFields");

	document.getElementById(inputField).value = null;
}; //clearAllFields() end

/**
 * @desc Method to clear all edit-fields
 * 
 */
function clearInput() {
	JL("function: ").info("clearInput");

	// remove content of edit-input-fields
	clearAllFields(stadname);
	clearAllFields(stadtype);
	clearAllFields(stadcapacity);
	clearAllFields(stadlink);
	clearAllFields(stadmark);
	clearAllFields(parkmark);
	clearAllFields(stadevent);
	clearAllFields(stadimg);
	clearAllFields(polygonview);

	// remove marker
	map.removeLayer(newStadiumMarker);
	map.removeLayer(newParkingMarker);
	
	// remove polygon
	drawnItems.clearLayers();
}; //clearInput() end
