/**
 * @file Contains string related functions.
 * @author Elliot Thomas
 */

/**
 * Capitalise the first letter of a given string.
 * @summary Capitalise first letter.
 * @param {string} str - The string to capitalise
 * @returns {string} The capitalised string
 */
export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
