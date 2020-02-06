/**
 * @file Contains routing classes.
 * @author Elliot Thomas
 */
if (typeof rzl === "undefined") throw new Error("Requires rzl/core");

/** Router class. */
rzl.Router = class Router {
  /**
   * Construct a Router.
   * @param {Object} [args={}] - Construction arguments.
   * @param {Map|Iterable[]} [args.hooks]
   * [See props]{@link rzl.Router#props}
   * @param {Map|Iterable[]} [args.routes]
   * [See props]{@link rzl.Router#props}
   * @param {String} [args.name=""]
   * [See props]{@link rzl.Router#props}
   * @param {Element} [args.outlet=document.body]
   * [See props]{@link rzl.Router#props}
   * @param {Boolean} [args.useHash=true]
   * [See props]{@link rzl.Router#props}
   * @param {Boolean} [args.maxHistory=10]
   * [See props]{@link rzl.Router#props}
   */
  constructor(args = {}) {
    /**
     * The properties of this Router.
     * @summary Router props.
     * @member {Map} rzl.Router#props
     * @private
     */
    this.props = new Map([
      ["hooks", new Map(args.hooks || [])],
      ["routes", args.routes || []],
      ["name", args.name || ""],
      ["outlet", args.outlet || document.body],
      ["useHash", args.useHash || true],
      ["maxHistory", args.maxHistory || 10]
    ]);

    /**
     * The current state of this Router.
     * @summary Router state.
     * @member {Map} rzl.Router#state
     */
    this.state = new Map([
      ["history", []],
      ["path", this.getHashPath()]
    ]);

    // Setup hash routing
    if (this.props.get("useHash")) window.onhashchange = () => this._render();

    // navigate to current route
    this.navigate(this.getHashPath());
    console.log("construct", this);
  }

  /**
   * The hooks activated by this Router.
   * @summary Router hooks.
   * @type {Map|Iterable[]}
   */
  get hooks() {
    return this.props.get("hooks");
  }
  set hooks(hooks) {
    return this.props.set("hooks", hooks).get("hooks");
  }

  /**
   * The routes handled by this Router.
   * @summary Router routes.
   * @type {Array}
   */
  get routes() {
    return this.props.get("routes");
  }
  set routes(routes) {
    return this.props.set("routes", routes).get("routes");
  }

  /**
   * The name for this Router.
   * @summary Router name.
   * @type {String}
   */
  get name() {
    return this.props.get("name");
  }
  set name(name) {
    return this.props.set("name", name).get("name");
  }

  /**
   * The DOM element this Router outputs to.
   * @summary Router outlet.
   * @type {HTMLElement}
   */
  get outlet() {
    return this.props.get("outlet");
  }
  set outlet(outlet) {
    return this.props.set("outlet", outlet).get("outlet");
  }

  /**
   * Current path of this router.
   * @summary Current path.
   * @type {String}
   */
  get path() {
    return this.state.get("path");
  }
  set path(path) {
    return this.state.set("path", path).get("path");
  }

  /**
   * History of navigation in this Router.
   * @summary Router history.
   * @type {Array}
   */
  get history() {
    return this.state.get("history");
  }
  set history(history) {
    return this.state.set("history", history).get("history");
  }

  /**
   * Get the current hash and tidy it up, returning the path.
   * @summary Get the hash path.
   */
  getHashPath() {
    return location.hash.replace(/^#?\/?/, "");
  }

  /**
   * Format the given path and set the hash.
   * @summary Set the hash path.
   * @param {String} path The path to set.
   */
  setHashPath(path) {
    return (location.hash = path.replace(/^#?\/?/, "#/"));
  }

  /**
   * Validate the given route and update the hash to trigger render.
   * @summary Navigate to route.
   * @param {String} path The path to navigate to.
   */
  navigate(path = "") {
    this.props.get("useHash") ? this.setHashPath(path) : this._render(path);
    return true;
  }

  /**
   * Parse the given path and return the matching route.
   * @summary Parse path and return matching route.
   * @param {String} path The path to parse.
   */
  async _parsePath(path) {
    return new Promise((resolve, reject) => {
      // iteratively check for given path
      function findRoute(routes, path) {
        const prefix = (route, path) => path.startsWith(route.path),
          full = (route, path) => path === route.path;

        // check each route against the new path
        for (let r of routes) {
          // select matcher function in order of custom, fullPath and prefixPath
          const matcher = r.matcher || r.pathMatch === "full" ? full : prefix;

          // not a match, continue to next route
          if (!matcher(r, path)) continue;

          // route matches, check children or return result if no children
          const slice = path.slice(r.path.length);
          const child = r.children && findRoute(r.children, slice);
          return child || r;
        }
      }

      // search for match in router routes
      const rt = findRoute(this.routes, path);

      // settle the promise
      rt ? resolve(rt) : reject();
    });
  }

  /**
   * Load the layout for the given route, either locally or over http.
   * @summary Load the route layout.
   * @param {Object} route The route to use.
   */
  async _loadLayout(route = {}) {
    return new Promise(resolve => {
      if (typeof route.layout === "object") resolve(route.layout);
      fetch(route.layout)
        .then(l => l.json())
        .then(l => (route.layout = l))
        .then(resolve);
    });
  }

  /**
   * Get the route from the path and render the layout in the router outlet.
   * @summary Render route layout.
   */
  async _render(path = this.getHashPath()) {
    // parse route from path
    const route = await this._parsePath(path);

    // load layout
    const layout = await this._loadLayout(route);

    // activate prwe-navigation hooks
    if (this.hooks.has("willNavigate")) this.hooks.get("willNavigate")();

    // display new layout
    new rzl.UI(layout, { pnode: this.outlet });

    if (this.hooks.has("didNavigate")) this.hooks.get("didNavigate")();

    // update router history
    const count = this.history.push(this.path);
    while (count > this.props.get("maxHistory")) this.history.shift();
    this.path = path;
  }
};
