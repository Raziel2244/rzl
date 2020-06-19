/**
 * @file Contains DOM related functions.
 * @author Elliot Thomas
 */

import { isString } from './typecheck';

type FunctionMap = { [x: string]: Function };
type StringMap = { [x: string]: string };
type StringMapOrString = StringMap | string;

interface AddDivArgs {
  parent: Element;
  id?: string;
  class?: string;
  content?: string;
  events?: FunctionMap;
  props?: StringMap;
  style?: StringMapOrString;
}

interface AddElementArgs extends AddDivArgs {
  tag: any;
}

interface FindChildArgs {
  elm: Element;
  tag: any;
  id?: string;
}

interface SetSelectOptionsArgs {
  elm: Element;
  opts: StringMap;
  style?: StringMapOrString;
}

/**
 * Create a new element and add it to the DOM.
 * @summary Add element.
 * @param {Object} [args] - The arguments for the new element
 * @param {String} [args.tag] - The tagname for the new element
 * @param {Element} [args.parent] - The parent element
 * @param {String} [args.class=""] - The classname for the new element
 * @param {String} [args.content=""] - The content for the new element
 * @param {Object} [args.events] - The events for the new element
 * @param {String} [args.id=""] - The id for the new element
 * @param {Object} [args.props] - The props for the new element
 * @param {Object|string} [args.style] - The style for the new element
 * @returns {Element} The new element
 */
export function addElement(args: AddElementArgs): any {
  const elm = document.createElement(args.tag);

  if (args.id) elm.id = args.id;
  if (args.class) elm.className = args.class;
  if (args.content) elm.innerHTML = args.content;
  if (args.style) setStyle(elm, args.style);
  Object.entries(args.events || {}).forEach(e => elm.addEventListener(...e));
  Object.entries(args.props || {}).forEach(([k, v]) => (elm[k] = v));
  args.parent.append(elm);

  return elm;
}

/**
 * Create a new div and add it to the DOM.
 * @summary Add div.
 * @param {Object} [args] - The arguments for the new div
 * @param {Element} [args.parent] - The parent div
 * @param {String} [args.class=""] - The classname for the new div
 * @param {String} [args.content=""] - The content for the new div
 * @param {Object} [args.events] - The events for the new div
 * @param {String} [args.id=""] - The id for the new div
 * @param {Object} [args.props] - The props for the new div
 * @param {Object|string} [args.style] - The style for the new div
 * @returns {Element} The new div
 */
export function addDiv(args: AddDivArgs): any {
  return addElement({ ...args, tag: 'div' });
}

/**
 * Finds the first matching child of the given element.
 * @summary Find matching child.
 * @param {Element} elm - The element to search from
 * @param {String} tag - The tagname to search for
 * @param {String} [id] - The id to search for
 * @returns {Element} The matching child
 */
export function findChild(args: FindChildArgs): Element | undefined {
  const children = Array.from(args.elm.getElementsByTagName(args.tag));
  return args.id ? children.find(c => c.id === args.id) : children[0];
}

/**
 * Set the options of a select element from an object.
 * @summary Set select options.
 * @param {Element} elm - The target select element
 * @param {Object} opts - The options to set
 * @param {Object|string} [style=""] - The style to set for each option
 */
export function setSelectOptions({ elm, opts, style }: SetSelectOptionsArgs) {
  if (elm.firstElementChild) destroyChildren(elm);
  Object.entries(opts).forEach(([value, content]) => {
    const opt = addElement({
      tag: 'option',
      parent: elm,
      style,
      content,
    });
    opt.value = value;
  });
}

/**
 * Set style of element from string or array/object.
 * @summary Set element style.
 * @param {HTMLElement} elm - The target element
 * @param {Object|string} style - The style to set
 */
export function setStyle(elm: HTMLElement, style: StringMapOrString) {
  if (isString(style)) elm.style.cssText += style;
  else Object.entries(style).forEach(([k, v]) => (elm.style[k as any] = v));
}

/**
 * Destroy all child elements of a given element.
 * @summary Destroy child elements.
 * @param {Element} elm - The target element
 */
export function destroyChildren(elm: Element) {
  while (elm.firstElementChild) destroyElement(elm.firstElementChild);
}

/**
 * Destroy given element with given parent element.
 * @summary Destroy target element.
 * @param {Element} elm - The target element
 */
export function destroyElement(elm: Element) {
  elm.parentElement?.removeChild(elm);
}
