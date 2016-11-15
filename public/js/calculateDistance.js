"use strict";
/**
 * 09/2016
 * @desc Geosoftware I - End-Exercise - SS2016
 * @author Torben Kraft
 *
 * .js: calculate distance between two points
 * 
 */

/** 
formula from: https://de.wikipedia.org/wiki/Orthodrome
*/

/**
 * @desc Method to 
 * @param a {number} latitude of point 1
 * @param b {number} longitude of point 1
 * @param c {number} latitude of point 2
 * @param d {number} longitude of point 2
 * @return distance {number} distance
 */
function calcDist(a, b, c, d) {
	JL("function: ").info("calcDist");

	// calculate elements to radiants
	a = toRadiant(a);
	b = toRadiant(b);
	c = toRadiant(c);
	d = toRadiant(d);

	/**
	 * @desc Method to fix coordinates for calculation
	 * @param x {number} coordinate to manipulate
	 * @return new x {number} fixed coordinate
	 */
	function toRadiant(x) {
		return x*(Math.PI/180);
	}

	// complex form for calculation
	var f = 1/298.257223563; //flattening of the earth
	var erad = 6378.137; //equatorial radius
	var F = (a+c)/2; //average of latitudes
	var G = (a-c)/2;
	var l = (b-d)/2;

	//calculation of the easy distance (D)
	var S = Math.sin(G)*Math.sin(G)*Math.cos(l)*Math.cos(l)+Math.cos(F)*Math.cos(F)*Math.sin(l)*Math.sin(l);
	var C = Math.cos(G)*Math.cos(G)*Math.cos(l)*Math.cos(l)+Math.sin(F)*Math.sin(F)*Math.sin(l)*Math.sin(l);
	var w = Math.atan(Math.sqrt(S/C)); //radians

	var D = 2*w*erad;
	 
	//correcting with help of H1 and H2
	var T = (Math.sqrt(S*C))/w;
	var H1 = (3*T-1)/(2*C);
	var H2 = (3*T+1)/(2*S);

	//calculating distance with deviation of 50m
	var distance = D*(1+f*H1*Math.sin(F)*Math.sin(F)*Math.cos(G)*Math.cos(G)-f*H2*Math.cos(F)*Math.cos(F)*Math.sin(G)*Math.sin(G));

	return distance;
}; //calcDist() end


