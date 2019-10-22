<a name="rzl"></a>

## rzl : <code>object</code>

**Kind**: global namespace

- [rzl](#rzl) : <code>object</code>
  - [.UIComponent](#rzl.UIComponent)
    - [new rzl.UIComponent([pnode], [args])](#new_rzl.UIComponent_new)
    - [.blueprint](#rzl.UIComponent+blueprint) : <code>Object</code>
    - [.name](#rzl.UIComponent+name) : <code>string</code>
    - [.pnode](#rzl.UIComponent+pnode) : <code>Element</code> \| <code>string</code>
  - [.Modal](#rzl.Modal) ⇐ [<code>UIComponent</code>](#rzl.UIComponent)
    - [new rzl.Modal([pnode], [args])](#new_rzl.Modal_new)
    - [.content](#rzl.Modal+content) : <code>string</code>
    - [.root](#rzl.Modal+root) : <code>Element</code>
    - [.box](#rzl.Modal+box) : <code>Element</code>
    - [.header](#rzl.Modal+header) : <code>Element</code>
    - [.body](#rzl.Modal+body) : <code>Element</code>
    - [.footer](#rzl.Modal+footer) : <code>Element</code>
    - [.blueprint](#rzl.UIComponent+blueprint) : <code>Object</code>
    - [.name](#rzl.UIComponent+name) : <code>string</code>
    - [.pnode](#rzl.UIComponent+pnode) : <code>Element</code> \| <code>string</code>
    - [.build()](#rzl.Modal+build)
    - [.destroy()](#rzl.Modal+destroy)
    - [.show()](#rzl.Modal+show)
    - [.hide()](#rzl.Modal+hide)
  - [.UI](#rzl.UI)
    - [new rzl.UI(def, [args])](#new_rzl.UI_new)
    - [.def](#rzl.UI+def) : <code>Object</code>
    - [.args](#rzl.UI+args) : <code>Object</code>
    - [.meta](#rzl.UI+meta) : <code>Object</code>
    - [.pnode](#rzl.UI+pnode) : <code>Element</code> \| <code>string</code>
    - [.rootNode](#rzl.UI+rootNode) : <code>Element</code>
    - [.init()](#rzl.UI+init)
    - [.build([ob], [pnode])](#rzl.UI+build)
    - [.destroy()](#rzl.UI+destroy)
    - [.show()](#rzl.UI+show)
    - [.hide()](#rzl.UI+hide)
  - [.addElement(tag, pnode, [args])](#rzl.addElement) ⇒ <code>Element</code> \| <code>boolean</code>
  - [.addDiv(pnode, [args])](#rzl.addDiv) ⇒ <code>Element</code> \| <code>boolean</code>
  - [.findChild(pnode, tag, [id])](#rzl.findChild) ⇒ <code>Element</code> \| <code>boolean</code>
  - [.getFormFields(form)](#rzl.getFormFields) ⇒ <code>Object</code>
  - [.setSelOpts(el, opts, [style&#x3D;])](#rzl.setSelOpts)
  - [.setStyle(el, style)](#rzl.setStyle)
  - [.destroyChildDivs(pnode)](#rzl.destroyChildDivs)
  - [.destroyChildren(pnode, [tag])](#rzl.destroyChildren)
  - [.destroyElement(el, [pnode])](#rzl.destroyElement)
  - [.destroyChild(pnode, tag, [id])](#rzl.destroyChild) ⇒ <code>boolean</code>
  - [.parseFunc(src)](#rzl.parseFunc)
  - [.applyFunc(fn, that, args)](#rzl.applyFunc)
  - [.eventAddById(eid, ev, fn, arg)](#rzl.eventAddById)
  - [.eventAdd(targ, ev, fn, cap)](#rzl.eventAdd) ⇒ <code>boolean</code>
  - [.eventDel(targ, ev, fn)](#rzl.eventDel)
  - [.eventPrevent(ev)](#rzl.eventPrevent)
  - [.largestOf([arr])](#rzl.largestOf) ⇒ <code>number</code>
  - [.randomArrayItem(arr)](#rzl.randomArrayItem) ⇒ <code>\*</code>
  - [.undef(x)](#rzl.undef) ⇒ <code>boolean</code>
  - [.capitalise(str)](#rzl.capitalise) ⇒ <code>string</code>
  - [.rng1to(n)](#rzl.rng1to) ⇒ <code>number</code>
  - [.rng0to(n)](#rzl.rng0to) ⇒ <code>number</code>

<a name="rzl.UIComponent"></a>

### rzl.UIComponent

Generic UI component class.

**Kind**: static class of [<code>rzl</code>](#rzl)

- [.UIComponent](#rzl.UIComponent)
  - [new rzl.UIComponent([pnode], [args])](#new_rzl.UIComponent_new)
  - [.blueprint](#rzl.UIComponent+blueprint) : <code>Object</code>
  - [.name](#rzl.UIComponent+name) : <code>string</code>
  - [.pnode](#rzl.UIComponent+pnode) : <code>Element</code> \| <code>string</code>

<a name="new_rzl.UIComponent_new"></a>

#### new rzl.UIComponent([pnode], [args])

Construct a generic UI component.

| Param            | Type                                        | Default         | Description                                             |
| ---------------- | ------------------------------------------- | --------------- | ------------------------------------------------------- |
| [pnode]          | <code>Element</code> \| <code>string</code> | <code></code>   | Parent node for this UI component.                      |
| [args]           | <code>Object</code>                         | <code>{}</code> | Arguments to use for construction of this UI component. |
| [args.blueprint] | <code>Object</code>                         |                 | See [blueprint](#rzl.UIComponent+blueprint)             |
| [args.name]      | <code>string</code>                         |                 | See [name](#rzl.UIComponent+name)                       |

<a name="rzl.UIComponent+blueprint"></a>

#### uiComponent.blueprint : <code>Object</code>

The blueprint object used for the construction of this UI component.

**Kind**: instance property of [<code>UIComponent</code>](#rzl.UIComponent)  
**Summary**: Component blueprint.  
<a name="rzl.UIComponent+name"></a>

#### uiComponent.name : <code>string</code>

The name used for the construction of this UI component.

**Kind**: instance property of [<code>UIComponent</code>](#rzl.UIComponent)  
**Summary**: Component name.  
<a name="rzl.UIComponent+pnode"></a>

#### uiComponent.pnode : <code>Element</code> \| <code>string</code>

The parent node used for the construction of this UI component.

**Kind**: instance property of [<code>UIComponent</code>](#rzl.UIComponent)  
**Summary**: Component parent.  
<a name="rzl.Modal"></a>

### rzl.Modal ⇐ [<code>UIComponent</code>](#rzl.UIComponent)

Modal class.

**Kind**: static class of [<code>rzl</code>](#rzl)  
**Extends**: [<code>UIComponent</code>](#rzl.UIComponent)

- [.Modal](#rzl.Modal) ⇐ [<code>UIComponent</code>](#rzl.UIComponent)
  - [new rzl.Modal([pnode], [args])](#new_rzl.Modal_new)
  - [.content](#rzl.Modal+content) : <code>string</code>
  - [.root](#rzl.Modal+root) : <code>Element</code>
  - [.box](#rzl.Modal+box) : <code>Element</code>
  - [.header](#rzl.Modal+header) : <code>Element</code>
  - [.body](#rzl.Modal+body) : <code>Element</code>
  - [.footer](#rzl.Modal+footer) : <code>Element</code>
  - [.blueprint](#rzl.UIComponent+blueprint) : <code>Object</code>
  - [.name](#rzl.UIComponent+name) : <code>string</code>
  - [.pnode](#rzl.UIComponent+pnode) : <code>Element</code> \| <code>string</code>
  - [.build()](#rzl.Modal+build)
  - [.destroy()](#rzl.Modal+destroy)
  - [.show()](#rzl.Modal+show)
  - [.hide()](#rzl.Modal+hide)

<a name="new_rzl.Modal_new"></a>

#### new rzl.Modal([pnode], [args])

Construct and then display a Modal.

| Param            | Type                                        | Default         | Description                                      |
| ---------------- | ------------------------------------------- | --------------- | ------------------------------------------------ |
| [pnode]          | <code>Element</code> \| <code>string</code> | <code></code>   | Parent node for this Modal.                      |
| [args]           | <code>Object</code>                         | <code>{}</code> | Arguments to use for construction of this Modal. |
| [args.blueprint] | <code>Object</code>                         |                 | See [blueprint](#rzl.UIComponent+blueprint)      |
| [args.content]   | <code>string</code>                         |                 | See [content](#rzl.Modal+content)                |
| [args.name]      | <code>string</code>                         |                 | See [name](#rzl.UIComponent+name)                |

<a name="rzl.Modal+content"></a>

#### modal.content : <code>string</code>

The content to use for the construction of this Modal, if no blueprint is provided.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal content.  
<a name="rzl.Modal+root"></a>

#### modal.root : <code>Element</code>

DOM element for the Modal root, obscures page underneath to hightlight the Modal box.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal box.  
<a name="rzl.Modal+box"></a>

#### modal.box : <code>Element</code>

DOM element for the Modal box, contains the final output.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal box.  
<a name="rzl.Modal+header"></a>

#### modal.header : <code>Element</code>

DOM element for the Modal box header, contains close button.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal box header.  
<a name="rzl.Modal+body"></a>

#### modal.body : <code>Element</code>

DOM element for the Modal box body, contains output from blueprint or content.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal box body.  
<a name="rzl.Modal+footer"></a>

#### modal.footer : <code>Element</code>

DOM element for the Modal box footer, contains additional buttons at the foot of the Modal box.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Modal box footer.  
<a name="rzl.UIComponent+blueprint"></a>

#### modal.blueprint : <code>Object</code>

The blueprint object used for the construction of this UI component.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Component blueprint.  
**Overrides**: [<code>blueprint</code>](#rzl.UIComponent+blueprint)  
<a name="rzl.UIComponent+name"></a>

#### modal.name : <code>string</code>

The name used for the construction of this UI component.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Component name.  
**Overrides**: [<code>name</code>](#rzl.UIComponent+name)  
<a name="rzl.UIComponent+pnode"></a>

#### modal.pnode : <code>Element</code> \| <code>string</code>

The parent node used for the construction of this UI component.

**Kind**: instance property of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Component parent.  
**Overrides**: [<code>pnode</code>](#rzl.UIComponent+pnode)  
<a name="rzl.Modal+build"></a>

#### modal.build()

Build the Modal using blueprint or content and add it to the DOM.

**Kind**: instance method of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Build and show the Modal.  
<a name="rzl.Modal+destroy"></a>

#### modal.destroy()

Hide the Modal and remove it from the DOM.

**Kind**: instance method of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Destroy the Modal.  
<a name="rzl.Modal+show"></a>

#### modal.show()

Remove the rzl-hidden css class from the Modal root.

**Kind**: instance method of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Unhide the Modal.  
<a name="rzl.Modal+hide"></a>

#### modal.hide()

Add the rzl-hidden css class to the Modal root.

**Kind**: instance method of [<code>Modal</code>](#rzl.Modal)  
**Summary**: Hide the Modal.  
<a name="rzl.UI"></a>

### rzl.UI

UI class

**Kind**: static class of [<code>rzl</code>](#rzl)

- [.UI](#rzl.UI)
  - [new rzl.UI(def, [args])](#new_rzl.UI_new)
  - [.def](#rzl.UI+def) : <code>Object</code>
  - [.args](#rzl.UI+args) : <code>Object</code>
  - [.meta](#rzl.UI+meta) : <code>Object</code>
  - [.pnode](#rzl.UI+pnode) : <code>Element</code> \| <code>string</code>
  - [.rootNode](#rzl.UI+rootNode) : <code>Element</code>
  - [.init()](#rzl.UI+init)
  - [.build([ob], [pnode])](#rzl.UI+build)
  - [.destroy()](#rzl.UI+destroy)
  - [.show()](#rzl.UI+show)
  - [.hide()](#rzl.UI+hide)

<a name="new_rzl.UI_new"></a>

#### new rzl.UI(def, [args])

Construct a complete UI from definition.

| Param       | Type                | Default         | Description              |
| ----------- | ------------------- | --------------- | ------------------------ |
| def         | <code>Object</code> |                 | See [def](#rzl.UI+def)   |
| [args]      | <code>Object</code> | <code>{}</code> | See [args](#rzl.UI+args) |
| [args.meta] | <code>string</code> |                 | See [meta](#rzl.UI+meta) |

<a name="rzl.UI+def"></a>

#### uI.def : <code>Object</code>

The definition to use for the construction of this UI.

**Kind**: instance property of [<code>UI</code>](#rzl.UI)  
**Summary**: UI definition.  
<a name="rzl.UI+args"></a>

#### uI.args : <code>Object</code>

The arguments to use for the construction of this UI.

**Kind**: instance property of [<code>UI</code>](#rzl.UI)  
**Summary**: Arguments.  
**Default**: <code>args || {}</code>  
<a name="rzl.UI+meta"></a>

#### uI.meta : <code>Object</code>

The metadata to use for the construction of this UI.

**Kind**: instance property of [<code>UI</code>](#rzl.UI)  
**Summary**: Metadata.  
**Default**: <code>this.args.meta || this.def.meta || {}</code>  
<a name="rzl.UI+pnode"></a>

#### uI.pnode : <code>Element</code> \| <code>string</code>

The parent element to use for the construction of this UI.

**Kind**: instance property of [<code>UI</code>](#rzl.UI)  
**Summary**: Parent element.  
**Default**: <code>this.args.pnode || this.def.pnode || &quot;rzlBox&quot; || document.body</code>  
<a name="rzl.UI+rootNode"></a>

#### uI.rootNode : <code>Element</code>

The root element to use for the construction of this UI.

**Kind**: instance property of [<code>UI</code>](#rzl.UI)  
**Summary**: Root element.  
**Default**: <code>new child div</code>  
<a name="rzl.UI+init"></a>

#### uI.init()

Initialise the UI and add it to the DOM. Also setup state
and fire various construction callbacks, if set.

**Kind**: instance method of [<code>UI</code>](#rzl.UI)  
**Summary**: Initialise UI.  
<a name="rzl.UI+build"></a>

#### uI.build([ob], [pnode])

Build the DOM elements recursivelt from the definition.

**Kind**: instance method of [<code>UI</code>](#rzl.UI)  
**Summary**: Build UI.

| Param         | Type                 | Default                      | Description                        |
| ------------- | -------------------- | ---------------------------- | ---------------------------------- |
| [ob]          | <code>Object</code>  | <code>{}</code>              | The definition for the new element |
| [ob.class=]   | <code>string</code>  |                              | The classname for the new element  |
| [ob.content=] | <code>string</code>  |                              | The content for the new element    |
| [ob.events]   | <code>Object</code>  | <code>{}</code>              | The events for the new element     |
| [ob.id=]      | <code>string</code>  |                              | The id for the new element         |
| [ob.props]    | <code>Object</code>  | <code>{}</code>              | The props for the new element      |
| [ob.style]    | <code>Object</code>  | <code>{}</code>              | The style for the new element      |
| [ob.tag]      | <code>string</code>  | <code>&quot;div&quot;</code> | The tagname for the new element    |
| [pnode]       | <code>Element</code> | <code>document.body</code>   | The parent element                 |

<a name="rzl.UI+destroy"></a>

#### uI.destroy()

Remove the root UI element from the DOM.

**Kind**: instance method of [<code>UI</code>](#rzl.UI)  
**Summary**: Destroy UI.  
<a name="rzl.UI+show"></a>

#### uI.show()

Remove the rzl-hidden css class from the UI.

**Kind**: instance method of [<code>UI</code>](#rzl.UI)  
**Summary**: Unhide UI.  
<a name="rzl.UI+hide"></a>

#### uI.hide()

Add the rzl-hidden css class to the UI.

**Kind**: instance method of [<code>UI</code>](#rzl.UI)  
**Summary**: Hide UI.  
<a name="rzl.addElement"></a>

### rzl.addElement(tag, pnode, [args]) ⇒ <code>Element</code> \| <code>boolean</code>

Create a new element and add it to the DOM.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Add Element.  
**Returns**: <code>Element</code> \| <code>boolean</code> - The new element or false for error

| Param           | Type                                       | Description                       |
| --------------- | ------------------------------------------ | --------------------------------- |
| tag             | <code>string</code>                        | The tagname for the new element   |
| pnode           | <code>Element</code>                       | The parent element                |
| [args]          | <code>Object</code>                        | The arguments for the new element |
| [args.class=]   | <code>string</code>                        | The classname for the new element |
| [args.content=] | <code>string</code>                        | The content for the new element   |
| [args.events]   | <code>Object</code>                        | The events for the new element    |
| [args.id=]      | <code>string</code>                        | The id for the new element        |
| [args.props]    | <code>Object</code>                        | The props for the new element     |
| [args.style]    | <code>Object</code> \| <code>string</code> | The style for the new element     |

<a name="rzl.addDiv"></a>

### rzl.addDiv(pnode, [args]) ⇒ <code>Element</code> \| <code>boolean</code>

Create a new div and add it to the DOM.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Add Element.  
**Returns**: <code>Element</code> \| <code>boolean</code> - The new element or false for error

| Param           | Type                                       | Description                       |
| --------------- | ------------------------------------------ | --------------------------------- |
| pnode           | <code>Element</code>                       | The parent element                |
| [args]          | <code>Object</code>                        | The arguments for the new element |
| [args.class=]   | <code>string</code>                        | The classname for the new element |
| [args.content=] | <code>string</code>                        | The content for the new element   |
| [args.events]   | <code>Object</code>                        | The events for the new element    |
| [args.id=]      | <code>string</code>                        | The id for the new element        |
| [args.props]    | <code>Object</code>                        | The props for the new element     |
| [args.style]    | <code>Object</code> \| <code>string</code> | The style for the new element     |

<a name="rzl.findChild"></a>

### rzl.findChild(pnode, tag, [id]) ⇒ <code>Element</code> \| <code>boolean</code>

Finds the first matching child of the given parent element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Find child.  
**Returns**: <code>Element</code> \| <code>boolean</code> - The matching child or false for no match

| Param | Type                 | Description                       |
| ----- | -------------------- | --------------------------------- |
| pnode | <code>Element</code> | The parent element to search from |
| tag   | <code>string</code>  | The tagname to search for         |
| [id]  | <code>string</code>  | The id to search for              |

<a name="rzl.getFormFields"></a>

### rzl.getFormFields(form) ⇒ <code>Object</code>

Gather fields from target form into one object keyed by id.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Gather form fields.  
**Returns**: <code>Object</code> - Fields keyed by id

| Param | Type              | Description      |
| ----- | ----------------- | ---------------- |
| form  | <code>Form</code> | The target form. |

<a name="rzl.setSelOpts"></a>

### rzl.setSelOpts(el, opts, [style&#x3D;])

Set the options of a select element from a provided object.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Set select options.

| Param    | Type                                       | Description                      |
| -------- | ------------------------------------------ | -------------------------------- |
| el       | <code>Element</code>                       | The target select element        |
| opts     | <code>Object</code>                        | The options to set               |
| [style=] | <code>Object</code> \| <code>string</code> | The style to set for each option |

<a name="rzl.setStyle"></a>

### rzl.setStyle(el, style)

Set style of element from string or array/object.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Set element style.

| Param | Type                                       | Description        |
| ----- | ------------------------------------------ | ------------------ |
| el    | <code>Element</code>                       | The target element |
| style | <code>Object</code> \| <code>string</code> | The style to set   |

<a name="rzl.destroyChildDivs"></a>

### rzl.destroyChildDivs(pnode)

Destroy all child div elements of given parent element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Destroy child divs.

| Param | Type                 | Description    |
| ----- | -------------------- | -------------- |
| pnode | <code>Element</code> | Target element |

<a name="rzl.destroyChildren"></a>

### rzl.destroyChildren(pnode, [tag])

Destroy matching child elements of given parent element,
if no tag is given it destroys all.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Destroy child elements.

| Param | Type                 | Description        |
| ----- | -------------------- | ------------------ |
| pnode | <code>Element</code> | The target element |
| [tag] | <code>string</code>  | The tag to match   |

<a name="rzl.destroyElement"></a>

### rzl.destroyElement(el, [pnode])

Destroy given element with given parent element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Destroy target element.

| Param   | Type                 | Default                    | Description        |
| ------- | -------------------- | -------------------------- | ------------------ |
| el      | <code>Element</code> |                            | The target element |
| [pnode] | <code>Element</code> | <code>document.body</code> | The parent element |

<a name="rzl.destroyChild"></a>

### rzl.destroyChild(pnode, tag, [id]) ⇒ <code>boolean</code>

Destroy the first matching child element of the given parent element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Destroy child element.  
**Returns**: <code>boolean</code> - True on success or false on failure

| Param | Type                 | Description        |
| ----- | -------------------- | ------------------ |
| pnode | <code>Element</code> | The parent element |
| tag   | <code>string</code>  | The tag to match   |
| [id]  | <code>string</code>  | The id to match    |

<a name="rzl.parseFunc"></a>

### rzl.parseFunc(src)

Parse function from string.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Parse function.

| Param | Type                                         | Description       |
| ----- | -------------------------------------------- | ----------------- |
| src   | <code>function</code> \| <code>string</code> | The source string |

<a name="rzl.applyFunc"></a>

### rzl.applyFunc(fn, that, args)

Wrapper for apply function.

**Kind**: static method of [<code>rzl</code>](#rzl)

| Param | Type                                         | Description                |
| ----- | -------------------------------------------- | -------------------------- |
| fn    | <code>function</code> \| <code>string</code> | The target function        |
| that  | <code>\*</code>                              | Target context             |
| args  | <code>Object</code>                          | Arguments for the function |

<a name="rzl.eventAddById"></a>

### rzl.eventAddById(eid, ev, fn, arg)

Add event to the element matching the given id.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Add event to element with id.

| Param | Type                                         | Description            |
| ----- | -------------------------------------------- | ---------------------- |
| eid   | <code>string</code>                          | The target id          |
| ev    | <code>string</code>                          | The event name         |
| fn    | <code>function</code> \| <code>string</code> | The event callback     |
| arg   | <code>Object</code>                          | The callback arguments |

<a name="rzl.eventAdd"></a>

### rzl.eventAdd(targ, ev, fn, cap) ⇒ <code>boolean</code>

Add event callback to the given element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Add event.  
**Returns**: <code>boolean</code> - True on succes or false on failure

| Param | Type                                         | Description        |
| ----- | -------------------------------------------- | ------------------ |
| targ  | <code>Element</code>                         | The target element |
| ev    | <code>string</code>                          | The event name     |
| fn    | <code>function</code> \| <code>string</code> | The event callback |
| cap   | <code>boolean</code>                         | Capture the event? |

<a name="rzl.eventDel"></a>

### rzl.eventDel(targ, ev, fn)

Remove event callback from the given element.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Remove event.

| Param | Type                                         | Description           |
| ----- | -------------------------------------------- | --------------------- |
| targ  | <code>Element</code>                         | The target element    |
| ev    | <code>string</code>                          | The event name        |
| fn    | <code>function</code> \| <code>string</code> | The callback function |

<a name="rzl.eventPrevent"></a>

### rzl.eventPrevent(ev)

Stop event from propagating further.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Prevent event.

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| ev    | <code>string</code> | The event name |

<a name="rzl.largestOf"></a>

### rzl.largestOf([arr]) ⇒ <code>number</code>

Get the largest number in the given array.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Get largest of array.  
**Returns**: <code>number</code> - The largest number

| Param | Type               | Default         | Description         |
| ----- | ------------------ | --------------- | ------------------- |
| [arr] | <code>Array</code> | <code>[]</code> | The array to search |

<a name="rzl.randomArrayItem"></a>

### rzl.randomArrayItem(arr) ⇒ <code>\*</code>

Returns a random item from the given array.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Get random array item.  
**Returns**: <code>\*</code> - Selected item

| Param | Type               | Description        |
| ----- | ------------------ | ------------------ |
| arr   | <code>Array</code> | Array to pick from |

<a name="rzl.undef"></a>

### rzl.undef(x) ⇒ <code>boolean</code>

Test to see if the given variable is undefined.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Test undefined.  
**Returns**: <code>boolean</code> - True if undefined or false if defined

| Param | Type            | Description          |
| ----- | --------------- | -------------------- |
| x     | <code>\*</code> | The variable to test |

<a name="rzl.capitalise"></a>

### rzl.capitalise(str) ⇒ <code>string</code>

Capitalise the first letter of a given string.

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Capitalise first letter.  
**Returns**: <code>string</code> - The capitalised string

| Param | Type                | Description              |
| ----- | ------------------- | ------------------------ |
| str   | <code>string</code> | The string to capitalise |

<a name="rzl.rng1to"></a>

### rzl.rng1to(n) ⇒ <code>number</code>

Generate a random number from 1 to n (inclusive).

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Get random 1 to n.  
**Returns**: <code>number</code> - The rolled number

| Param | Type                | Description           |
| ----- | ------------------- | --------------------- |
| n     | <code>number</code> | The random number cap |

<a name="rzl.rng0to"></a>

### rzl.rng0to(n) ⇒ <code>number</code>

Generate a random number from 0 to n (inclusive).

**Kind**: static method of [<code>rzl</code>](#rzl)  
**Summary**: Get random 0 to n.  
**Returns**: <code>number</code> - The rolled number

| Param | Type                | Description           |
| ----- | ------------------- | --------------------- |
| n     | <code>number</code> | The random number cap |
