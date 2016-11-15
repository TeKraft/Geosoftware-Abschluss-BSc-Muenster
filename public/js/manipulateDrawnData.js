"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: manipulate polygon
 * 
 */

var geomCoord;
var drawnType;

/**
 * @desc Method to check if polygon has been drawn 
 * 		and if it has been drawn set polygon-value as new polygon
 * @param polygon {object} polygon
 * 
 */
function manipulatePolygon(polygon) {
	JL("function: ").info("manipulatePolygon");

	geomCoord = null;
	var drawnJSON = polygon.toGeoJSON();
	var drawnType = drawnJSON.features[0];

	if (drawnType === undefined) {
		checkDrawn = false;
	} else {
		geomCoord = drawnJSON.features[0].geometry.coordinates;
		document.getElementById('polygon-view').value = geomCoord;
	}
}; //manipulatePolygon() end

