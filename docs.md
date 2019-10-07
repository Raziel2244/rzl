## Modules

<dl>
<dt><a href="#module_@rzl/core">@rzl/core</a></dt>
<dd><p>Rzl core module.</p>
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
Rzl core module.


* [@rzl/core](#module_@rzl/core)
    * [.capitalise(str)](#module_@rzl/core.capitalise) ⇒ <code>string</code>
    * [.randomInt([to], [from])](#module_@rzl/core.randomInt) ⇒ <code>number</code>
    * [.undef(x)](#module_@rzl/core.undef) ⇒ <code>boolean</code>

<a name="module_@rzl/core.capitalise"></a>

### @rzl/core.capitalise(str) ⇒ <code>string</code>
Capitalise the first letter of the given string.

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Capitalise first letter.  
**Returns**: <code>string</code> - The capitalised string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string to capitalise |

<a name="module_@rzl/core.randomInt"></a>

### @rzl/core.randomInt([to], [from]) ⇒ <code>number</code>
Generate a random number in a given range (inclusive).

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Random number generator.  
**Returns**: <code>number</code> - The random number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [to] | <code>number</code> | <code>100</code> | The maximum number to roll |
| [from] | <code>number</code> | <code>1</code> | The minimum number to roll |

<a name="module_@rzl/core.undef"></a>

### @rzl/core.undef(x) ⇒ <code>boolean</code>
Test to see if the given variable is undefined.

**Kind**: static method of [<code>@rzl/core</code>](#module_@rzl/core)  
**Summary**: Test if undefined.  
**Returns**: <code>boolean</code> - The outcome of the test  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Object</code> | The variable to test |

<a name="module_@rzl/ui"></a>

## @rzl/ui
Rzl UI module.

**See**: module:@rzl/core  

* [@rzl/ui](#module_@rzl/ui)
    * [.ComponentPropertyMap](#module_@rzl/ui.ComponentPropertyMap) ⇐ <code>Map</code>
        * [new exports.ComponentPropertyMap([arr])](#new_module_@rzl/ui.ComponentPropertyMap_new)
        * _instance_
            * [.validKeys](#module_@rzl/ui.ComponentPropertyMap+validKeys) ⇒ <code>Array</code>
        * _static_
            * [.is(obj)](#module_@rzl/ui.ComponentPropertyMap.is) ⇒ <code>Boolean</code>
    * [.Component](#module_@rzl/ui.Component)
        * [new exports.Component([props])](#new_module_@rzl/ui.Component_new)
        * [.state](#module_@rzl/ui.Component+state) : <code>Object</code>
        * [._propClass](#module_@rzl/ui.Component+_propClass)
    * [.ComponentFactory](#module_@rzl/ui.ComponentFactory)
        * [new exports.ComponentFactory([props], [type])](#new_module_@rzl/ui.ComponentFactory_new)
        * _instance_
            * [.build([props], [type])](#module_@rzl/ui.ComponentFactory+build) ⇒ <code>Component</code>
        * _static_
            * [.getComponentClass(type)](#module_@rzl/ui.ComponentFactory.getComponentClass) ⇒ <code>Component</code>

<a name="module_@rzl/ui.ComponentPropertyMap"></a>

### @rzl/ui.ComponentPropertyMap ⇐ <code>Map</code>
RzlUI component property class.

**Kind**: static class of [<code>@rzl/ui</code>](#module_@rzl/ui)  
**Summary**: ComponentPropertyMap constructor.  
**Extends**: <code>Map</code>  

* [.ComponentPropertyMap](#module_@rzl/ui.ComponentPropertyMap) ⇐ <code>Map</code>
    * [new exports.ComponentPropertyMap([arr])](#new_module_@rzl/ui.ComponentPropertyMap_new)
    * _instance_
        * [.validKeys](#module_@rzl/ui.ComponentPropertyMap+validKeys) ⇒ <code>Array</code>
    * _static_
        * [.is(obj)](#module_@rzl/ui.ComponentPropertyMap.is) ⇒ <code>Boolean</code>

<a name="new_module_@rzl/ui.ComponentPropertyMap_new"></a>

#### new exports.ComponentPropertyMap([arr])
Constructs a validated Map of properties for a RzlUI Component from
the provided Map or Array of iterable objects.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [arr] | <code>Map</code> \| [<code>Array.&lt;iterable&gt;</code>](#iterable) | <code>[]</code> | The Map or Array of iterables to build from. |

<a name="module_@rzl/ui.ComponentPropertyMap+validKeys"></a>

#### componentPropertyMap.validKeys ⇒ <code>Array</code>
Get an array of valid keys for this ComponentPropertyMap.

**Kind**: instance property of [<code>ComponentPropertyMap</code>](#module_@rzl/ui.ComponentPropertyMap)  
**Summary**: List valid props keys.  
**Returns**: <code>Array</code> - The valid keys  
<a name="module_@rzl/ui.ComponentPropertyMap.is"></a>

#### ComponentPropertyMap.is(obj) ⇒ <code>Boolean</code>
Determines whether or not the provided object is a valid instance of this
class or not.

**Kind**: static method of [<code>ComponentPropertyMap</code>](#module_@rzl/ui.ComponentPropertyMap)  
**Summary**: Check if object is an instance of this class.  
**Returns**: <code>Boolean</code> - The outcome of the test  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to check |

<a name="module_@rzl/ui.Component"></a>

### @rzl/ui.Component
RzlUI generic component class.

**Kind**: static class of [<code>@rzl/ui</code>](#module_@rzl/ui)  
**Summary**: Component class constructor.  

* [.Component](#module_@rzl/ui.Component)
    * [new exports.Component([props])](#new_module_@rzl/ui.Component_new)
    * [.state](#module_@rzl/ui.Component+state) : <code>Object</code>
    * [._propClass](#module_@rzl/ui.Component+_propClass)

<a name="new_module_@rzl/ui.Component_new"></a>

#### new exports.Component([props])
Constructs a generic RzlUI component with the provided properties.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>Map</code> \| [<code>Array.&lt;iterable&gt;</code>](#iterable) | <code>[]</code> | [See props](module:@rzl/ui.Component#props) |

<a name="module_@rzl/ui.Component+state"></a>

#### component.state : <code>Object</code>
The current state of this component.

**Kind**: instance property of [<code>Component</code>](#module_@rzl/ui.Component)  
**Summary**: Component state.  
<a name="module_@rzl/ui.Component+_propClass"></a>

#### component.\_propClass
A local reference to the matching ComponentPropertyMap class for use in
property validation inside class methods.

**Kind**: instance property of [<code>Component</code>](#module_@rzl/ui.Component)  
**Summary**: Matching PropertyMap class.  
<a name="module_@rzl/ui.ComponentFactory"></a>

### @rzl/ui.ComponentFactory
Factory class for mass construction of RzlUI components.

**Kind**: static class of [<code>@rzl/ui</code>](#module_@rzl/ui)  
**Summary**: Component factory constructor.  

* [.ComponentFactory](#module_@rzl/ui.ComponentFactory)
    * [new exports.ComponentFactory([props], [type])](#new_module_@rzl/ui.ComponentFactory_new)
    * _instance_
        * [.build([props], [type])](#module_@rzl/ui.ComponentFactory+build) ⇒ <code>Component</code>
    * _static_
        * [.getComponentClass(type)](#module_@rzl/ui.ComponentFactory.getComponentClass) ⇒ <code>Component</code>

<a name="new_module_@rzl/ui.ComponentFactory_new"></a>

#### new exports.ComponentFactory([props], [type])
Constructs a factory for building RzlUI components, usually with common
properties which can be configured here.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>Map</code> \| [<code>Array.&lt;iterable&gt;</code>](#iterable) | <code>[]</code> | [See defaultProps](module:@rzl/ui.ComponentFactory#defaultProps) |
| [type] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | [See defaultType](module:@rzl/ui.ComponentFactory#defaultType) |

<a name="module_@rzl/ui.ComponentFactory+build"></a>

#### componentFactory.build([props], [type]) ⇒ <code>Component</code>
Build a component using factory defaults and parameters if provided. Build
parameters take priority over factory defaults but the properties will be
built first from defaults and then overloaded by the parameter properties.

**Kind**: instance method of [<code>ComponentFactory</code>](#module_@rzl/ui.ComponentFactory)  
**Summary**: Build a component.  
**Returns**: <code>Component</code> - The built component  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>Map</code> \| [<code>Array.&lt;iterable&gt;</code>](#iterable) | <code>[]</code> | The Map or Array of iterable objects to apply over the factory default props [See defaultProps](module:@rzl/ui.ComponentFactory#defaultProps) |
| [type] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The component type to build instead of default [See defaultType](module:@rzl/ui.ComponentFactory#defaultType) |

<a name="module_@rzl/ui.ComponentFactory.getComponentClass"></a>

#### ComponentFactory.getComponentClass(type) ⇒ <code>Component</code>
Get the component class from the given string. In the case that no match
is found it will call itself again once more with the default factory
component type.

**Kind**: static method of [<code>ComponentFactory</code>](#module_@rzl/ui.ComponentFactory)  
**Summary**: Get the component class  
**Returns**: <code>Component</code> - The component class or null  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The component type |

<a name="iterable"></a>

## iterable : <code>Object</code>
An Array or other iterable object whose elements are key-value pairs
(arrays with two elements, e.g. [[ 1, 'one' ], [ 2, 'two' ]]).

**Kind**: global typedef  
**Summary**: Array-like object containing key-value pairs.  
