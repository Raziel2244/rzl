/**
 * @file Contains array related functions.
 * @author Elliot Thomas
 */

import { rng0to } from './rng';

/**
 * Get the largest number in the given array.
 * @summary Get largest of array.
 * @param {Array} arr - The array to search
 * @returns {Number} The largest number
 */
export function arrayLargest(arr: Number[]): Number {
  return arr.reduce((a, c) => (a > c ? a : c));
}

/**
 * Get the smallest number in the given array.
 * @summary Get smallest of array.
 * @param {Array} arr - The array to search
 * @returns {Number} The smallest number
 */
export function arraySmallest(arr: Number[]): Number {
  return arr.reduce((a, c) => (a < c ? a : c));
}

/**
 * Returns a random item from the given array.
 * @summary Get random array item.
 * @param {Array} arr - Array to pick from
 * @returns {*} Selected item
 */
export function arrayRandom(arr: any[]): any {
  return arr[rng0to(arr.length - 1)];
}
