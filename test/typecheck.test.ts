import {
  isIterable,
  isString,
  isUndefined,
  isStringObject,
  isStringPrimitive,
  isArray,
  isNumber,
  isNumberObject,
  isNumberPrimitive,
  isMap,
  isObject,
} from '../src/typecheck';

/* eslint "@typescript-eslint/no-array-constructor": "off", "no-new-wrappers": "off", "no-new-object": "off" */

describe('isArray', () => {
  test('returns true for arrays', () => {
    expect(isArray(new Array())).toBeTruthy();
    expect(isArray([])).toBeTruthy();
  });

  test('returns false for non-arrays', () => {
    expect(isArray(new Map())).toBeFalsy();
    expect(isArray(new Number())).toBeFalsy();
    expect(isArray(new Object())).toBeFalsy();
    expect(isArray(new Set())).toBeFalsy();
    expect(isArray(new String())).toBeFalsy();
    expect(isArray(0)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray('')).toBeFalsy();
  });
});

describe('isIterable', () => {
  test('returns true for iterables', () => {
    expect(isIterable(new Array())).toBeTruthy();
    expect(isIterable(new Map())).toBeTruthy();
    expect(isIterable(new Set())).toBeTruthy();
    expect(isIterable(new String())).toBeTruthy();
    expect(isIterable([])).toBeTruthy();
    expect(isIterable('')).toBeTruthy();
  });

  test('returns false for non-iterables', () => {
    expect(isIterable(new Number())).toBeFalsy();
    expect(isIterable(new Object())).toBeFalsy();
    expect(isIterable(0)).toBeFalsy();
    expect(isIterable({})).toBeFalsy();
  });
});

describe('isObject', () => {
  test('returns true for objects', () => {
    expect(isObject(new Array())).toBeTruthy();
    expect(isObject(new Map())).toBeTruthy();
    expect(isObject(new Number())).toBeTruthy();
    expect(isObject(new Object())).toBeTruthy();
    expect(isObject(new Set())).toBeTruthy();
    expect(isObject(new String())).toBeTruthy();
    expect(isObject([])).toBeTruthy();
    expect(isObject({})).toBeTruthy();
  });

  test('returns false for primitives', () => {
    expect(isObject(0)).toBeFalsy();
    expect(isObject('')).toBeFalsy();
  });
});

describe('isNumber', () => {
  test('returns true for number objects', () => {
    expect(isNumber(new Number())).toBeTruthy();
  });

  test('returns true for number primitives', () => {
    expect(isNumber(0)).toBeTruthy();
  });

  test('returns false for non-numbers', () => {
    expect(isNumber(new Array())).toBeFalsy();
    expect(isNumber(new Map())).toBeFalsy();
    expect(isNumber(new Object())).toBeFalsy();
    expect(isNumber(new Set())).toBeFalsy();
    expect(isNumber(new String())).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber('')).toBeFalsy();
  });
});

describe('isNumberObject', () => {
  test('returns true for number objects', () => {
    expect(isNumberObject(new Number())).toBeTruthy();
  });

  test('returns false for number primitives', () => {
    expect(isNumberObject(0)).toBeFalsy();
  });

  test('returns false for non-numbers', () => {
    expect(isNumberObject(new Array())).toBeFalsy();
    expect(isNumberObject(new Map())).toBeFalsy();
    expect(isNumberObject(new Object())).toBeFalsy();
    expect(isNumberObject(new Set())).toBeFalsy();
    expect(isNumberObject(new String())).toBeFalsy();
    expect(isNumberObject([])).toBeFalsy();
    expect(isNumberObject({})).toBeFalsy();
    expect(isNumberObject('')).toBeFalsy();
  });
});

describe('isNumberPrimitive', () => {
  test('returns false for string objects', () => {
    expect(isNumberPrimitive(new Number())).toBeFalsy();
  });

  test('returns true for string primitives', () => {
    expect(isNumberPrimitive(0)).toBeTruthy();
  });

  test('returns false for non-strings', () => {
    expect(isNumberPrimitive(new Array())).toBeFalsy();
    expect(isNumberPrimitive(new Map())).toBeFalsy();
    expect(isNumberPrimitive(new Object())).toBeFalsy();
    expect(isNumberPrimitive(new Set())).toBeFalsy();
    expect(isNumberPrimitive(new String())).toBeFalsy();
    expect(isNumberPrimitive([])).toBeFalsy();
    expect(isNumberPrimitive({})).toBeFalsy();
    expect(isNumberPrimitive('')).toBeFalsy();
  });
});

describe('isMap', () => {
  test('to return true for Map', () => {
    expect(isMap(new Map())).toBeTruthy();
  });

  test('to return false for non-Maps', () => {
    expect(isMap(new Array())).toBeFalsy();
    expect(isMap(new Number())).toBeFalsy();
    expect(isMap(new Object())).toBeFalsy();
    expect(isMap(new Set())).toBeFalsy();
    expect(isMap(new String())).toBeFalsy();
    expect(isMap([])).toBeFalsy();
    expect(isMap(0)).toBeFalsy();
    expect(isMap({})).toBeFalsy();
    expect(isMap('')).toBeFalsy();
  });
});

describe('isString', () => {
  test('returns true for string objects', () => {
    expect(isString(new String())).toBeTruthy();
  });

  test('returns true for string primitives', () => {
    expect(isString('')).toBeTruthy();
  });

  test('returns false for non-strings', () => {
    expect(isString(new Array())).toBeFalsy();
    expect(isString(new Map())).toBeFalsy();
    expect(isString(new Number())).toBeFalsy();
    expect(isString(new Object())).toBeFalsy();
    expect(isString(new Set())).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString(0)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });
});

describe('isStringObject', () => {
  test('returns true for string objects', () => {
    expect(isStringObject(new String())).toBeTruthy();
  });

  test('returns false for string primitives', () => {
    expect(isStringObject('')).toBeFalsy();
  });

  test('returns false for non-strings', () => {
    expect(isStringObject(new Array())).toBeFalsy();
    expect(isStringObject(new Map())).toBeFalsy();
    expect(isStringObject(new Number())).toBeFalsy();
    expect(isStringObject(new Object())).toBeFalsy();
    expect(isStringObject(new Set())).toBeFalsy();
    expect(isStringObject([])).toBeFalsy();
    expect(isStringObject(0)).toBeFalsy();
    expect(isStringObject({})).toBeFalsy();
  });
});

describe('isStringPrimitive', () => {
  test('returns false for string objects', () => {
    expect(isStringPrimitive(new String())).toBeFalsy();
  });

  test('returns true for string primitives', () => {
    expect(isStringPrimitive('')).toBeTruthy();
  });

  test('returns false for non-strings', () => {
    expect(isStringPrimitive(new Array())).toBeFalsy();
    expect(isStringPrimitive(new Map())).toBeFalsy();
    expect(isStringPrimitive(new Number())).toBeFalsy();
    expect(isStringPrimitive(new Object())).toBeFalsy();
    expect(isStringPrimitive(new Set())).toBeFalsy();
    expect(isStringPrimitive([])).toBeFalsy();
    expect(isStringPrimitive(0)).toBeFalsy();
    expect(isStringPrimitive({})).toBeFalsy();
  });
});

describe('isUndefined', () => {
  test('returns true for undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  test('returns false for defined', () => {
    expect(isUndefined('')).toBeFalsy();
    expect(isUndefined(0)).toBeFalsy();
    expect(isUndefined(true)).toBeFalsy();
    expect(isUndefined(null)).toBeFalsy();
  });
});
