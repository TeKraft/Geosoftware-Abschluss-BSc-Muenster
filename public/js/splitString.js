"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions to manipulate arrays (String to Number)
 * 
 */

/**
 * @desc Method to to delete all elements that are not a number
 * @param stringToSplit {string} one string to be converted
 * @return split {array} only numbers
 */
function notNumber(stringToSplit) {
	JL("function: ").info("notNumber");

	var split = stringToSplit.split(/[\s,]+/);
	for (var i=0; i<split.length; i++) {
		if(isNaN(split[i])) {
			delete split[i];
		}
	}
	return split;
}; //notNumber() end

/**
 * Method to get all coordinates in one array
 * @param arrayToCheck {array} array that exists only out of numbers
 * @return allIn {array} push all elements of array that are a number into new array
 */
function coordToArray(arrayToCheck) {
	JL("function: ").info("coordToArray");
	
	var allIn = new Array();
	for (var i=0; i<arrayToCheck.length; i++) {
		// test of undefined
		if(isNaN(arrayToCheck[i])) {
		}else {
			allIn.push(arrayToCheck[i]);
		}
	}
	return allIn;
}; //coordToArray() end






