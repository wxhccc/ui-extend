"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = require("../utils/lodash");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default() {
  var initData = null;
  return {
    watch: {
      '$route': '_ue_refreshRoute'
    },
    methods: {
      $_mixin_initData: function $_mixin_initData(constData, dynamicData) {
        if (_typeof(constData) !== 'object') return {};
        initData = constData;
        return Object.assign({}, (0, _lodash.cloneDeep)(initData), dynamicData);
      },
      _ue_resetVueData: function _ue_resetVueData() {
        initData && Object.assign(this.$data, (0, _lodash.cloneDeep)(initData));
      },
      _ue_refreshRoute: function _ue_refreshRoute(to, from) {
        this._ue_resetVueData();

        typeof this.initRouteState === 'function' && this.initRouteState();
      }
    }
  };
}