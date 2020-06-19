import { capitalise } from '../src/string';

test('first character is capitalised if aplhabetic', () => {
  expect(capitalise('abc')).toBe('Abc');
  expect(capitalise('a b c')).toBe('A b c');
});

test('other characters are left as received', () => {
  expect(capitalise('abC.')).toBe('AbC.');
  expect(capitalise('a, b C.')).toBe('A, b C.');
});
