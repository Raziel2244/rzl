/**
 * @file Contains core functions.
 * @author Elliot Thomas
 */

/** @namespace */
var rzl = {
  // ======================================================================
  // Section: Elements

  /**
   * Create a new element and add it to the DOM.
   * @summary Add Element.
   * @param {string} tag - The tagname for the new element
   * @param {Element} pnode - The parent element
   * @param {Object} [args] - The arguments for the new element
   * @param {string} [args.class=] - The classname for the new element
   * @param {string} [args.content=] - The content for the new element
   * @param {Object} [args.events] - The events for the new element
   * @param {string} [args.id=] - The id for the new element
   * @param {Object} [args.props] - The props for the new element
   * @param {Object|string} [args.style] - The style for the new element
   * @returns {Element|boolean} The new element or false for error
   */
  addElement: function(tag, pnode, args) {
    try {
      if (typeof tag === "undefined") return false;
      var el = document.createElement(tag);
      pnode.appendChild(el);

      el.id = args.id || "";
      el.className = args.class || "";
      el.innerHTML = args.content || "";

      if (args.style) this.setStyle(el, args.style);
      if (args.events) {
        for (var e in args.events) rzl.eventAdd(el, e, args.events[e]);
      }
      if (args.props) {
        Object.keys(args.props).forEach(p => (el[p] = args.props[p]));
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return el;
  },

  /**
   * Create a new div and add it to the DOM.
   * @summary Add Element.
   * @param {Element} pnode - The parent element
   * @param {Object} [args] - The arguments for the new element
   * @param {string} [args.class=] - The classname for the new element
   * @param {string} [args.content=] - The content for the new element
   * @param {Object} [args.events] - The events for the new element
   * @param {string} [args.id=] - The id for the new element
   * @param {Object} [args.props] - The props for the new element
   * @param {Object|string} [args.style] - The style for the new element
   * @returns {Element|boolean} The new element or false for error
   */
  addDiv: function(pnode, args) {
    return rzl.addElement("div", pnode, args);
  },

  /**
   * Finds the first matching child of the given parent element.
   * @summary Find child.
   * @param {Element} pnode - The parent element to search from
   * @param {string} tag - The tagname to search for
   * @param {string} [id] - The id to search for
   * @returns {Element|boolean} The matching child or false for no match
   */
  findChild: function(pnode, tag, id) {
    if (!pnode) return false;
    try {
      var children = pnode.getElementsByTagName(tag);
    } catch (e) {
      console.log("Cannot find child", pnode);
      console.log(e);
      return false;
    }
    if (!children) return false;
    for (idx = 0; idx < children.length; idx++) {
      child = children[idx];
      if (child && child.id && child.id == id) return child;
    }
    return false;
  },

  /**
   * Gather fields from target form into one object keyed by id.
   * @summary Gather form fields.
   * @param {Form} form - The target form.
   * @returns {?Object} Fields keyed by id
   */
  getFormFields: function(form) {
    if (!form || !form[0]) return; // no form or fields
    var fields = {};
    var i = 0; // prepare an object and counter

    while (form[i]) {
      if (form[i].tagName == "BUTTON") {
        i++;
        continue;
      } // ignore buttons
      else {
        fields[form[i].id] = form[i];
        i++;
      }
    }

    return fields;
  },

  /**
   * Set the options of a select element from a provided object.
   * @summary Set select options.
   * @param {Element} el - The target select element
   * @param {Object} opts - The options to set
   * @param {Object|string} [style=] - The style to set for each option
   */
  setSelOpts: function(el, opts, style = "") {
    if (el.firstChild) this.destroyChildren(el);
    for (let o in opts) {
      let ob = { style: style, content: opts[o] };
      let opt = rzl.addElement("option", el, ob);
      opt.value = opts[o];
      this.setStyle(opt, style);
    }
  },

  /**
   * Set style of element from string or array/object.
   * @summary Set element style.
   * @param {Element} el - The target element
   * @param {Object|string} style - The style to set
   */
  setStyle: function(el, style) {
    if (typeof style === "string") {
      el.style.cssText += style;
    } else if (typeof style === "object") {
      Object.keys(style).forEach(key => (el.style[key] = style[key]));
    }
  },

  /**
   * Destroy all child div elements of given parent element.
   * @summary Destroy child divs.
   * @param {Element} pnode - Target element
   */
  destroyChildDivs: function(pnode) {
    this.destroyChildren(pnode, "div");
  },

  /**
   * Destroy matching child elements of given parent element,
   * if no tag is given it destroys all.
   * @summary Destroy child elements.
   * @param {Element} pnode - The target element
   * @param {string} [tag] - The tag to match
   */
  destroyChildren: function(pnode, tag) {
    if (typeof pnode === "undefined" || !pnode.firstChild) return;
    try {
      if (!tag) while (pnode.firstChild) pnode.removeChild(pnode.firstChild);
      else {
        for (var c in pnode.children) {
          var child = pnode.children[c];
          if (child.firstChild) this.destroyChildren(child);
          pnode.removeChild(child);
        }
      }
    } catch (e) {
      console.error(e);
      return;
    }
  },

  // destroy a given element, parent defaults to document body
  /**
   * Destroy given element with given parent element.
   * @summary Destroy target element.
   * @param {Element} el - The target element
   * @param {Element} [pnode=document.body] - The parent element
   */
  destroyElement: function(el, pnode = document.body) {
    if (!el) return;
    try {
      pnode.removeChild(el);
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  /**
   * Destroy the first matching child element of the given parent element.
   * @summary Destroy child element.
   * @param {Element} pnode - The parent element
   * @param {string} tag - The tag to match
   * @param {string} [id] - The id to match
   * @returns {boolean} True on success or false on failure
   */
  destroyChild: function(pnode, tag, id) {
    try {
      var el = this.findChild(pnode, tag, id);
      if (!el) return false;
      pnode.removeChild(el);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  // ======================================================================
  // Section: Function handling

  /**
   * Parse function from string.
   * @summary Parse function.
   * @param {Function|string} src - The source string
   */
  parseFunc: function(src) {
    if (typeof src === "undefined" || typeof src == "function") return false;
    return eval(src);
  },

  /**
   * Wrapper for apply function.
   * @param {Function|string} fn - The target function
   * @param {*} that - Target context
   * @param {Object} args - Arguments for the function
   */
  applyFunc: function(fn, that = this, args) {
    if (typeof fn === "undefined") return false;
    var pfn = this.parseFunc(fn);
    if (typeof pfn === "undefined") return false;
    try {
      pfn.apply(that, args);
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  // ======================================================================
  // Section: Event handling

  /**
   * Add event to the element matching the given id.
   * @summary Add event to element with id.
   * @param {string} eid - The target id
   * @param {string} ev - The event name
   * @param {Function|string} fn - The event callback
   * @param {Object} arg - The callback arguments
   */
  eventAddById: function(eid, ev, fn, arg) {
    rzl.eventAdd($(eid), ev, fn, arg);
  },

  /**
   * Add event callback to the given element.
   * @summary Add event.
   * @param {Element} targ - The target element
   * @param {string} ev - The event name
   * @param {Function|string} fn - The event callback
   * @param {boolean} cap - Capture the event?
   * @returns {boolean} True on succes or false on failure
   */
  eventAdd: function(targ, ev, fn, cap) {
    if (fn === "ignore") fn = this.eventIgnore;
    else if (fn === "prevent") fn = this.eventPrevent;
    else fn = this.parseFunc(fn);

    if (!targ) return false;
    try {
      if (targ.attachEvent) {
        targ["e" + ev + fn] = fn;
        targ[ev + fn] = function() {
          return targ["e" + ev + fn](window.event);
        };
        return targ.attachEvent("on" + ev, targ[ev + fn]);
      } else {
        return targ.addEventListener(ev, fn, cap == true ? true : false);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  /**
   * Remove event callback from the given element.
   * @summary Remove event.
   * @param {Element} targ - The target element
   * @param {string} ev - The event name
   * @param {Function|string} fn - The callback function
   */
  eventDel: function(targ, ev, fn) {
    targ.removeEventListener(ev, fn);
  },

  eventIgnore: function(ev) {
    stopprop(ev);
  },
  /**
   * Stop event from propagating further.
   * @summary Prevent event.
   * @param {string} ev - The event name
   */
  eventPrevent: function(ev) {
    ev.preventDefault();
  },

  // ======================================================================
  // Section: Arrays

  /**
   * Get the largest number in the given array.
   * @summary Get largest of array.
   * @param {Array} [arr=[]] - The array to search
   * @returns {number} The largest number
   */
  largestOf: function(arr = []) {
    if (typeof arr !== "object") return false;
    let largest = 0;
    for (let i in arr) {
      if (largest < arr[i]) largest = arr[i];
    }
    return largest;
  },

  /**
   * Returns a random item from the given array.
   * @summary Get random array item.
   * @param {Array} arr - Array to pick from
   * @returns {*} Selected item
   */
  randomArrayItem: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // ======================================================================
  // Helper functions

  // See if variable is undefined or not
  /**
   * Test to see if the given variable is undefined.
   * @summary Test undefined.
   * @param {*} x - The variable to test
   * @returns {boolean} True if undefined or false if defined
   */
  undef: x => (typeof x === "undefined" ? true : false),

  /**
   * Capitalise the first letter of a given string.
   * @summary Capitalise first letter.
   * @param {string} str - The string to capitalise
   * @returns {string} The capitalised string
   */
  capitalise: str => str.charAt(0).toUpperCase() + str.slice(1),

  /**
   * Generate a random number from 1 to n (inclusive).
   * @summary Get random 1 to n.
   * @param {number} n - The random number cap
   * @returns {number} The rolled number
   */
  rng1to: n => Math.floor(Math.random() * n) + 1,

  /**
   * Generate a random number from 0 to n (inclusive).
   * @summary Get random 0 to n.
   * @param {number} n - The random number cap
   * @returns {number} The rolled number
   */
  rng0to: n => Math.floor(Math.random() * (n + 1)),

  // ======================================================================
  // Maybe remove?

  // build a list of options using the keys from a given object
  // can be fed into setSelOpts
  getSelectOptionsFromKeysInObject: function(ob) {
    var opts = {};
    Object.keys(ob).forEach(k => {
      opts[k] = capitalise(k);
    });
    return opts;
  },

  getSelectOptionsFromKeyInObjectsInArray: function(arr, key) {
    var opts = {};
    arr.forEach((ob, i) => {
      opts[i] = ob[key];
    });
    return opts;
  },

  // returns array of values for matching object[key] in arr1
  arrayFromKeyInObjectsInArray: function(arr1, key) {
    var arr2 = [];
    arr1.forEach(ob => {
      arr2.push(ob[key]);
    });
    return arr2;
  },

  // returns array of values for matching object[key] in arr1
  // each item in arr2 is repeated object[count] times
  arrayFromKeyForCountInObjectsInArray: function(arr1, key, count) {
    var arr2 = [];
    arr1.forEach(ob => {
      for (var i = ob[count]; i > 0; i--) arr2.push(ob[key]);
    });
    return arr2;
  },

  // returns array of values for matching object[key] in arr1
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayFromKeyForCountInObjectsInArrayFilter: function(
    arr1,
    key,
    count,
    filter
  ) {
    var arr2 = [];
    arr1.forEach(ob => {
      if (ob[filter.key] === filter.value) {
        for (var i = ob[count]; i > 0; i--) arr2.push(ob[key]);
      }
    });
    return arr2;
  },

  // returns array of matching arr1 indexes
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayForCountInObjectsInArray: function(arr1, count) {
    var arr2 = [];
    arr1.forEach((ob, index) => {
      for (var i = ob[count]; i > 0; i--) arr2.push(index);
    });
    return arr2;
  },

  // returns array of matching arr1 indexes
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayForCountInObjectsInArrayFilter: function(arr1, count, filter) {
    var arr2 = [];
    arr1.forEach((ob, index) => {
      if (ob[filter.key] === filter.value) {
        for (var i = ob[count]; i > 0; i--) arr2.push(index);
      }
    });
    return arr2;
  }
};
