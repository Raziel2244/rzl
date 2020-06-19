/**
 * @file Contains routing classes.
 * @author Elliot Thomas
 */

import { Component } from './component';

interface Route {
  layout: any;
  path: string;
  pathMatch: 'full' | 'prefix';
  children: Route[];
  matcher: Function;
}

interface RouterArgs {
  // hooks?: Map<string, Function>;
  hooks?: any;
  routes?: Route[];
  name?: string;
  outlet?: HTMLElement;
  useHash?: boolean;
  maxHistory?: number;
}

/** Router class. */
export class Router {
  props: Map<string, any>;
  state: Map<string, any>;

  /** Construct a Router. */
  constructor(args: RouterArgs) {
    /** The properties of this Router. */
    this.props = new Map<string, any>([
      ['hooks', args?.hooks],
      ['routes', args?.routes || []],
      ['name', args?.name || ''],
      ['outlet', args?.outlet || document.body],
      ['useHash', args?.useHash || true],
      ['maxHistory', args?.maxHistory || 10],
    ]);

    /** The current state of this Router. */
    this.state = new Map<string, any>([
      ['history', []],
      ['path', ''],
    ]);

    // Setup hash routing
    if (this.props.get('useHash')) window.onhashchange = () => this._render();

    // navigate to current route
    this.navigate(this.hashPath);
  }

  /** The hooks activated by this Router. */
  get hooks() {
    return this.props.get('hooks');
  }
  set hooks(hooks: any) {
    this.props.set('hooks', hooks);
  }

  /** The routes handled by this Router. */
  get routes() {
    return this.props.get('routes');
  }
  set routes(routes: Route[]) {
    this.props.set('routes', routes);
  }

  /** The name for this Router. */
  get name() {
    return this.props.get('name');
  }
  set name(name: string) {
    this.props.set('name', name);
  }

  /** The DOM element for this Router. */
  get outlet() {
    return this.props.get('outlet');
  }
  set outlet(outlet: HTMLElement) {
    this.props.set('outlet', outlet);
  }

  /** Current path of this router. */
  get path() {
    return this.state.get('path');
  }
  set path(path: string) {
    this.state.set('path', path);
  }

  /** History of this Router. */
  get history() {
    return this.state.get('history');
  }
  set history(history: string[]) {
    this.state.set('history', history);
  }

  /** Read and update the location hash. */
  get hashPath(): string {
    return location.hash.replace(/^#?\/?/, '');
  }
  set hashPath(path: string) {
    location.hash = path.replace(/^#?\/?/, '#/');
  }

  /** Navigate to the given route. */
  navigate(path: string = '') {
    this.props.get('useHash') ? (this.hashPath = path) : this._render(path);
  }

  /** Parse the given path and return the matching route. */
  async _parsePath(path: string): Promise<Route> {
    return new Promise((resolve, reject) => {
      // iteratively check for given path
      function findRoute(routes: Route[], path: string): Route | null {
        const prefix = (route: Route, path: string) =>
            path.startsWith(route.path),
          full = (route: Route, path: string) => path === route.path;

        let route: Route | null = null;

        // check each route against the new path
        for (let r of routes) {
          // select matcher function in order of custom, fullPath and prefixPath
          const matcher = r.matcher || r.pathMatch === 'full' ? full : prefix;

          // not a match, continue to next route
          if (!matcher(r, path)) continue;

          // route matches, check children or return result if no children
          const slice = path.slice(r.path.length);
          const child = r.children && findRoute(r.children, slice);
          route = child || r;
        }

        return route;
      }

      // search for match in router routes
      const rt = findRoute(this.routes, path);

      // settle the promise
      rt ? resolve(rt) : reject();
    });
  }

  /** Load the layout for the given route. */
  async _loadLayout(route: Route): Promise<Route['layout']> {
    return new Promise(resolve => {
      if (typeof route?.layout === 'object') resolve(route.layout);
      fetch(route?.layout)
        .then(l => l.json())
        .then(l => (route.layout = l))
        .then(resolve);
    });
  }

  /** Get the route from the path and render the layout. */
  async _render(path: string = this.hashPath) {
    // parse route from path
    const route = await this._parsePath(path);

    // load layout
    const layout = await this._loadLayout(route);

    // activate prwe-navigation hooks
    if (this.hooks.has('willNavigate')) this.hooks.get('willNavigate')();

    // display new layout
    new Component({ blueprint: layout, parent: this.outlet });

    if (this.hooks.has('didNavigate')) this.hooks.get('didNavigate')();

    // update router history
    const count = this.history.push(this.path);
    while (count > this.props.get('maxHistory')) this.history.shift();
    this.path = path;
  }
}
