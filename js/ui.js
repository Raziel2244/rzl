if (typeof rzl === 'undefined') throw new Error('Please check rzl/core is loaded first');
// try {rzl.loadCSS('../rzl/css/ui.css');} catch (e) {console.error(e);}

// def and args are objects
rzl.UI = class {
  constructor(def,args) {
    if (typeof def !== 'object') return;
    this.init(def,args||{});
  }

  init(def,args) {
    if (!def) return;
    var rzlBox = document.getElementById('rzlBox') || document.body;
    this.def = def;
    this.args = args || {};
    this.ui={};
    var meta = this.def.meta || {};
    this.name = this.args.name || meta.name || 'ui';
    this.pnode = this.args.pnode || meta.pnode || rzlBox;
    if (typeof this.pnode === 'string') this.pnode = document.getElementById(this.pnode);
    if (this.pnode.firstChild) rzl.destroyChildren(this.pnode);

    // fire loaded callbacks
    rzl.applyFunc(this.args.loadedCB,this,[this]);
    rzl.applyFunc(meta.loadedCB,this,[this]);

    // create root UI div inside the parent element
    this.rootNode = rzl.addDiv(this.pnode,{id:this.name+'-root',class:'ui-root rzl-hidden'});

    this.build(def.view,this.rootNode);

    // fire built callbacks
    rzl.applyFunc(this.args.builtCB,this,[this]);
    rzl.applyFunc(meta.builtCB,this,[this]);

    this.show();

    // fire displayed callbacks
    rzl.applyFunc(this.args.displayedCB,this,[this]);
    rzl.applyFunc(meta.displayedCB,this,[this]);

    // update state
  }

  build(ob,pnode) {
    // add elements from def
    // var ui = this.ui;

    var tag = ob.tag || 'div';
    var el = rzl.addElement(tag,pnode,{
      id : ob.id || '',
      class : ob.class || '',
      content : ob.content || '',
      style : ob.style || {},
      events : ob.events || {},
      props : ob.props || {}
    });

    // if (ob.id) ui[ob.id]=el;
    if (ob.children) ob.children.forEach(child=>{this.build(child,el)});
  }

  // buildChildren(ob,pnode) {
  //   if (typeof ob === 'undefined' || typeof pnode === 'undefined') return;
  //   for (var k in ob) {
  //     var o = ob[k];
  //
  //     var tag = o.tag || 'div';
  //     var el = rzl.addElement(tag,pnode,{
  //       id : o.id || '',
  //       class : o.class || '',
  //       content : o.content || '',
  //       style : o.style || {},
  //       events : o.events || {},
  //       props : o.props || {}
  //     });
  //
  //     if (o.children) this.buildChildren(o.children,el);
  //   }
  // }

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
