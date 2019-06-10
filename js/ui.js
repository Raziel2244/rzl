if (typeof rzl === 'undefined') throw new Error('Please check rzl/core is loaded first');
// try {rzl.loadCSS('../rzl/css/ui.css');} catch (e) {console.error(e);}

// def and args are objects
rzl.UI = class {
  constructor(def,args) {
    if (typeof def !== 'object') return;
    this.init(def,args||{});
  }

  init(def,args) {
    var rzlBox = document.getElementById('rzlBox') || document.body;
    this.def = def;
    this.args = args || {};
    var meta = ifsetOr(this.def.meta,{});
    this.name = ifsetOr(this.args.name,ifsetOr(meta.name,'ui'));
    this.pnode = ifsetOr(this.args.pnode,ifsetOr(meta.pnode,rzlBox));
    if (typeof this.pnode === 'string') this.pnode = document.getElementById(this.pnode);
    if (this.pnode.firstChild) rzl.destroyChildElements(this.pnode);

    // fire loaded callbacks
    rzl.callFunc(this.args.loadedCB,this,[this]);
    rzl.callFunc(meta.loadedCB,this,[this]);

    // create root UI div inside the parent element
    this.rootNode = rzl.addDiv(this.pnode,this.name+'-root','ui-root rzl-hidden');
    this.build();

    // fire built callbacks
    rzl.callFunc(this.args.builtCB,this,[this]);
    rzl.callFunc(meta.builtCB,this,[this]);

    this.show();

    // fire displayed callbacks
    rzl.callFunc(this.args.displayedCB,this,[this]);
    rzl.callFunc(meta.displayedCB,this,[this]);

    // update state
  }

  build() {
    // add elements from def
    var view = this.def.view;
    var ui = {};
    for (var v in view) {
      var vstyle = view[v].style || {};
      ui[v] = rzl.addDiv(this.rootNode,'','',vstyle);
      if (view[v].children) {
        this.buildChildren(view[v].children,ui[v]);
      }
      this[`view-${v}`]=ui[v];
    }
  }

  buildChildren(ob,pnode) {
    if (typeof ob === 'undefined' || typeof pnode === 'undefined') return;
    for (var k in ob) {
      var o = ob[k];
      var el = rzl.newElement({
        tag: o.tag || '',
        pnode: pnode,
        id: o.id || '',
        class: o.class || '',
        title: o.title || '',
        content: o.content || '',
        type: o.type || '',
        placeholder: o.placeholder || '',
        style: o.style || {},
        events: o.events || {},
        props: o.props || {}
      });
      if (o.children) this.buildChildren(o.children,el);
    }
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
};
