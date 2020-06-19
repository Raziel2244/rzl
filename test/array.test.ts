import { arrayLargest, arraySmallest, arrayRandom } from '../src/array';

const arr = [1, 2, 0, 3];

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeIn(array: any[]): R;
    }
  }
}

expect.extend({
  toBeIn(received: any, array: any[]) {
    return {
      message: () => `expected ${received} to be in ${array}`,
      pass: array.includes(received),
    };
  },
});

test('largest number in array', () => {
  expect(arrayLargest(arr)).toBe(3);
});

test('smallest number in array', () => {
  expect(arraySmallest(arr)).toBe(0);
});

test('random item in array', () => {
  expect(arrayRandom(arr)).toBeIn(arr);
});
