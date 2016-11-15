"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: functions for routing
 * 
 */

/**
 * @desc Method to get and show route between a stadium and an airport
 * @param lat {number} latitude of stadium
 * @paran lon {number} longitude of stadium
 * @return show route
 */
function getRoute(lat, lon) {
	JL("function: ").info("getRoute");

	showRouting();

	setTimeout(function(){ 
		hideRouting();
	}, 1500);

	// Flughafen Rio de Janeiro-Antônio Carlos Jobim
	// lat:-22.81119165
	// lng:-43.2587856858137
	var airportJobim;
	airportJobim = new Point(-22.81119165, -43.2587856858137);
	// Flughafen Rio de Janeiro-Santos Dumont	
	// lat:-22.9114686
	// lng:-43.1641299285217
	var airportDumont;
	airportDumont = new Point(-22.9114686, -43.1641299285217);
	
	var myPoint;
	myPoint = new Point(lat, lon);

	var distJobim = getDistance(myPoint, airportJobim);
	var distDumont = getDistance(myPoint, airportDumont);

	// choose between two airports by distance
	if (distJobim <= distDumont) {
		myRoutingControl.setWaypoints([
			L.latLng(airportJobim.latitude, airportJobim.longitude),
			L.latLng(myPoint.latitude, myPoint.longitude)
		]);
	}
	if (distJobim > distDumont) {
		myRoutingControl.setWaypoints([
			L.latLng(airportDumont.latitude, airportDumont.longitude),
			L.latLng(myPoint.latitude, myPoint.longitude)
		]);
	}
}; //getRoute() end

/**
 * @desc Method to calculate distance between two points
 * @param p1 {object} point 1
 * @param p2 {object} point 2
 * @return distance {number} distance between two points
 */
function getDistance(p1, p2) {
	JL("function: ").info("getDistance");
	
	var lat1 = p1.latitude;
	var lon1 = p1.longitude;
	var lat2 = p2.latitude;
	var lon2 = p2.longitude;

	var distance = calcDist(lat1, lon1, lat2, lon2);
	return distance;
}; //getDistance() end

/**
 * @desc Method to show routing control
 * 
 */
function showRouting() {
	JL("function: ").info("showRouting");

	myRoutingControl.show();
} //showRouting() end

/**
 * @desc Method to hide routing control
 * 
 */
function hideRouting() {
	JL("function: ").info("hideRouting");

	myRoutingControl.hide();
} //hideRouting() end
