var rzl = {

  // ======================================================================
  // Section: Files

  loadCSS: function(name,args) {rzl.loadFile(name,'css',{sync:false})},
  loadJS: function(name,args) {rzl.loadFile(name,'js',{sync:false})},
  loadFile: function(name,type,args) {
    switch (type) {
      case 'css':

        break;
      case 'js':

        break;
      default:
    }
  },


  // ======================================================================
  // Section: Elements

  // create a new element and add it to the DOM
  addElement: function(tag,pnode,args) {
    try {
      if (typeof tag === 'undefined') return;
      var el = document.createElement(tag);
      pnode.appendChild(el);

      el.id = args.id || '';
      el.className = args.class || '';
      el.innerHTML = args.content || '';

      if (args.style) this.setStyle(el,args.style);
      if (args.events) for (var e in args.events) rzl.eventAdd(el,e,args.events[e]);
      if (args.props) Object.keys(args.props).forEach(p => el[p] = args.props[p]);
    } catch (e) {
      console.error(e);return;
    }
    return el;
  },
  addDiv: function(pnode,args) {return rzl.addElement('div',pnode,args)},

  // finds the first matching child of the given parent element
  // parent and tag are required, id is optional
  findChild: function(pnode,tag,id) {
    if (!pnode) return false;
    try {
      var children=pnode.getElementsByTagName(tag);
    } catch (e) {
      console.log("Cannot find child");
      console.log(pnode);
      console.log(e);
      return false;
    }
    if (!children) return false;
    for (idx=0; idx<children.length; idx++) {
      child=children[idx];
      if (child && child.id && child.id==id) return child;
    }
    return false;
  },

  // gather fields from target form
  getFormFields: function(form) {
    if (!form || !form[0]) return; // no form or fields
    var fields = {}; var i = 0; // prepare an object and counter

    while (form[i]) {
      if (form[i].tagName=='BUTTON') {i++;continue;} // ignore buttons
      else {fields[form[i].id] = form[i];i++;};
    }

    return fields;
  },

  // build a list of options using the keys from a given object
  // can be fed into setSelOpts
  getSelectOptionsFromKeysInObject: function(ob) {
    var opts = {};
    Object.keys(ob).forEach(k => {opts[k] = capitalise(k)});
    return opts;
  },

  getSelectOptionsFromKeyInObjectsInArray: function(arr,key) {
    var opts = {};
    arr.forEach((ob,i) => {opts[i]=ob[key]});
    return opts;
  },

  // returns array of values for matching object[key] in arr1
  arrayFromKeyInObjectsInArray: function(arr1,key) {
    var arr2 = [];
    arr1.forEach(ob => { arr2.push(ob[key]); });
    return arr2;
  },

  // returns array of values for matching object[key] in arr1
  // each item in arr2 is repeated object[count] times
  arrayFromKeyForCountInObjectsInArray: function(arr1,key,count) {
    var arr2 = [];
    arr1.forEach(ob => { for (var i=ob[count];i>0;i--) arr2.push(ob[key]); });
    return arr2;
  },

  // returns array of values for matching object[key] in arr1
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayFromKeyForCountInObjectsInArrayFilter: function(arr1,key,count,filter) {
    var arr2 = [];
    arr1.forEach(ob => {
      if (ob[filter.key] === filter.value) {
        for (var i=ob[count];i>0;i--) arr2.push(ob[key]);
      }
    });
    return arr2;
  },

  // returns array of matching arr1 indexes
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayForCountInObjectsInArray: function(arr1,count) {
    var arr2 = [];
    arr1.forEach((ob,index) => { for (var i=ob[count];i>0;i--) arr2.push(index); });
    return arr2;
  },

  // returns array of matching arr1 indexes
  // where object[filter[key]] is equal to filter[value]
  // each item in arr2 is repeated object[count] times
  arrayForCountInObjectsInArrayFilter: function(arr1,count,filter) {
    var arr2 = [];
    arr1.forEach((ob,index) => {
      if (ob[filter.key] === filter.value) {
        for (var i=ob[count];i>0;i--) arr2.push(index);
      }
    });
    return arr2;
  },

  // returns a random item from the given array
  randomArrayItem: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // set the options of a select element from a provided object
  setSelOpts: function(el,opts,style='') {
    if (el.hasChildNodes()) this.destroyChildren(el,'option');
    for (var o in opts) {
      var opt = rzl.addElement('option',el,{id:o,style:style,content:opts[o]});
      opt.value = opts[o];
      this.setStyle(opt,style);
    }
  },

  // set style of elements from string or array/object
  setStyle: function(el,style) {
    if (typeof style === 'string') {
      el.style.cssText += style;
    } else if (typeof style === 'object') {
      Object.keys(style).forEach(key => el.style[key] = style[key]);
    }
  },

  // destroy children of pnode matching tag
  destroyChildDivs: function(pnode) {this.destroyChildren(pnode,'div')},
  destroyChildren: function(pnode,tag) {
    if (typeof pnode === 'undefined') return;
    try {
      if (!tag) {while (pnode.firstChild) pnode.removeChild(pnode.firstChild);}
      else {
        for (var c in pnode.children) {
          var child = pnode.children[c];
          if (child.children) this.destroyChildren(child);
          pnode.removeChild(children);
        }
      };
    } catch (e) {
      console.error(e);return false;
    }
  },

  // destroy a given element, parent defaults to document body
  destroyElement: function(el,pnode) {
    if (typeof el === 'undefined') return;
    try {
      if (typeof pnode === 'undefined') parent=document.body;
      parent.removeChild(el);
    } catch (e) {
      console.error(e);return false;
    }
  },

  // destroys the first matching child of the given parent element
  // parent and tag are required, id is optional
  destroyChild: function(pnode,tag,id) {
    try {
      var el=this.findChild(parent,tag,id);
      if (!el) return false;
      parent.removeChild(el);return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },


  // ======================================================================
  // Section: Function handling

  // parse function from string
  parseFunc: function(src) {
    if (typeof src === 'undefined' || typeof src == 'function') return false;
    return eval(src);
  },

  // apply function wrapper
  applyFunc: function(fn,that=this,args) {
    if (typeof fn === 'undefined') return false;
    var pfn = this.parseFunc(fn);
    if (typeof pfn === 'undefined') return false;
    try {pfn.apply(that,args)} catch(e) {console.error(e);return false;};
  },


  // ======================================================================
  // Section: Event handling

  // add event to the element matching the given id
  eventAddById: function(eid,ev,fn,arg) {
    rzl.eventAdd($(eid),ev,fn,arg);
  },

  addEvent: function() {console.log('Please use eventAdd() not addEvent()')},
  eventAdd: function(targ,ev,fn,cap) {
    if (fn === 'ignore') fn = this.eventIgnore;
    else if (fn === 'prevent') fn = this.eventPrevent;
    else fn = this.parseFunc(fn);

    if (!targ) return false;
    try {
      if (targ.attachEvent) {
        targ['e'+ev+fn] = fn;
        targ[ev+fn] = function() { return targ['e'+ev+fn](window.event) }
        return targ.attachEvent('on'+ev,targ[ev+fn]);
      } else {
        return targ.addEventListener(ev,fn,(cap==true)?true:false);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  delEvent: function() {console.log('Please use eventDel() not delEvent()')},
  eventDel: function(targ,ev,fn) {
    targ.removeEventListener(ev,fn);
  },

  eventIgnore: function(ev) {stopprop(ev)},
  eventPrevent: function(ev) {ev.preventDefault()},

  // ======================================================================
  // Helper functions

  capitalise: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // generate a random number from 1 to n (inclusive)
  rand1tn: function(n) {
    return Math.floor(Math.random() * n) + 1;
  },
};
