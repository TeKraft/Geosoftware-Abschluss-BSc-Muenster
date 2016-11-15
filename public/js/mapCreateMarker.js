"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: create options and popup for marker
 * 
 */
var customOptions;
var markerIcon;
var stadiumPopup;
var parkingPopup;

/**
 * @desc create marker on map for every new feature
 * @param title {String} title of feature
 * @param imgURL {object} URl of the picture for pop-up
 *
 */
function createMarker(title, imgURL) {
	JL("function: ").info("createMarker");

	customOptions = null;
	markerIcon = null;
	stadiumPopup = null;
	parkingPopup = null;

	// create icon for marker
	var LeafIcon = L.Icon.extend({
		options: {
			iconUrl:    'img/marker-icon-2x.png', 
			//shadowUrl:  'leaf-shadow.png',
			iconSize:     [20, 40],
			//shadowSize:   [50, 64],
			iconAnchor:   [6, 55],
			//shadowAnchor: [4, 62],
			popupAnchor:  [5, -55]
		}
	});
	markerIcon = new LeafIcon();

	// create popup contents
	stadiumPopup = title + '<br>' + imgURL;
	parkingPopup = 'parking for:<br>' + '<b>' + title + '<b>';
	// specify popup options 
	customOptions =
		{
		'maxWidth': '500',
		'className' : 'custom'
		};
}; //createMarker() end
