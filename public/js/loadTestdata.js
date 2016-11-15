"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to load complete testdata into map
 * 
 */

/**
 * @desc method to load complete json Data into map
 * @param url {String} filepath of json that gets added to map
 *
 */
function loadDataCompl(url) {
	JL("function: ").info("loadDataCompl");

	$.getJSON(url, function (data) {
		var dataString = JSON.stringify(data);
		var decodeddataString = decodeURI(dataString); 
		var newData = JSON.parse(decodeddataString);

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

		for (var i=0; i<newData.length; i++) {
			var propertiesTest = newData[i].features[0].properties;

			// transfer data into featureString
			featureString.features[0].properties.name = propertiesTest.name;
			featureString.features[0].properties.venue_type = propertiesTest.venue_type;
			featureString.features[0].properties.link = propertiesTest.link;
			featureString.features[0].properties.capacity = propertiesTest.capacity;
			featureString.features[0].properties.coordinate = propertiesTest.coordinate;
			featureString.features[0].properties.parking = propertiesTest.parking;
			featureString.features[0].properties.event = propertiesTest.event;
			featureString.features[0].properties.images = propertiesTest.images;
			featureString.features[0].geometry.coordinates = newData[i].features[0].geometry.coordinates[0];

			// save featureString to DB
			saveToDB(featureString);
		};
	});
}; //loadDataCompl() end

/**
 * @desc Method to save complete testdata
 * @param stringToSplit {string} one string to be converted
 * @return split {array} only numbers
 */
function loadTestCompl () {
	JL("function: ").info("loadTestCompl");
	loadDataCompl("/testdata/JSONDatas/CompleteList.json");
	JL("success: ").info("save complete Testdata");
}; //loadTestCompl() end
