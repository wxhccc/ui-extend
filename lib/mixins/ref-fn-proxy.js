"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.pluginFnProxyMixin = pluginFnProxyMixin;

function _default(refKey) {
  var methodNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var includePrivate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var methods = {};
  methodNames.forEach(function (name) {
    if (!includePrivate && name.indexOf('$_UE_') === 0) return;

    methods[name] = function () {
      var _this$$refs$refKey;

      this.$refs[refKey] && typeof this.$refs[refKey][name] === 'function' && (_this$$refs$refKey = this.$refs[refKey])[name].apply(_this$$refs$refKey, arguments);
    };
  });
  return {
    methods: methods
  };
}

function pluginFnProxyMixin(instanceKey) {
  var methodNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var methods = {};
  methodNames.forEach(function (name) {
    methods[name] = function () {
      var _this$instanceKey;

      this[instanceKey] && typeof this[instanceKey][name] === 'function' && (_this$instanceKey = this[instanceKey])[name].apply(_this$instanceKey, arguments);
    };
  });
  return {
    methods: methods
  };
}