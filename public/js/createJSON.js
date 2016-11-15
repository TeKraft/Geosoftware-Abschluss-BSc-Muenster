"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: create new stadium
 * 
 */

var checkDrawn = true;
var checkInputField = true;
var featureString;
var stadname = 'stadium-name';
var stadtype = 'stadium-type';
var stadcapacity = 'stadium-capacity';
var stadlink = 'stadium-link';
var stadmark = 'stadium-marker-view';
var parkmark = 'parking-marker-view';
var stadevent = 'event-submit-view';
var stadimg = 'stadium-image-view';
var polygonview = 'polygon-view';


/**
 * @desc Method to create new featureString for new stadium
 * 
 */
function createJSON() {
	JL("function: ").info("createJSON");

	checkDrawn = true;
	checkInputField = true;
	featureString = {
		'type': 'FeatureCollection',
		'features':
		[
			{
				'type': 'Feature',
				'properties': {
					'name': String,
					'coordinate': [],
					'venue_type': String,
					'event': [],
					'link': String,
					'images': [],
					'capacity': String,
					'parking': []
				},
				'geometry':
				{
					'type': 'Polygon',
					'coordinates': []
				}
			}
		]
	};

	// get edit-field values
	addEntity(stadname);
	addEntity(stadtype);
	addEntity(stadlink);
	addCapacity(stadcapacity);
	addEntity(stadmark);
	addEntity(parkmark);
	addEntity(stadevent);
	addEntity(stadimg);

//	manipulatePolygon(drawnItems);
	
	// check for loaded file or only draw
	if (checkDrawn === false && reveived === false) {
		checkInputField = false;
	} else {
		var polyString;
		polyString = null;
		polyString = document.getElementById('polygon-view').value;
		var polyStringNaN = notNumber(polyString);
		var polyStringArray = coordToArray(polyStringNaN);
		var newArray = new Array();
		var newArray2 = new Array();

		// convert coordinates from string to number
		for (var a=0; a<polyStringArray.length -1; a++) {
			newArray2 = new Array();
			newArray2[0] = parseFloat(polyStringArray[a]);
			newArray2[1] = parseFloat(polyStringArray[a+1]);
			newArray.push(newArray2);
			a++;
		}
		
		// set featureString coordinates
		featureString.features[0].geometry.coordinates = newArray;
		reveived === true;
		JL("success").info("drawn polygon");
	}

	if (checkInputField === false) {
		JL("error: ").error("nothing has been created - createJSON.js");
	} else {
		featureString.features[0].properties.name = document.getElementById('stadium-name').value;
		featureString.features[0].properties.venue_type = document.getElementById('stadium-type').value;
		featureString.features[0].properties.link = document.getElementById('stadium-link').value;
		featureString.features[0].properties.capacity = document.getElementById('stadium-capacity').value;
		featureString.features[0].properties.coordinate = document.getElementById('stadium-marker-view').value;
		featureString.features[0].properties.parking = document.getElementById('parking-marker-view').value;

		var docVal = document.getElementById('event-submit-view').value;
			featureString.features[0].properties.event = JSON.parse(docVal);
		var imgVal = document.getElementById('stadium-image-view').value;
			featureString.features[0].properties.images = JSON.parse(imgVal);

		checkInputField === true;
	};
}; //createJSON() end
