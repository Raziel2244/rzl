"use strict";

const ui = require("../lib/ui");

test("Creates and validates ComponentPropertyMap with args", () => {
	const cpm = new ui.ComponentPropertyMap([
		[ "name", "Test" ],
		[ "invalid", 5 ]
	]);

	expect(typeof cpm).toBe("object");
	expect(ui.ComponentPropertyMap.is(cpm)).toBeTruthy();
	expect(cpm.size).toBe(1);
	expect(cpm.get("name")).toBe("Test");
	expect(cpm.get("invalid")).toBeUndefined();
});

test("Creates and validates ComponentPropertyMap without args", () => {
	const cpm = new ui.ComponentPropertyMap();

	expect(typeof cpm).toBe("object");
	expect(ui.ComponentPropertyMap.is(cpm)).toBeTruthy();
	expect(cpm.size).toBe(0);
});

test("Creates and validates Component with args", () => {
	const cpm = new ui.ComponentPropertyMap([["name","Test"]]);
	const component = new ui.Component(cpm);

	expect(typeof component).toBe("object");
	expect(component._propClass).toEqual(ui.ComponentPropertyMap);
	expect(component._propClass.is(component._props)).toBeTruthy();
	expect(component.state).toEqual({});
});

test("Creates and validates Component without args", () => {
	const component = new ui.Component();

	expect(component instanceof ui.Component).toBeTruthy();
	expect(component._propClass).toEqual(ui.ComponentPropertyMap);
	expect(component._propClass.is(component._props)).toBeTruthy();
	expect(component.state).toEqual({});
});

test("ComponentFactory gets correct Component classes", () => {
	expect(ui.ComponentFactory.getComponentClass()).toBeNull();
	expect(ui.ComponentFactory.getComponentClass("invalid")).toBeNull();
	expect(ui.ComponentFactory.getComponentClass("generic")).toBe(ui.Component);
});

test("Creates factory with args that builds valid Components", () => {
	const factory = new ui.ComponentFactory([["name","default"]],"generic");
	const built = [
		factory.build([["blueprint",{}],["invalid",1]]),
		factory.build([["name","override"]]),
		factory.build()
	];

	expect(factory instanceof ui.ComponentFactory).toBeTruthy();
	expect(Array.isArray(factory._defaultProps)).toBeTruthy();
	expect(typeof factory._defaultType).toBe("string");

	expect(built[0] instanceof ui.Component).toBeTruthy();
	expect(built[0]._props.size).toBe(2);
	expect(built[0]._props.get("name")).toBe("default");
	expect(built[0]._props.get("blueprint")).toEqual({});

	expect(built[1] instanceof ui.Component).toBeTruthy();
	expect(built[1]._props.size).toBe(1);
	expect(built[1]._props.get("name")).toBe("override");

	expect(built[2] instanceof ui.Component).toBeTruthy();
	expect(built[2]._props.size).toBe(1);
	expect(built[2]._props.get("name")).toBe("default");

});

test("Creates factory without args that builds valid Components", () => {
	const factory = new ui.ComponentFactory();
	const built = [
		factory.build([["blueprint",{}],["invalid",1]]),
		factory.build()
	];

	expect(factory instanceof ui.ComponentFactory).toBeTruthy();
	expect(Array.isArray(factory._defaultProps)).toBeTruthy();
	expect(factory._defaultType).toBe("generic");

	expect(built[0] instanceof ui.Component).toBeTruthy();
	expect(built[0]._props.size).toBe(1);
	expect(built[0]._props.get("blueprint")).toEqual({});

	expect(built[1] instanceof ui.Component).toBeTruthy();
	expect(built[1]._props.size).toBe(0);
});

test("Creates factory with invalid type that builds generic components", () => {
	const factory = new ui.ComponentFactory([],"invalid");
	const built = [
		factory.build([],"generic"),
		factory.build()
	];

	expect(built[0] instanceof ui.Component).toBeTruthy();
	expect(built[1] instanceof ui.Component).toBeTruthy();
});
