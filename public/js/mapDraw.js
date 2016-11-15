"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: function for draw control
 * 
 */
var customPopup;
var polygonOptions;
var drawnItems;
var drawControlFull;
var drawControlEditOnly;

/**
 * @desc Method to draw polygon on map
 * 
 */
function drawMap() {
	JL("function: ").info("drawMap");

	// Initialise the FeatureGroup to store editable layers
	drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// Set the button title text for the polygon button
	L.drawLocal.draw.toolbar.buttons.polygon = 'Draw polygon for stadium!';

	// create control to draw polygon
	drawControlFull = new L.Control.Draw({
		edit: {
			featureGroup: drawnItems
		},
		position: 'bottomleft',
		draw: {
			polyline: false,
			polygon: {
				title: 'new polygon',
				allowIntersection: false,
				drawError: {
					color: 'orange',
					timeout: 1000
				},
				shapeOptions: {
					color: 'purple'
				},
				
				showArea: true,
				repeatMode: false
			},
			rectangle: false,
			circle: false,
			marker: false
		}
	});
	// create control where draw is disabled
	drawControlEditOnly = new L.Control.Draw({
		edit: {
			featureGroup: drawnItems
		},
		position: 'bottomleft',
		draw: false
	});

	// add control with draw abled
	map.addControl(drawControlFull);

	// specify popup options 
	polygonOptions =
		{
		'maxWidth': '500',
		'className' : 'custom'
	};

	// for creating
	map.on("draw:created", function (e) {
		drawnItems.clearLayers();
		clearAllFields(polygonview);

		// check if polygon has been drawn before
		if (polygonOnLoad !== undefined) {
			map.removeLayer(polygonOnLoad);
		}
		var type = e.layerType,
			layer = e.layer;
		// get marker options
		customPopup = "new poylgon created";
		if (type === 'polygon') {
			layer.bindPopup(customPopup, polygonOptions);
		}
		layer.addTo(drawnItems);

		// manipulate polygon-value for editing / saving new polygon
		manipulatePolygon(drawnItems);

		// after draw set draw control to disabled
		drawControlFull.removeFrom(map);
		drawControlEditOnly.addTo(map)
	});

	// if polygon has been deleted
	map.on("draw:deleted", function(e) {
		drawControlEditOnly.removeFrom(map);
		clearAllFields(polygonview);
		if (polygonOnLoad !== undefined) {
			document.getElementById('polygon-view').value = thisPolygon;
			map.addLayer(polygonOnLoad);
		}
		drawControlFull.addTo(map);
	});
}; //drawMap() end
