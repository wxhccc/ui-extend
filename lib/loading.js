module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/theme-chalk/base.css");

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/loading");

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/theme-chalk/loading.css");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "element-ui/lib/theme-chalk/loading.css"
var loading_css_ = __webpack_require__(32);

// EXTERNAL MODULE: external "element-ui/lib/theme-chalk/base.css"
var base_css_ = __webpack_require__(14);

// EXTERNAL MODULE: external "element-ui/lib/loading"
var loading_ = __webpack_require__(15);
var loading_default = /*#__PURE__*/__webpack_require__.n(loading_);

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_ = __webpack_require__(33);

// CONCATENATED MODULE: ./src/ui-comps/loading/loading.jsx




/* harmony default export */ var loading = ({
  name: 'UeLoading',
  props: {
    body: Boolean,
    text: String,
    spinner: String,
    lock: Boolean,
    background: String
  },

  data() {
    return {
      $loadingInstance: null
    };
  },

  created() {
    const {
      body,
      _props
    } = this;
    this.$loadingInstance = loading_default.a.service({
      target: body ? document.body : this.$parent.$el,
      ..._props
    });
  },

  beforeDestroy() {
    this.$loadingInstance.close();
  },

  render(h) {
    return '';
  }

});
// CONCATENATED MODULE: ./src/ui-comps/loading/index.js


loading.install = function (Vue) {
  Vue.component(loading.name, loading);
};

/* harmony default export */ var ui_comps_loading = __webpack_exports__["default"] = (loading);

/***/ })

/******/ })["default"];