"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _storage = require("ui-extends/lib/utils/storage");

function _default() {
  return {
    beforeCreate: function beforeCreate() {
      this.$storage = (0, _storage.UEStorage)(this.$options.name);
    },
    methods: {
      $_mixin_storeSession: function $_mixin_storeSession(module, key, value, clearKey) {
        if (typeof module !== 'string') return;
        var data = this.$storage.session(module) || {};

        if (typeof value !== 'undefined' || clearKey) {
          clearKey ? delete data[key] : data[key] = value;
          this.$storage.session(module, data);
        } else {
          return data[key];
        }
      }
    }
  };
}