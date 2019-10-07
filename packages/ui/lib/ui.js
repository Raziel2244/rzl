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
 	 * @param {Map|iterable[]} [src] The Map or Array of iterables to build from.
 	 */
	constructor(src) {

		// Start with a standard Map object
		super(src)

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
	 *
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
	 * @param {iterable} [props]
	 * [See props]{@link module:@rzl/ui.Component#props}
	 */
	constructor(props) {

		/**
		 * The map of properties for this component.
		 * @summary Component props.
		 * @type {ComponentPropertyMap}
		 * @private
		 */
		this._props = new ComponentPropertyMap(props);

		/**
		 * The current state of this component.
		 * @summary Component state.
		 * @type {Object}
		 */
		this.state = {};

	}

}

/*

ComponentFactory Class
	constructor takes string for default type and iterable for default props
		validate props
		set factory defaults

	createComponent static method takes string representing component class and object for props
		validate props
		overload factory props with new props
		new component with final props

*/
