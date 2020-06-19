/**
 * @file Contains type checking functions.
 * @author Elliot Thomas
 */

/**
 * Test to see if the given value is an array.
 * @summary Test if array.
 * @param {*} x - The value to test
 * @returns {boolean} Is array
 */
export function isArray(x: any): boolean {
  return Array.isArray(x);
}

/**
 * Test to see if the given value is an iterable.
 * @summary Test if iterable.
 * @param {*} x - The value to test
 * @returns {boolean} Is iterable
 */
export function isIterable(x: any): boolean {
  return typeof x[Symbol.iterator] === 'function';
}

/**
 * Test to see if the given value is a map.
 * @summary Test if map.
 * @param {*} x - The value to test
 * @returns {boolean} Is map
 */
export function isMap(x: any): boolean {
  return x instanceof Map;
}

/**
 * Test to see if the given value is a number.
 * @summary Test if number.
 * @param {*} x - The value to test
 * @returns {boolean} Is number
 */
export function isNumber(x: any): boolean {
  return isNumberObject(x) || isNumberPrimitive(x);
}

/**
 * Test to see if the given value is a number object.
 * @summary Test if number object.
 * @param {*} x - The value to test
 * @returns {boolean} Is number object
 */
export function isNumberObject(x: any): boolean {
  return x instanceof Number;
}

/**
 * Test to see if the given value is an object.
 * @summary Test if object.
 * @param {*} x - The value to test
 * @returns {boolean} Is object
 */
export function isObject(x: any): boolean {
  return x instanceof Object;
}

/**
 * Test to see if the given value is a number primtive.
 * @summary Test if number primitive.
 * @param {*} x - The value to test
 * @returns {boolean} Is number primitive
 */
export function isNumberPrimitive(x: any): boolean {
  return typeof x === 'number';
}

/**
 * Test to see if the given value is a string.
 * @summary Test if string.
 * @param {*} x - The value to test
 * @returns {boolean} Is string
 */
export function isString(x: any): boolean {
  return isStringObject(x) || isStringPrimitive(x);
}

/**
 * Test to see if the given value is a string object.
 * @summary Test if string object.
 * @param {*} x - The value to test
 * @returns {boolean} Is string object
 */
export function isStringObject(x: any): boolean {
  return x instanceof String;
}

/**
 * Test to see if the given value is a string primtive.
 * @summary Test if string primitive.
 * @param {*} x - The value to test
 * @returns {boolean} Is string primitive
 */
export function isStringPrimitive(x: any): boolean {
  return typeof x === 'string';
}

/**
 * Test to see if the given value is undefined.
 * @summary Test if undefined.
 * @param {*} x - The value to test
 * @returns {boolean} Is undefined
 */
export function isUndefined(x: any): boolean {
  return typeof x === 'undefined';
}
