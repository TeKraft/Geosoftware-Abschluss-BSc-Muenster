"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to edit a stadium
 * 
 */

var myPolygon;
var thisPolygon;

/**
 * ajax call - GET
 * @desc ajax method to GET all Features from database
 *
 */
function loadToEdit() {
	JL("function: ").info("loadToEdit");
	var uid;
	myUID = new Array();
	myName = new Array();

	//set url
	var url = 'http://' + window.location.host + '/getAllFeatures';

	// perform ajax on the url and add the loaded GeoJSON
	$.ajax({
		url: url,
		async: false,
		type: 'GET',
		success: function(content, textStatus, xhr) {
			$('#editContent').empty();

			var contentString = JSON.stringify(content);
			var decoded = decodeURI(contentString); 
			contentParse = null;
			contentParse = JSON.parse(decoded);

			// create list in table to choose route
			for (var i=0; i< content.length; i++) {
				uid = contentParse[i]._id;		// define unique id
				myUID[i] = uid;

				$('#editContent').append(
					'<tr>'
					+ '<td>' + (i+1) + '</td>'		//number
					+ '<td>' 
						+ '<a href="#map" onclick="editStadium(myUID['+ i +'])">' + contentParse[i].name + '</a>' 
					+ '</td>'
					+ '</tr>'
				)
			}
			JL("success: ").info("load to edit");
		},
		error: function(xhr, textStatus, errorThrown){
			JL('ajaxLogger').error("unable to get database content (" + errorThrown + ")");
		}
	});
}; //loadToEdit() end

/**
 * ajax call - GET
 * @desc ajax method to GET one specific Feature from database by unique id
 *  function used in table created in "loadToEdit()"
 * @param id {String} unique id
 *
 */
function editStadium(id) {
	JL("function: ").info("editStadium");

	var uid;
	//set url
	var url = 'http://' + window.location.host + '/getFeatureByID?id=' + id;

	// perform ajax on the url and add the loaded GeoJSON
	$.ajax({
		url: '/getOneFeature?id=' + id,
		async: false,
		type: 'GET',
		success: function(content, textStatus, xhr) {
			// remove existing items
			showOnEditMap(content);
			JL("success: ").info("load stadium");
		},
		error: function(xhr, textStatus, errorThrown){
			JL('ajaxLogger').error("unable to get database content (" + errorThrown + ")");
		}
	});
}; //editStadium() end

/**
 * @desc method to convert String into date - form for Event
 * @param date {date} date that has to be converted
 * @return newDate {date} date
 */
function convertDate(date) {
	JL("function: ").info("convertDate");

	var monthNames = [
		"01", "02", "03",
		"04", "05", "06", "07",
		"08", "09", "10",
		"11", "12"
	];
	var dayNames = [
		"00", "01", "02", "03", "04", 
		"05", "06", "07", "08", 
		"09", "10",	"11", "12", 
		"13", "14", "15", "16", 
		"17", "18", "19", "20", 
		"21", "22", "23", "24", 
		"25", "26", "27", "28", 
		"29", "30", "31"
	];

	var dayIndex = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var newDate = year + "-" + monthNames[monthIndex] + "-" + dayNames[dayIndex];
	return newDate;
}; //convertDate() end

/**
 * @desc Method to show feature on map for editing
 * 	on edit.html
 * @param content {object} feature
 * 
 */
function showOnEditMap(content) {
	JL("function: ").info("showOnEditMap");

	myPolygon = null;
	var newContentString = JSON.stringify(content);
	var editParse = JSON.parse(newContentString);
	// for simple handling
	var myFeatureGeo = editParse.features[0].geometry;
	var myFeatureProp = editParse.features[0].properties;

	myPolygon = myFeatureGeo.coordinates;

	if (typeof(myPolygon[0][0]) === "object") {
		myPolygon = myFeatureGeo.coordinates[0];
		JL("info: ").info("polygon is an object");
	} else {
		if (typeof(myPolygon[0][0]) === "string") {
		myPolygon = myFeatureGeo.coordinates;
		JL("info: ").info("polygon is a string");
		} else {
			JL("info: ").info("?");
		}
	}

	var myName = myFeatureProp.name;
	var myType = myFeatureProp.venue_type;
	var myCapacity = myFeatureProp.capacity;
	var myLink = myFeatureProp.link;
	var myEvent = myFeatureProp.event;
	var myImg = myFeatureProp.images;
	var myStadium = myFeatureProp.coordinate;
	var myParking = myFeatureProp.parking;
	var numberOfImage = 0;
	
	mapOn();

	// fill in edit-fields
	document.getElementById('stadium-name').value = myName;
	document.getElementById('stadium-type').value = myType;
	document.getElementById('stadium-capacity').value = myCapacity.replace(/\,/g,'');
	document.getElementById('stadium-link').value = myLink;
	document.getElementById('stadium-marker-view').value = myStadium;
	document.getElementById('parking-marker-view').value = myParking;
	document.getElementById('polygon-view').value = myPolygon;

	// for use in "mapDraw.js"
	thisPolygon = document.getElementById('polygon-view').value;

	var nanmyStadium = notNumber(myStadium);
	var coordmyStadium = coordToArray(nanmyStadium);
	var stadiumPoint = new Point(coordmyStadium[0], coordmyStadium[1]);

	// create marker
	newStadiumMarker = new L.marker(coordmyStadium,{
		draggable: false
	});
	map.addLayer(newStadiumMarker);
	newStadiumMarker.bindPopup("<b>new popup</b><br />stadium here");

	var nanmyParking = notNumber(myParking);
	var coordmyParking = coordToArray(nanmyParking);
	newParkingMarker = new L.marker(coordmyParking,{
		draggable: false
	});
	map.addLayer(newParkingMarker);
	newParkingMarker.bindPopup("<b>new popup</b><br />parking here");

	// show polygon on map
	drawPolygon(myPolygon);

	// fill in edit-fields
	clearImgList();
	for (var h=0; h<myImg.length; h++) {
		document.getElementById('stadium-imgURL').value = myImg[h];
		submitImgURL();
	};

	// fill in edit-fields
	clearEventList();
	for (var e=0; e<myEvent.length; e++) {
		var newStartDate = new Date(myEvent[e].date_start);
		var newEndDate = new Date(myEvent[e].date_end);
		var startDate = convertDate(newStartDate);
		var endDate = convertDate(newEndDate);

		document.getElementById('event-name').value = myEvent[e].name;
		document.getElementById('event-start').value = startDate;
		document.getElementById('event-end').value = endDate;
		submitEvent();
	}
}; //showOnEditMap() end
