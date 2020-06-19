import { addDiv, addElement } from '../src/dom';

describe('addDiv', () => {
  test('adds a div when given minimal config', () => {
    const div = addDiv({ parent: document.body });
    expect(div.parentElement).toBe(document.body);
  });
});

describe('addElement', () => {
  test('adds the correct element when given minimal config', () => {
    const elm = addElement({ parent: document.body, tag: 'span' });
    expect(elm.parentElement).toBe(document.body);
  });
});
