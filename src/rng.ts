/**
 * @file Contains random number generator functions.
 * @author Elliot Thomas
 */

/**
 * Generate a random number from 1 to n (inclusive).
 * @summary Get random 1 to n.
 * @param {number} n - The random number cap
 * @returns {number} The rolled number
 */
export function rng1to(n: number): number {
  return Math.floor(Math.random() * n) + 1;
}

/**
 * Generate a random number from 0 to n (inclusive).
 * @summary Get random 0 to n.
 * @param {number} n - The random number cap
 * @returns {number} The rolled number
 */
export function rng0to(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}
