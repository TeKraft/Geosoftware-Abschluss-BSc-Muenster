"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: build map
 * 
 */

 /**
 * Create console log appender to send jsnlog-messages to browser console
 * @type {JSNLogConsoleAppender}
 *
 */
var consoleAppender = JL.createConsoleAppender('consoleAppender');
JL().setOptions({"appenders": [consoleAppender]});

var map;
var myLayerControl;
var myRoutingControl;
var tripRoute;

/**
 * @desc Function creates map containing base layer.
 * 	Includes layer control function, which enables user to switch between layers.
 * @param event OpenFile event
 * @param id onClick event, param used to identify JSON data element by equal ID
 *
 */
var leaflet = function (event) {
	JL("function: ").info("leaflet");

	// Settings for map
	map = L.map('map').setView([-22.90833, -43.19639], 11);	//münster: 	51.96, 7.61], 13

	// adding OpenStreetMaps base map
	var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	osmLayer.addTo(map);

	// creating a second base map
	var osmLayer2 = new L.tileLayer ('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

	// creating variable to store base maps in as object array
	var baseMaps = {
		"osm_color" : osmLayer,
		"osm_grey" : osmLayer2
	};
	var overlayMaps = {};

	// layer control function
	myLayerControl = L.control.layers(baseMaps, overlayMaps).setPosition('topleft').addTo(map);
	JL("info").info("leaflet - plotting finished");

	// add draw function
	drawMap();

	// Routing Control for routing machine - options and specifications
	myRoutingControl = L.Routing.control({
		autoRoute: true,
		routeWhileDragging: true,
		showAlternatives: true,
		// use nominatim() to respond to geocoding queries 
		geocoder: L.Control.Geocoder.nominatim()
	}); //myRoutingControl() end

	// add routing control to map
	myRoutingControl.addTo(map);

	// function to get actual selected route
	myRoutingControl.on('routeselected', function (e) {
		tripRoute = e.route;
	});

	// hide routing
	hideRouting();

	// special controls for map view and feature editing
	if (mapping == true && editing == false) {
		map.removeControl(drawControlFull);
	}
	if (mapping == false && editing == true) {
		map.removeControl(myRoutingControl);
	}

}; //leaflet() end


