'use strict';

const core = require('../lib/core');

test("Capitalised", () => {
	const string = core.capitalise("test");

	expect(string).toBe("Test");
	expect(string).not.toBe("test");
});

test("Input not a string", () => {
	expect(core.capitalise()).toBeUndefined();
	expect(core.capitalise(1)).toBeUndefined();
	expect(core.capitalise([1,2])).toBeUndefined();
});

test("Random integer between 1 and 100", () => {
	const rng = core.randomInt();

	expect(typeof rng).toBe("number");
	expect(rng).toBeGreaterThanOrEqual(1);
	expect(rng).toBeLessThanOrEqual(100);
});

test("Random integer between 15 and 20", () => {
	const rng = core.randomInt(20,15);

	expect(typeof rng).toBe("number");
	expect(rng).toBeGreaterThanOrEqual(15);
	expect(rng).toBeLessThanOrEqual(20);
});

test("Undefined", () => {
	expect(core.undef()).toBeTruthy();
	expect(core.undef(1)).not.toBeTruthy();
});
