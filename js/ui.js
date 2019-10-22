/**
 * @file Contains UI classes.
 * @author Elliot Thomas
 */
if (typeof rzl === "undefined") throw new Error("Requires rzl/core")

/** Generic UI component class. */
rzl.UIComponent = class {

  /**
   * Construct a generic UI component.
   * @param {Element|string} [pnode=null] - Parent node for this UI component.
   * @param {Object} [args={}] - Arguments to use for construction of this UI component.
   * @param {Object} [args.blueprint] - See {@link rzl.UIComponent#blueprint}
   * @param {string} [args.name] - See {@link rzl.UIComponent#name}
   */
  constructor(pnode=null,args={}) {

	/**
	 * Blueprint to use for the construction of this UI component.
	 * @summary Component blueprint.
	 * @member {Object} rzl.UIComponent#_blueprint
	 * @default args.blueprint || null
	 * @private
	 */
    const bp = this._blueprint = (args.blueprint || null);

    /**
     * The parent node for this UI component.
          * @summary Component parent.
          * @member {Element|string} rzl.UIComponent#_pnode
     * @default pnode || this._blueprint.meta.pnode || document.body
     * @private
     */
    this._pnode = pnode || ((bp||{}).meta||{}).pnode || document.body;

    /**
     * The name of this UI component.
     * @summary Component name.
     * @member {string} rzl.UIComponent#_name
     * @default args.name || this._blueprint.meta.name || ;
     * @private
     */
    this._name = args.name || ((bp||{}).meta||{}).name || "";
  }

  /**
   * The blueprint object used for the construction of this UI component.
   * @summary Component blueprint.
   * @type {Object}
   */
  get blueprint() { return this._blueprint }
  set blueprint(blueprint) {
    this._blueprint = blueprint;
    this._content = false;
    this.build();
  }

  /**
   * The name used for the construction of this UI component.
   * @summary Component name.
   * @type {string}
   */
  get name() { return this._name }

  /**
   * The parent node used for the construction of this UI component.
   * @summary Component parent.
   * @type {Element|string}
   */
  get pnode() { return this._pnode }
}


// ========================================================================
// UI components

/**
 * Modal class.
 * @extends rzl.UIComponent
 */
rzl.Modal = class extends rzl.UIComponent {

  /**
   * Construct and then display a Modal.
   * @param {Element|string} [pnode=null] - Parent node for this Modal.
   * @param {Object} [args={}] - Arguments to use for construction of this Modal.
   * @param {Object} [args.blueprint] - See {@link rzl.Modal#blueprint}
   * @param {string} [args.content] - See {@link rzl.Modal#content}
   * @param {string} [args.name] - See {@link rzl.Modal#name}
   */
  constructor(pnode=null,args={}) {
    super(pnode,args);

	/**
	 * The content to use for the construction of this Modal if no blueprint is provided.
	 * @summary Modal content.
	 * @member {string} rzl.Modal#_content
	 * @default args.content || "No content or blueprint provided"
	 * @private
	 */
    this._content = args.content || "No content or blueprint provided";

    this.build();
  }

  /**
   * Build the Modal using blueprint or content and add it to the DOM.
   * @summary Build and show the Modal.
   */
  build() {
    if (this.root && this.pnode) rzl.destroyElement(this.root,this.pnode);

    /**
     * DOM element for the Modal root, obscures page underneath to hightlight the Modal box.
     * @summary Modal root.
     * @member {Element} rzl.Modal#_root
     * @private
     */
    this._root = rzl.addDiv(this.pnode, {
      class : "modal-root rzl-hidden",
      id    : `modal-${this.name}-root`
    });

    /**
     * DOM element for the Modal box, contains the final output.
     * @summary Modal box.
     * @member {Element} rzl.Modal#_box
     * @private
     */
    this._box = rzl.addDiv(this.root, {
      class : "modal-box",
      id    : `modal-${this.name}-box`
    });

    /**
     * DOM element for the Modal box header, contains close button.
     * @summary Modal box header.
     * @member {Element} rzl.Modal#_header
     * @todo Implement custom header.
     * @private
     */
    this._header = rzl.addDiv(this.box, {
      class : "modal-header",
      id    : `modal-${this.name}-header`
    });

    /**
     * DOM element for the Modal close button, allows the user to close the Modal.
     * @summary Modal close button.
     * @member {Element} rzl.Modal#_btnClose
     * @private
     */
    this._btnClose = rzl.addDiv(this.header,{
      class   : "modal-btn-close",
      content : '<span class="iconify icon:ion:close"></span>'
    });
    this._btnClose.addEventListener("click",this.destroy.bind(this),1);

    /**
     * DOM element for the Modal box body, contains output from blueprint or content.
     * @summary Modal box body.
     * @member {Element} rzl.Modal#_body
     * @private
     */
    this._body = rzl.addDiv(this.box, {
      class   : "modal-body",
      id      : `modal-${this.name}-body`,
    });

    /**
     * DOM element for the Modal box footer, contains additional buttons at the foot of the Modal box.
     * @summary Modal box footer.
     * @member {Element} rzl.Modal#_footer
     * @todo Implement custom footer.
     * @private
     */
    this._footer = rzl.addDiv(this.box, {
      class   : "modal-footer",
      id      : `modal-${this.name}-footer`,
    });

    if (this.blueprint) new rzl.UI(this.blueprint,{pnode:this.body})
    else this.body.textContent = this.content;

    this.show()
  }

  /**
   * Hide the Modal and remove it from the DOM.
   * @summary Destroy the Modal.
   */
  destroy() {
    console.log("destroy")
    rzl.destroyElement(this.root,this.pnode);
  }

  /**
   * Remove the rzl-hidden css class from the Modal root.
   * @summary Unhide the Modal.
   */
  show() { this.root.classList.remove("rzl-hidden") }

  /**
   * Add the rzl-hidden css class to the Modal root.
   * @summary Hide the Modal.
   */
  hide() { this.root.classList.add("rzl-hidden") }

  /**
   * The content to use for the construction of this Modal, if no blueprint is provided.
   * @summary Modal content.
   * @type {string}
   */
  get content() { return this._content }
  set content(content) {
    this._content = content;
    this._blueprint = false;
    this.build();
  }

  /**
   * DOM element for the Modal root, obscures page underneath to hightlight the Modal box.
   * @summary Modal box.
   * @type {Element}
   */
  get root() { return this._root }

  /**
   * DOM element for the Modal box, contains the final output.
   * @summary Modal box.
   * @type {Element}
   */
  get box() { return this._box }

  /**
   * DOM element for the Modal box header, contains close button.
   * @summary Modal box header.
   * @type {Element}
   */
  get header() { return this._header }

  /**
   * DOM element for the Modal box body, contains output from blueprint or content.
   * @summary Modal box body.
   * @type {Element}
   */
  get body() { return this._body }

  /**
   * DOM element for the Modal box footer, contains additional buttons at the foot of the Modal box.
   * @summary Modal box footer.
   * @type {Element}
   */
  get footer() { return this._footer }

}


// ========================================================================
// UI builder

/** UI class */
rzl.UI = class {

  /**
   * Construct a complete UI from definition.
   * @param {Object} def - See {@link rzl.UI#def}
   * @param {Object} [args={}] - See {@link rzl.UI#args}
   * @param {string} [args.meta] - See {@link rzl.UI#meta}
   */
  constructor(def,args) {
    if (typeof def !== "object") return;

    /**
   	 * The definition to use for the construction of this UI.
   	 * @summary UI definition.
   	 * @member {Object} rzl.UI#def
   	 */
    this.def = def;

     /**
      * The arguments to use for the construction of this UI.
      * @summary Arguments.
      * @member {Object} rzl.UI#args
      * @default args || {}
      */
    this.args = args || {};

    this.init();
  }

  /**
   * Initialise the UI and add it to the DOM. Also setup state
   * and fire various construction callbacks, if set.
   * @summary Initialise UI.
   */
  init() {
    let box = {}, domain = "", name = "";
    box = document.getElementById("rzlBox") || document.body;

    /**
     * The metadata to use for the construction of this UI.
     * @summary Metadata.
     * @member {Object} rzl.UI#meta
     * @default this.args.meta || this.def.meta || {}
     */
    this.meta = this.args.meta || this.def.meta || {};

    domain = this.args.domain || this.meta.domain || "rzl";
    name = this.args.name || this.meta.name || "ui-"+window[domain].state.length;

    /**
     * The parent element to use for the construction of this UI.
     * @summary Parent element.
     * @member {Element|string} rzl.UI#pnode
     * @default this.args.pnode || this.def.pnode || "rzlBox" || document.body
     */
    this.pnode = this.args.pnode || this.meta.pnode || box;
    if (typeof this.pnode === "string") this.pnode = document.getElementById(this.pnode);
    if (this.pnode.firstChild) rzl.destroyChildren(this.pnode);

    // set state
    if ((window[domain]||{}).state) window[domain]["state"][name] = this;

    // fire loaded callbacks
    rzl.applyFunc(this.args.loadedCB,this,[this]);
    rzl.applyFunc(this.meta.loadedCB,this,[this]);

    /**
     * The root element to use for the construction of this UI.
     * @summary Root element.
     * @member {Element} rzl.UI#rootNode
     * @default new child div
     */
    // create root UI div inside the parent element
    this.rootNode = rzl.addDiv(this.pnode,{id:name+"-root",class:"ui-root rzl-hidden"});

    this.build(this.def.view,this.rootNode);

    // fire built callbacks
    rzl.applyFunc(this.args.builtCB,this,[this]);
    rzl.applyFunc(this.meta.builtCB,this,[this]);

    this.show();

    // fire displayed callbacks
    rzl.applyFunc(this.args.displayedCB,this,[this]);
    rzl.applyFunc(this.meta.displayedCB,this,[this]);
  }

  /**
   * Build the DOM elements recursivelt from the definition.
   * @summary Build UI.
   * @param {Object} [ob={}] - The definition for the new element
   * @param {string} [ob.class=] - The classname for the new element
   * @param {string} [ob.content=] - The content for the new element
   * @param {Object} [ob.events={}] - The events for the new element
   * @param {string} [ob.id=] - The id for the new element
   * @param {Object} [ob.props={}] - The props for the new element
   * @param {Object} [ob.style={}] - The style for the new element
   * @param {string} [ob.tag=div] - The tagname for the new element
   * @param {Element} [pnode=document.body] - The parent element
   */
  build(ob={},pnode=document.body) {
    // add elements from def
    const tag = ob.tag || "div";
    const el = rzl.addElement(tag,pnode,{
      id : ob.id || "",
      class : ob.class || "",
      content : ob.content || "",
      style : ob.style || {},
      events : ob.events || {},
      props : ob.props || {}
    });

    if (ob.children) ob.children.forEach(child=>{this.build(child,el)});
  }

  /**
   * Remove the root UI element from the DOM.
   * @summary Destroy UI.
   */
  destroy() {
    rzl.destroyElement(this,this.parentNode);
  }

  /**
   * Remove the rzl-hidden css class from the UI.
   * @summary Unhide UI.
   */
  show() {
    this.rootNode.classList.remove("rzl-hidden");
  }

  /**
   * Add the rzl-hidden css class to the UI.
   * @summary Hide UI.
   */
  hide() {
    this.rootNode.classList.add("rzl-hidden");
  }
}
