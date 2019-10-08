/**
 * An Array or other iterable object whose elements are key-value pairs
 * (arrays with two elements, e.g. [[ 1, 'one' ], [ 2, 'two' ]]).
 * @summary Array-like object containing key-value pairs.
 * @typedef {Object} iterable
 */

/**
 * Rzl UI module.
 * @module @rzl/ui
 * @see module:@rzl/core
 */

// import * as core from '../../core/lib/core.js';

/**
 * RzlUI component property class.
 * @summary RzlUI Component Props.
 * @extends Map
 */
export class ComponentPropertyMap extends Map {

	/**
 	 * Constructs a validated Map of properties for a RzlUI Component from
 	 * the provided Map or Array of iterable objects.
 	 * @summary ComponentPropertyMap constructor.
 	 * @param {Map|iterable[]} [arr=[]] The Map or Array of iterables to build from.
 	 */
	constructor(arr = []) {

		// Start with a standard Map object
		super(arr)

		// Clean up invalid keys
		for (const key of this.keys()) {
			if (!this.validKeys.includes(key)) this.delete(key);
		}

	}

	/**
	 * Determines whether or not the provided object is a valid instance of this
	 * class or not.
	 * @summary Check if object is an instance of this class.
	 * @param {Object} obj The object to check
	 * @returns {Boolean} The outcome of the test
	 */
	static is(obj) {
		return obj instanceof this;
	}

	/**
	 * Get an array of valid keys for this ComponentPropertyMap.
	 * @summary List valid props keys.
	 * @returns {Array} The valid keys
	 */
	get validKeys() {
		return ["blueprint","name"]
	}

}

/**
 * RzlUI generic component class.
 * @summary RzlUI Component.
 */
export class Component {

	/**
	 * Constructs a generic RzlUI component with the provided properties.
	 * @summary Component class constructor.
	 * @param {Map|iterable[]} [props=[]]
	 * [See props]{@link module:@rzl/ui.Component#props}
	 */
	constructor(props = []) {

		/**
		 * A local reference to the matching ComponentPropertyMap class for use in
		 * property validation inside class methods.
		 * @summary Matching PropertyMap class.
		 */
		this._propClass = ComponentPropertyMap;

		/**
		 * The map of properties for this component.
		 * @summary Component props.
		 * @type {ComponentPropertyMap}
		 * @private
		 */
		this._props = new this._propClass(props);

		/**
		 * The current state of this component.
		 * @summary Component state.
		 * @type {Object}
		 */
		this.state = {};

	}

}

/**
 * Factory class for mass construction of RzlUI components.
 * @summary RzlUI component factory.
 */
export class ComponentFactory {

	/**
	 * Constructs a factory for building RzlUI components, usually with common
	 * properties which can be configured here.
	 * @summary Component factory constructor.
	 * @param {Map|iterable[]} [props=[]]
	 * [See defaultProps]{@link module:@rzl/ui.ComponentFactory#defaultProps}
	 * @param {string} [type=""]
	 * [See defaultType]{@link module:@rzl/ui.ComponentFactory#defaultType}
	 */
	constructor(props = [], type = "") {

		/**
		 * The iterable object containing the default properties to use for any
		 * components built by this component factory. Additional properties may be
		 * specified in the build parameters allowing common base properties to be
		 * configured here and for specific ones to be applied for each build call.
		 * [See props]{@link module:@rzl/ui.Component#props}
		 * @summary Default properties for built components.
		 * @type {iterable}
		 * @private
		 */
		this._defaultProps = [...props];

		/**
		 * The type of component for this factory to build by default. This is used
		 * if no type is specified when build is called. If nothing is chosen here
		 * the default will be the [component]{@link module:@rzl/ui.Component} class.
		 * @summary Default type for built components.
		 * @type {string}
		 * @private
		 */
		this._defaultType = (type && typeof type === "string") ? type : "generic";

	}

	/**
	 * Get the component class from the given string. In the case that no match
	 * is found it will call itself again once more with the default factory
	 * component type.
	 * @summary Get the component class
	 * @param {string} type The component type
	 * @returns {?Component} The component class or null
	 */
	static getComponentClass(type) {
		let componentClass = null;
		switch (type) {
			case "generic": componentClass = Component;
		}
		return componentClass;
	}

	/**
	 * Build a component using factory defaults and parameters if provided. Build
	 * parameters take priority over factory defaults but the properties will be
	 * built first from defaults and then overloaded by the parameter properties.
	 * @summary Build a component.
	 * @param {Map|iterable[]} [props=[]] The Map or Array of iterable objects to
	 * apply over the factory default props
	 * [See defaultProps]{@link module:@rzl/ui.ComponentFactory#defaultProps}
	 * @param {string} [type=""] The component type to build instead of default
	 * [See defaultType]{@link module:@rzl/ui.ComponentFactory#defaultType}
	 * @returns {Component} The built component
	 */
	build(props = [], type = "") {

		// Get the component class matching type
		let componentClass = ComponentFactory.getComponentClass(type);

		// If that failed then get the component class for the factory default
		if (!componentClass) {
			componentClass = ComponentFactory.getComponentClass(this._defaultType);
		}

		// If that still failed then get the generic component class
		if (!componentClass) componentClass = Component;

		return new componentClass([...this._defaultProps,...props]);

	}

}
