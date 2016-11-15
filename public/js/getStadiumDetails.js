"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: add and get input field details for creating a stadium
 * 
 */

var eventName;
var eventStart;
var eventEnd;
var counterEvent = 0;
var arrayEvent = new Array();
var counterImg = 0;
var	arrayImg = new Array();
var checkEvent;

/**
 * @desc Method to prevent that there is a negative capacity in a stadium
 * 
 */
$('#stadium-capacity').on('change keyup', function() {
  var sanitized = $(this).val().replace(/[^0-9]/g, '');
  $(this).val(sanitized);
});

/**
 * @desc Method to add entity to new stadium
 * @param entity {String} string id of input-field-value
 * 
 */
function addEntity(entity) {
	JL("function: ").info("addEntity");

	var inputVal = document.getElementById(entity).value;
	var input = document.getElementById(entity);

	if (inputVal === "" || inputVal === null || inputVal === " " || typeof(inputVal) !== "string") {
		input.style.backgroundColor = 'IndianRed';
		checkInputField = false;

		console.log("checkInputField === false : " + entity);
	} else {
		input.style.backgroundColor = 'white';
	}
}; //addEntity() end

/**
 * @desc Method to add capacity to new stadium
 * @param capacity {String} string id of input-field-value
 * 
 */
function addCapacity(capacity) {
	JL("function: ").info("function");

	var inputVal = document.getElementById(capacity).value;
	var input = document.getElementById(capacity);

	if (inputVal < 0 || inputVal === "") {
		input.style.backgroundColor = 'IndianRed';
		checkInputField = false;
	} else {
		input.style.backgroundColor = 'white';
	}
}; //addCapacity() end

/**
 * @desc method to add stadium image URL to stadium-image-view
 *
 */
function submitImgURL() {
	JL("function: ").info("submitImgURL");

	var stadiumImgURL;
	var input = document.getElementById('stadium-imgURL');

	if (document.getElementById('stadium-imgURL').value === "") {
		input.style.backgroundColor = 'IndianRed';
		checkInputField = false;
	} else {
		input.style.backgroundColor = 'white';
		stadiumImgURL = document.getElementById('stadium-imgURL').value;
		arrayImg[counterImg] = stadiumImgURL;

		document.getElementById('stadium-image-view').value = JSON.stringify(arrayImg);
		document.getElementById('stadium-imgURL').value = null;
		stadiumImgURL = null;
		counterImg = counterImg + 1;
	}
}; //submitImgURL() end

/**
 * @desc method to clear list of image URLs
 *
 */
function clearImgList() {
	JL("function: ").info("clearImgList");

	document.getElementById('stadium-imgURL').value = null;
	document.getElementById('stadium-image-view').value = null;
	counterImg = 0;
	arrayImg = new Array();
}; //clearImgList() end

/**
 * @desc method to get event name from input field
 *
 */
function addEventname() {
	JL("function: ").info("addEventname");

	eventName = null;
	eventName = document.getElementById('event-name').value;
	var input = document.getElementById('event-name');
	if (eventName === "") {
		input.style.backgroundColor = 'IndianRed';
		checkEvent = false
	} else {
		input.style.backgroundColor = 'white';
		checkEvent = true;
	}
}; //addEventname() end

/**
 * @desc method to get event start date from input field
 *
 */
function addEventstart() {
	eventStart = null;
	eventStart = document.getElementById('event-start').value;
	var input = document.getElementById('event-start');
	if (eventStart === "") {
		input.style.backgroundColor = 'IndianRed';
		checkEvent = false;
	} else {
		input.style.backgroundColor = 'white';
		checkEvent = true;
	}
}; //addEventstart() end

/**
 * @desc method to get event end date from input field
 *
 */
function addEventend() {
	eventEnd = null;
	eventEnd = document.getElementById('event-end').value;
	var input = document.getElementById('event-end');
	if (eventEnd === "") {
		input.style.backgroundColor = 'IndianRed';
		checkEvent = false;
	} else {
		input.style.backgroundColor = 'white';
		checkEvent = true;
	}
}; //addEventend() end

/**
 * @desc Method to submit event details to view for edit
 * 
 */
function submitEvent() {
	eventName = null;
	eventStart = null;
	eventEnd = null;

	// get name, start, end from input fields
	addEventname();
	addEventstart();
	addEventend();

	if (checkEvent === false) {
		checkInputField = false;
	} else {
		var newEvent = new Event(eventName, eventStart, eventEnd);
		arrayEvent[counterEvent] = newEvent;
		var subView = document.getElementById('event-submit-view').value;
		document.getElementById('event-submit-view').value = JSON.stringify(arrayEvent);
		document.getElementById('event-name').value = null;
		document.getElementById('event-start').value = null;
		document.getElementById('event-end').value = null;
		counterEvent = counterEvent + 1;
	}
	eventName = null;
	eventStart = null;
	eventEnd = null;
	subView = null;
	newEvent = null;
}; //submitEvent() end

function Event(title, start, end) {
	this.name = title;
	this.date_start = start;
	this.date_end = end;
}; //Event() end


/**
 * @desc method to clear list of events
 *
 */
function clearEventList() {

	document.getElementById('event-submit-view').value = null
	counterEvent = 0;
	arrayEvent = new Array();
	checkEvent = false;
}; //clearEventList() end
