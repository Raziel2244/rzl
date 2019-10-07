## Modules

<dl>
<dt><a href="#module_@rzl/core">@rzl/core</a></dt>
<dd><p>Rzl Core module.</p>
</dd>
<dt><a href="#module_@rzl/ui">@rzl/ui</a></dt>
<dd><p>Rzl UI module.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#iterable">iterable</a> : <code>Object</code></dt>
<dd><p>An Array or other iterable object whose elements are key-value pairs
(arrays with two elements, e.g. [[ 1, &#39;one&#39; ], [ 2, &#39;two&#39; ]]).</p>
</dd>
</dl>

<a name="module_@rzl/core"></a>

## @rzl/core
Rzl Core module.


* [@rzl/core](#module_@rzl/core)
    * [.randomInt([to], [from])](#module_@rzl/core.randomInt) ⇒ <code>number</code>
    * [.undef(x)](#module_@rzl/core.undef) ⇒ <code>boolean</code>
    * [.capitalise(str)](#module_@rzl/core.capitalise) ⇒ <code>string</code>

<a name="module_@rzl/core.randomInt"></a>

### @rzl/core.randomInt([to], [from]) ⇒ <code>number</code>
Generate a random integer in a given range (Inclusive).

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Random number generator.  
**Returns**: <code>number</code> - The random integer  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [to] | <code>number</code> | <code>100</code> | The maximum number to roll (Inclusive) |
| [from] | <code>number</code> | <code>1</code> | The minimum number to roll (Inclusive) |

<a name="module_@rzl/core.undef"></a>

### @rzl/core.undef(x) ⇒ <code>boolean</code>
Test to see if the given variable is undefined.

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Test undefined.  
**Returns**: <code>boolean</code> - True if undefined or false if defined  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>\*</code> | The variable to test |

<a name="module_@rzl/core.capitalise"></a>

### @rzl/core.capitalise(str) ⇒ <code>string</code>
Capitalise the first letter of a given string.

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Capitalise first letter.  
**Returns**: <code>string</code> - The capitalised string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to capitalise |

<a name="module_@rzl/ui"></a>

## @rzl/ui
Rzl UI module.

**See**: module:@rzl/core  

* [@rzl/ui](#module_@rzl/ui)
    * _static_
        * [.Component](#module_@rzl/ui.Component)
            * [new exports.Component([props])](#new_module_@rzl/ui.Component_new)
            * [.state](#module_@rzl/ui.Component+state) : <code>Object</code>
    * _inner_
        * [~ComponentPropertyMap](#module_@rzl/ui..ComponentPropertyMap)
            * [new ComponentPropertyMap([src])](#new_module_@rzl/ui..ComponentPropertyMap_new)

<a name="module_@rzl/ui.Component"></a>

### @rzl/ui.Component
RzlUI generic component class.

**Kind**: static class of [<code>@rzl/ui</code>](#module_@rzl/ui)  
**Summary**: Component class constructor.  

* [.Component](#module_@rzl/ui.Component)
    * [new exports.Component([props])](#new_module_@rzl/ui.Component_new)
    * [.state](#module_@rzl/ui.Component+state) : <code>Object</code>

<a name="new_module_@rzl/ui.Component_new"></a>

#### new exports.Component([props])
Constructs a generic RzlUI component with the provided properties.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>Object</code> | <code>{}</code> | [See props](module:@rzl/ui.Component#props) |

<a name="module_@rzl/ui.Component+state"></a>

#### component.state : <code>Object</code>
The current state of this component.

**Kind**: instance property of [<code>Component</code>](#module_@rzl/ui.Component)  
**Summary**: Component state.  
<a name="module_@rzl/ui..ComponentPropertyMap"></a>

### @rzl/ui~ComponentPropertyMap
RzlUI component property class.

**Kind**: inner class of [<code>@rzl/ui</code>](#module_@rzl/ui)  
**Summary**: ComponentPropertyMap constructor.  
<a name="new_module_@rzl/ui..ComponentPropertyMap_new"></a>

#### new ComponentPropertyMap([src])
Constructs a valid map of properties for a RzlUI Component from provided input.


| Param | Type | Description |
| --- | --- | --- |
| [src] | <code>Map</code> \| [<code>Array.&lt;iterable&gt;</code>](#iterable) | The Array of iterable objects to build the map from. |

<a name="iterable"></a>

## iterable : <code>Object</code>
An Array or other iterable object whose elements are key-value pairs
(arrays with two elements, e.g. [[ 1, 'one' ], [ 2, 'two' ]]).

**Kind**: global typedef  
**Summary**: Array-like object containing key-value pairs.  
