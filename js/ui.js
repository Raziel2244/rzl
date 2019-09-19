if (typeof rzl === 'undefined') throw new Error('Requires rzl/core')


// ========================================================================
// UI builder

rzl.UI = class {
  // def and args are objects
  constructor(def,args) {
    if (typeof def !== 'object') return;
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
    window[domain]["state"][name] = this;

    // fire loaded callbacks
    rzl.applyFunc(this.args.loadedCB,this,[this]);
    rzl.applyFunc(this.meta.loadedCB,this,[this]);

    // create root UI div inside the parent element
    this.rootNode = rzl.addDiv(this.pnode,{id:name+'-root',class:'ui-root rzl-hidden'});

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
    const tag = ob.tag || 'div';
    const el = rzl.addElement(tag,pnode,{
      id : ob.id || '',
      class : ob.class || '',
      content : ob.content || '',
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
    this.rootNode.classList.remove('rzl-hidden');
  }

  // hides ui by adding rzl-hidden class
  hide() {
    this.rootNode.classList.add('rzl-hidden');
  }
}
