if (typeof rzl === "undefined") throw new Error("Requires rzl/core")

rzl.UIComponent = class {
  constructor(pnode=null,args={}) {
    const bp = this._blueprint = (args.blueprint || null);
    this._pnode = pnode || ((bp||{}).meta||{}).pnode || document.body;
    this._name = args.name || ((bp||{}).meta||{}).name || "";
  }
}


// ========================================================================
// UI components

rzl.Modal = class extends rzl.UIComponent {

  constructor(pnode=null,args={}) {
    super(pnode,args);
    console.log(this);

    this._content = args.content || "No content or blueprint provided";

    this.build();
  }

  build() {
    if (this.root && this.pnode) rzl.destroyElement(this.root,this.pnode);
    this._root = rzl.addDiv(this.pnode, {
      class : "modal-root rzl-hidden",
      id    : `modal-${this.name}-root`
    });
    this._box = rzl.addDiv(this.root, {
      class : "modal-box",
      id    : `modal-${this.name}-box`
    });
    this._header = rzl.addDiv(this.box, {
      class : "modal-header",
      id    : `modal-${this.name}-header`
    });
    this._btnClose = rzl.addDiv(this.header,{
      class   : "modal-btn-close",
      content : '<span class="iconify icon:ion:close"></span>'
    });
    this._btnClose.addEventListener("click",this.destroy.bind(this),1);
    this._body = rzl.addDiv(this.box, {
      class   : "modal-body",
      id      : `modal-${this.name}-body`,
    });
    this._footer = rzl.addDiv(this.box, {
      class   : "modal-footer",
      id      : `modal-${this.name}-footer`,
    });

    if (this.blueprint) new rzl.UI(this.blueprint,{pnode:this.body})
    else this.body.textContent = this.content;

    this.show()
  }

  destroy() {
    console.log("destroy")
    rzl.destroyElement(this.root,this.pnode);
  }

  show() { this.root.classList.remove("rzl-hidden") }

  hide() { this.root.classList.add("rzl-hidden") }

  get blueprint() { return this._blueprint }
  set blueprint(blueprint) {
    this._blueprint = blueprint;
    this._content = false;
    this.build();
  }

  get content() { return this._content }
  set content(content) {
    this._content = content;
    this._blueprint = false;
    this.build();
  }

  get name() { return this._name }
  get pnode() { return this._pnode }
  get root() { return this._root }
  get box() { return this._box }
  get header() { return this._header }
  get body() { return this._body }
  get footer() { return this._footer }

}


// ========================================================================
// UI builder

rzl.UI = class {
  // def and args are objects
  constructor(def,args) {
    if (typeof def !== "object") return;
    this.def = def;
    this.args = args || {};
    this.init();
  }

  init() {
    let box = {}, domain = "", name = "";
    box = document.getElementById("rzlBox") || document.body;

    this.meta = this.args.meta || this.def.meta || {};
    domain = this.args.domain || this.meta.domain || "rzl";
    name = this.args.name || this.meta.name || "ui-"+window[domain].state.length;
    this.pnode = this.args.pnode || this.meta.pnode || box;
    if (typeof this.pnode === "string") this.pnode = document.getElementById(this.pnode);
    if (this.pnode.firstChild) rzl.destroyChildren(this.pnode);

    // set state
    if ((window[domain]||{}).state) window[domain]["state"][name] = this;

    // fire loaded callbacks
    rzl.applyFunc(this.args.loadedCB,this,[this]);
    rzl.applyFunc(this.meta.loadedCB,this,[this]);

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

  build(ob,pnode) {
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

  // removes ui element from dom
  destroy() {
    rzl.destroyElement(this,this.parentNode);
  }

  // shows ui by removing rzl-hidden class
  show() {
    this.rootNode.classList.remove("rzl-hidden");
  }

  // hides ui by adding rzl-hidden class
  hide() {
    this.rootNode.classList.add("rzl-hidden");
  }
}
