/**
 * Rzl core module.
 * @module @rzl/core
 */

/**
 * Capitalise the first letter of the given string.
 * @summary Capitalise first letter.
 * @param {string} str The string to capitalise
 * @returns {string} The capitalised string
 */
export function capitalise(str) {
	if (!str || typeof str !== "string") return;
	return str[0].toUpperCase() + str.slice(1);
}

/**
 * Generate a random number in a given range (inclusive).
 * @summary Random number generator.
 * @param {number} [to=100] The maximum number to roll
 * @param {number} [from=1] The minimum number to roll
 * @returns {number} The random number
 */
export function randomInt(to=100, from=1) {
	return Math.floor(Math.random() * (1 + to - from)) + from;
}

/**
 * Test to see if the given variable is undefined.
 * @summary Test if undefined.
 * @param {Object} x The variable to test
 * @returns {boolean} The outcome of the test
 */
export function undef(x) {
	return (typeof x === "undefined") || false;
}
