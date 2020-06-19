import { rng0to, rng1to } from '../src/rng';

test('number between 0 and 5', () => {
  const num = rng0to(5);
  expect(num).toBeGreaterThanOrEqual(0);
  expect(num).toBeLessThanOrEqual(5);
});

test('number between 1 and 5', () => {
  const num = rng1to(5);
  expect(num).toBeGreaterThanOrEqual(1);
  expect(num).toBeLessThanOrEqual(5);
});
