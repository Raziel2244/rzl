var rzl = {
  // ======================================================================
  // Section: Function handling
  getFunc: function(str) {return this.getFunctionFromString(str)},
  getFunctionFromString: function(str) {
    if (!str) return false;
    if (typeof str === 'function') return; // no need for lookup
    var scope = window;
    var nodes = str.split('.');
    for (i = 0; i < nodes.length - 1; i++) {
      scope = scope[nodes[i]];
      if (scope == undefined) return false;
    }
    return scope[nodes[nodes.length - 1]];
  },

  // apply function from string in given context - c is context i.e. 'this'
  callFunc: function(fn,c,args) {
    if (typeof fn === 'undefined') return false;
    var func = this.getFunc(fn);
    if (typeof func === 'undefined') return false;
    try {
      var out = func.apply(c,args);
    } catch (e) {
      console.error('Function call failed',e);
      return false;
    }
    return out;
  },

  // ======================================================================
  // Section: JS/CSS inclusion

  // load js file during execution and pass it to appendJS
  loadJS: function(filename,sync=false){
    try {
      if (undef(this.loadedJSFiles)) this.loadedJSFiles=[];
      if (this.loadedJSFiles.indexOf(filename)>-1) {console.log("already loaded");return true;}
      // Already loaded

      new Date().getTime();
      var nocache = new Date().getTime();
      filename+="?cache="+nocache

      var req = (typeof(XMLHttpRequest) != "undefined") ? new XMLHttpRequest() : new ActiveXObject("Msxml2.XMLHTTP");
      // open and send a synchronous request
      req.open('GET', filename, sync);

      // If in async mode, add the callback to append the JS
      if (!sync) {
        req.onreadystatechange = function() {
          if (req.readyState == 4) {
            if (req.status == 200) {
              NWT.appendJS(req.responseText);
              NWT.loadedJSFiles.push(filename);
            } else {
              console.log("Async JS Load failed with code "+req.status+": "+filename);
            }
          }
        }
      }

      // Fire the load request
      req.send('');

      // Syncronous mode - just add straight away
      if (sync) {
        if (req.status == 200) {
          console.log("Sync JS Load failed with code "+req.status+": "+filename);
          return false;
        }
        this.appendJS(req.responseText);
        this.loadedJSFiles.push(filename);
      }

      return true;
    } catch (e) {
      console.log("JS Load failed ("+filename+"):"+e);
      return false;
    }
  },

  // append loaded js to document head
  appendJS : function(text) {
    var se = document.createElement("SCRIPT");
    se.type = "text/javascript";
    se.text = text;
    document.getElementsByTagName('head')[0].appendChild(se);
  },

  // load css file during execution and append it to document head
  loadCSS :function(filename){
    try {
      if (undef(this.loadedCSSFiles)) this.loadedCSSFiles=[];
      if (this.loadedCSSFiles.indexOf(filename)>-1) return true; // Already loaded

      var fileref=document.createElement("link");

      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
      console.log(fileref);

      document.getElementsByTagName("head")[0].appendChild(fileref);

      this.loadedCSSFiles.push(filename);
      return true;
    } catch (e) {
      return false;
    }
  },

  // Load generic file and pass response to callback function
  loadFile : function(file,cbfunc,arg) {
    try {
      if (typeof cbfunc!='function') return false;
      var req = new XMLHttpRequest();
      if (!req) return false;

      req.open("GET", file, true);
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200 || req.status==0) cbfunc(req.responseText,req.status,arg);
          else cbfunc(0,req.status,arg);
        }
      }
      req.send();
      return true;
    } catch (e) {
      return false;
    }
  },

  // ======================================================================
  // Section: Elements

  // create new element and add it to the DOM
  newElement: function(args) {
    if (!args.tag) return false;

    // create element object and add it to the DOM
    try {
      var elm = document.createElement(args.tag);
      if (args.pnode) args.pnode.appendChild(elm);
    } catch (e) {
      console.error('Failed to create element!', e);
    }

    if (args.id) elm.id = args.id;
    if (args.class) elm.className = args.class;
    if (args.title) elm.title = args.title;
    if (args.content) elm.innerHTML = args.content;
    if (args.type) elm.type = args.type;
    if (args.placeholder) elm.placeholder = args.placeholder;

    // set element styles using string/array/object
    if (args.style) this.setStyle(elm,args.style);

    // add any events to the new element
    if (args.events) for (var e in args.events) rzl.eventAdd(elm,e,args.events[e]);

    // If any properties are set, add them
    if (args.props) for (var p in args.props) elm[p]=args.props[p];

    // Special event which creates a menu from built in def
    // if (ifset(args.menu)) NWT.addContextMenu(ob,ifset(args.page),args.menu,args.configid);

    if (args.tag.toLowerCase()=="select" && args.options) {
      this.setOptions(elm,args.options,args.selected?true:false);
    }

    if (ifset(args.imgsrc)) ob.src=args.imgsrc;

    return elm;
  },

  // add element using newElement
  addElement: function(tag,pnode,eid,eclass,style,content,title) {
    return this.newElement({
      tag: tag,
      pnode: pnode,
      id: eid,
      class : eclass,
      style : style,
      content : content,
      title : title
    });
  },

  addDiv: function(pnode,eid,eclass,style,content) {
    var args;
    if (typeof(pnode)!="object") return false;

    // args can be a pnode, in which case the other arguments to the function call are used direct
    if (isElement(pnode)) {
      args = {
          pnode : pnode,
          id : eid,
          class : eclass,
          style : style,
          content : content
        };
    }
    else args=pnode;

    args.tag="DIV";
    return this.newElement(args);
  },

  // Create an SVG image
  addSVG: function(pnode,h,w){
    var NS="http://www.w3.org/2000/svg";
    var svg=document.createElementNS(NS,"svg");
    if (w) svg.width=w;
    if (h) svg.height=h;
    if (pnode) pnode.appendChild(svg);
    return svg;
  },

  addSummary: function(pnode,eid,eclass,style,content) {
    return this.addElement("SUMMARY",pnode,eid,eclass,style,content);
  },

  addImg: function(pnode,eid,eclass,style,imgsrc,title) {
    var elm=this.addElement("IMG",pnode,eid,eclass,style,0,title);
    elm.src=imgsrc;
    return elm;
  },

  addInput: function (pnode,eid,eclass,style,itype,iname,ivalue) {
    var elm=this.addElement("INPUT",pnode,eid,eclass,style);
    if (itype) elm.type=itype;
    if (iname) elm.name=iname;
    if (ivalue) elm.value=ivalue;
    return elm;
  },

  addSelect: function(pnode,opts,eid,eclass,style,selection) {
    var el=this.addElement("SELECT",pnode,eid,eclass,style);
    this.setOptions(el,opts,selection);
    return el;
  },

  // finds the first matching child of the given parent element
  // parent and tag are required, id is optional
  findChild: function(parent,tag,id) {
    if (typeof parent === 'undefined' || !parent) return false;
    try {
      var children = parent.getElementsByTagName(tag);
    } catch (e) {
      console.err("Cannot find child",parent,e);
      return false;
    }
    if (!children) return false;
    for (idx=0; idx<children.length; idx++) {
      child=children[idx];
      if (child && child.id && child.id==id) return child;
    }
    return false;
  },

  // build a list of options using the keys from a given object
  // can be fed into setOptions
  getSelOpts: function(ob) {return this.getSelectOptionsFromObjectKeys(ob)},
  getSelectOptionsFromObjectKeys: function(ob) {
    var opts = {};
    Object.keys(ob).forEach(k => {opts[k] = capsFirstLetter(k)});
    return opts;
  },

  // set the options of a select element from a provided object
  setOptions: function(elm,opts,selection,style) {
    this.destroyChildElements(elm,'OPTION');
    if (!style) style = '';
    for (o in opts) {
      var opt = rzl.addElement('OPTION',elm,o,0,style,opts[o]);
      opt.value = o;
      if (style) this.setStyle(opt,style);
      if (selection && selection == o) opt.selected=true;
    }
  },

  // set style of elements from string or array/object
  setStyle: function(elm,style) {
    if (typeof style === 'string') {
      elm.style.cssText += style;
    } else if (typeof style === 'object') {
      Object.keys(style).forEach(key => elm.style[key] = style[key]);
    }
  },

  // recursively destroy children of the given element
  // etag can be provided to destroy only children with the matching tag
  destroyChildDivs: function(parent) {this.destroyChildElements(parent,'DIV')},
  destroyChildElements: function(parent,etag) {
    if (typeof parent === 'undefined') return;
    var max = 500;
    if (!etag) {
      while (parent.firstChild) parent.removeChild(parent.firstChild);
    } else {
      child = parent.getElementsByTagName(etag);
      do {
        if (typeof child === 'undefined') break;
        if (typeof child[0] !== 'undefined') {
          try { parent.removeChild(child[0]) }
          catch(e) { console.error('Element remove failed',e) }
        }
        child=parent.getElementsByTagName(etag);
      } while (max-- && child.length>0);
    }
  },

  // destroy a given element, parent defaults to document body
  destroyElement: function(elm,parent) {
    if (typeof elm === 'undefined') return;
    try {
      if (typeof parent === 'undefined') parent=document.body;
      parent.removeChild(elm);
    } catch (e) {
      console.error(e);
    }
  },

  // destroys the first matching child of the given parent element
  // parent and tag are required, id is optional
  destroyChild: function(parent,tag,id) {
    try {
      var elm=this.findChild(parent,tag,id);
      if (elm) {
        parent.removeChild(elm);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  },

  // ======================================================================
  // Section: Events

  // add event to the element matching the given id
  eventAddById: function(eid,ev,fn,arg) {
    rzl.eventAdd($(eid),ev,fn,arg);
  },

  addEvent: function() {console.log('Please use eventAdd() not addEvent()')},
  eventAdd: function(targ,ev,fn,cap) {
    if (fn === 'ignore') fn = this.eventIgnore;
    else if (fn === 'prevent') fn = this.eventPrevent;
    else fn = this.getFunc(fn);

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
};

// ========================================================================
// Helper functions
function getProp(str) {return NWT.getScope(str);}

// Return false if arg undefined, arg if it is not
function ifset(arg) {
  return t=(typeof arg=='undefined')?false:arg;
}

// Go through list of arguments until we find one thats defined
function ifsetOr() {
  for (var arg,i = 0, j = arguments.length; i < j; i++)
  {
    arg=arguments[i];
    if (typeof arg!='undefined') {
      return arg;
    }
  }
  return false;
}

// Zero prefix
function numZpre(num,digits) {
  if (!ifset(digits)) digits=2;
  var str="0000000000"+parseInt(num,10);
  return str.slice(-digits);
}

function isOdd(num) { return num % 2;}

// Is object a function
function isfunc(x) {return (typeof x=='function')?true:false;}
function isarray(x) {return (typeof x=='array')?true:false;}

// Convenience functions for checking if an argument either boolean or string true/false
function isTrue(arg) {return (typeof arg!='undefined' && (arg===true || arg=="true"));}
function isFalse(arg) {return (typeof arg!='undefined' && (arg===false || arg=="false"));}

//Returns true if it is a DOM node
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}

// See if variable is undefined or not
function undef(x) {return (typeof x=='undefined')?true:false;}

// Shortcut for ob lookup with $('name').
// Optionally supply object to search under instead of window
function $(id,ob) {
  if (!ob) return document.getElementById(id);

  var robj=false;
  var chld=ob.childNodes;
  for (var i=0;i<chld.length&&!robj;i++) {
    if (chld[i].nodeType!=1) continue;
    if (chld[i].getAttribute('id')==id) robj=chld[i];
    else if (chld[i].hasChildNodes) robj=$(id,chld[i]);
  }

  return robj;
}

function capsFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Stop event bubbling (lets an element in div capture an event and stop it hitting the parent)
function stopprop(e) {
  if (undef(e)) return;
  eventObject=e;
  if (window.event && !undef(window.event.cancelBubble)) {window.event.cancelBubble = true;}
  if (eventObject && !undef(eventObject.stopPropagation)) eventObject.stopPropagation();
  if (eventObject && !undef(eventObject.preventDefault)) eventObject.preventDefault();
  if (window.event) window.event.returnValue = false;
  if(!undef(eventObject.preventCapture)) eventObject.preventCapture();
  if(!undef(eventObject.preventBubble)) eventObject.preventBubble();
}

function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function arrayRemove(array,item) {
  for (var k in array) {
    if (array[k]==item) {
      array[k]='';
      delete(array[k]);
      return true;
    }
  }
  return false;
}
