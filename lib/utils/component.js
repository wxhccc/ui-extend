"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicMethodNames = getPublicMethodNames;
exports.getComponentFnProxy = getComponentFnProxy;
exports.resolveProps = resolveProps;

var _refFnProxy = _interopRequireDefault(require("ui-extends/lib/mixins/ref-fn-proxy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPublicMethodNames() {
  for (var _len = arguments.length, components = new Array(_len), _key = 0; _key < _len; _key++) {
    components[_key] = arguments[_key];
  }

  return components.reduce(function (acc, cur) {
    return cur && Array.isArray(cur.$_ue_methods) ? acc.concat(cur.$_ue_methods) : acc;
  }, []);
}

function getComponentFnProxy(component, ref) {
  return (0, _refFnProxy["default"])(ref || component.name, component.$_ue_methods);
} // resolve props object to Vue Data Object


function resolveProps(props, events, other) {
  var handledProps = typeof props === 'function' ? props() : props || {};
  return _objectSpread({
    "class": handledProps["class"],
    style: handledProps.style,
    props: handledProps,
    attrs: handledProps,
    on: events
  }, other);
}