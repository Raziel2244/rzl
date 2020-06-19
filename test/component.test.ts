import { Component } from '../src/component';

jest.mock('../src/component');

const cmp = new Component({});
cmp.build();

test('component class constructor returns component instance', () => {
  expect(cmp).toBeInstanceOf(Component);
});

test('document body has children', () => {
  expect(document?.body?.hasChildNodes).toBeTruthy();
});
