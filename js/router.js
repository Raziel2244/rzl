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
   * @param {String} [args.name] - Name to use for router.
   * @param {Element} [args.outlet]
   * Element in which to display routed output.
   * @param {Map|Iterable[]} [args.routes]
   * Array of routes to add to the router.
   */
  constructor(args = {}) {
    /**
     * The properties of this Router.
     * @summary Router props.
     * @member {Map} rzl.Router#props
     * @default Map()
     * @private
     */
    this.props = new Map([
      ["callbacks", new Map(args.callbacks)],
      ["layouts", new Map(args.layouts)],
      ["name", args.name || ""],
      ["outlet", args.outlet || document.body],
      ["routes", new Map(args.routes)]
    ]);

    if (args.layoutSrc) this.props.set("layoutSrc", args.layoutSrc);
    if (args.layoutURL) this.props.set("layoutURL", args.layoutURL);
    if (args.layoutVar) this.props.set("layoutVar", args.layoutVar);

    const path = location.hash.slice(1);
    const pathArr = path.split("/").slice(1);

    this.state = new Map([
      ["activeRoute", ""],
      ["history", []],
      ["path", path],
      ["pathArr", pathArr]
    ]);

    window.onhashchange = () => this.hashChanged();
  }

  /**
   * The active route of this Router.
   * @summary Active route.
   * @type {String}
   */
  get activeRoute() {
    return this.state.get("activeRoute");
  }
  set activeRoute(route) {
    if (!this.routes.has(route))
      throw new Error(`Route ${route} does not exist for this router`);
    this.state.set("activeRoute", route);
    return this.activeRoute;
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
    if (!Array.isArray(history)) throw new TypeError("history is not an Array");
    this.history.set(history);
    return true;
  }

  /**
   * The name to use to identify this Router.
   * @summary Router name.
   * @type {String}
   */
  get name() {
    return this.props.get("name");
  }
  set name(name) {
    if (typeof name !== "string")
      throw new Error("Router name must be a valid string");
    this.props.set("name", name);
    return this.name;
  }

  /**
   * The DOM element this Router outputs to.
   * @summary Router outlet.
   * @type {String}
   */
  get outlet() {
    return this.props.get("outlet");
  }
  set outlet(outlet) {
    if (!outlet instanceof HTMLElement)
      throw new TypeError("outlet is not an HTMLElement");
    this.props.set("outlet", outlet);
  }

  /**
   * The routes handled by this Router.
   * @summary Router routes.
   * @type {Map|Iterable[]}
   */
  get routes() {
    return this.props.get("routes");
  }
  set routes(routes) {
    // routes should be an iterable object
    if (!rzl.isIterable(routes)) throw new TypeError("routes is not iterable");

    // check each route
    for (const route of routes) {
      // each route should be an array
      if (!Array.isArray(route)) throw new TypeError("route is not an array");

      // should have two items
      if (route.length !== 2)
        throw new RangeError("route should contain 2 items");

      // destructure to get routeName and layoutName
      const [routeName, layoutName] = route;

      // both should be strings
      if (!rzl.isString(routeName))
        throw new TypeError("routeName is not a string");
      if (!rzl.isString(layoutName))
        throw new TypeError("layoutName is not a string");

      // cannot be empty string
      if (!layoutName.length)
        throw new TypeError("layoutName is an empty string");
    }

    // finally set the routes
    this.props.set("routes", new Map([...routes]));
  }

  // parse the layout name from the hash
  readPath() {
    return (this.activeRoute = location.hash.split("/")[1]);
  }

  navigate(routeName) {
    // validate route
    if (!this.routes.has(routeName))
      throw new ReferenceError(`Route ${routeName} not found`);

    // update hash
  }

  async loadLayout(layoutName) {
    // check router cache
    if (this.props.get("layouts").has(layoutName))
      return this.props.get("layouts").get(layoutName);

    // handle acceptable cases
    switch (this.props.get("layoutSrc")) {
      case "JSON":
        if (!this.props.get("layoutURL"))
          throw new ReferenceError("layoutURL is not set");
        return await fetch(`${this.props.get("layoutURL")}/${layoutName}.json`)
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              return response;
            } else {
              var error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          })
          .then(response => response.json())
          .then(json => {
            this.props.get("layouts").set(layoutName, json);
            return json;
          })
          .catch(error => {
            console.error(`Failed to fetch layout: ${layoutName}`);
            throw error;
          });
        break;
      case "local":
        if (!this.props.get("layoutVar"))
          throw new ReferenceError("layoutVar is not set");
      default:
        throw new ReferenceError("no layout found");
    }
  }

  /**
   * Load the layout for the given route and display it in the Router outlet.
   * @summary Update outlet.
   */
  async render() {
    // validate route
    if (!this.routes.has(this.activeRoute))
      throw new ReferenceError(`Route ${this.activeRoute} not found`);

    if (this.props.get("callbacks").has("routerWillNavigate"))
      this.props.get("callbacks").get("routerWillNavigate")();

    // load layout
    const layout = await this.loadLayout(this.routes.get(this.activeRoute));

    // display new layout
    new rzl.UI(layout, { pnode: this.outlet });

    // push route to history
    this.history.push(this.activeRoute);

    if (this.props.get("callbacks").has("routerDidNavigate"))
      this.props.get("callbacks").get("routerDidNavigate")();
  }

  hashChanged() {
    console.log("hashChanged");
    try {
      this.history.push(this.activeRoute);
      this.readPath();
      this.render();
    } catch (err) {
      alert(err.message);
    }
  }
};
