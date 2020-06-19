/**
 * @file Contains component class.
 * @author Elliot Thomas
 */

import { Blueprint } from './blueprint';
import { addDiv, addElement, destroyElement } from './dom';

export interface ComponentArgs {
  parent?: any;
  name?: string;
  blueprint?: Blueprint;
  content?: string;
  hooks?: any;
}

/** Generic component class. */
export class Component {
  /** The properties of this component. */
  _props: Map<string, any> = new Map();
  /** The state of this component. */
  _state: Map<string, any> = new Map();

  /** Construct a generic UI component. */
  constructor(args: ComponentArgs) {
    let parent = args?.parent;
    if (!parent) parent = args?.blueprint?.meta?.parent;
    if (!parent) parent = document.body;

    this._props.set('parent', parent);
    this._props.set('name', args?.name || '');
    this._props.set('blueprint', args?.blueprint || null);
    this._props.set('content', args?.content || '');
    this._props.set('hooks', new Map(args?.hooks));
  }

  /** Component blueprint. */
  get blueprint(): Blueprint {
    this.hook('willGetBlueprint');
    return this._props.get('blueprint');
  }
  set blueprint(blueprint: Blueprint) {
    this.hook('willSetBlueprint');
    this._props.set('blueprint', blueprint);
    this._props.set('content', null);
    this.hook('didSetBlueprint');
  }

  /** Component content. */
  get content(): string {
    this.hook('willGetContent');
    return this._props.get('content');
  }
  set content(content: string) {
    this.hook('willSetContent');
    this._props.set('content', content);
    this._props.set('blueprint', null);
    this.hook('didSetContent');
  }

  get hooks(): any {
    this.hook('willGetHooks');
    return this._props.get('hooks');
  }
  set hooks(hooks: any) {
    this.hook('willSetHooks');
    this._props.set('hooks', hooks);
    this.hook('didSetHooks');
  }

  /** Component name. */
  get name(): string {
    this.hook('willGetName');
    return this._props.get('name');
  }
  set name(name: string) {
    this.hook('willSetName');
    this._props.set('name', name);
    this.hook('didSetName');
  }

  /** Component parent. */
  get parent(): HTMLElement {
    this.hook('willGetParent');
    return this._props.get('parent');
  }
  set parent(parent: HTMLElement) {
    this.hook('willSetParent');
    this._props.set('parent', parent);
    this.hook('didSetParent');
  }

  /** Component root. */
  get root() {
    this.hook('willGetRoot');
    return this._state.get('root');
  }
  set root(root) {
    this.hook('willSetRoot');
    this._state.set('root', root);
    this.hook('didSetRoot');
  }

  /** Build and show the UI. */
  build(): void {
    this.hook('willBuild');

    // create root node
    this.root = addDiv({
      parent: this.parent,
      class: 'ui-root rzl-hidden',
      id: `ui-${this.name}-root`,
    });

    // build ui/content
    const loop = (o: any, p: HTMLElement) => {
      const tag = o?.tag || 'div';

      const el = addElement({
        tag,
        parent: p,
        id: o?.id || '',
        class: o?.class || '',
        content: o?.content || '',
        style: o?.style || {},
        events: o?.events || {},
        props: o?.props || {},
      });

      (o?.children || []).forEach((child: any) => loop(child, el));
    };
    loop(this.blueprint, this.root);

    // activate didBuild hook
    this.hook('didBuild');
  }

  /** Destroy the component. */
  destroy(): void {
    this.hook('willDestroy');
    destroyElement(this.root);
    this.hook('didDestroy');
  }

  /** Unhide the component. */
  show(): void {
    this.hook('willShow');
    this.root.classList.remove('rzl-hidden');
    this.hook('didShow');
  }

  /** Hide the component. */
  hide(): void {
    this.hook('willHide');
    this.root.classList.add('rzl-hidden');
    this.hook('didHide');
  }

  /** Trigger the specified hook. */
  hook(name: string): void {
    if (this.hooks.has(name)) this.hooks.get(name)();
  }
}
