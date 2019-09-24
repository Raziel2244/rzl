'use strict';

const core = require('../lib/core');

test("first test", () => expect(core(1,2)).toBe(3));
