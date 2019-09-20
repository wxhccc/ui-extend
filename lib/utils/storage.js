"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedStorage = namedStorage;
exports["default"] = exports.UEStorage = void 0;

var _store = _interopRequireDefault(require("store2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UEStorage = function UEStorage(component) {
  return _store["default"].namespace("UiExtend".concat(component ? '.' + component : ''));
};

exports.UEStorage = UEStorage;

function namedStorage(namespace) {
  return _store["default"].namespace(namespace);
}

var _default = _store["default"];
exports["default"] = _default;