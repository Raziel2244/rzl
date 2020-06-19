/**
 * @file Contains Blueprint interface.
 * @author Elliot Thomas
 */

interface BlueprintElement {
  tag?: string;
  id?: string;
  class?: string;
  content?: string;
  events?: { [x: string]: Function };
  children?: BlueprintElement[];
  style?: { [x: string]: string } | string;
  props?: { [x: string]: string };
}

export interface Blueprint {
  meta?: { parent?: HTMLElement };
  view?: BlueprintElement;
}
