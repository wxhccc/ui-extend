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
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("ui-extends/lib/utils/lodash");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("ui-extends/lib/mixins/slots-handler");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("ui-extends/lib/utils/component");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@vue/babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@vue/babel-helper-vue-jsx-merge-props"
var babel_helper_vue_jsx_merge_props_ = __webpack_require__(9);
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "ui-extends/lib/utils/lodash"
var lodash_ = __webpack_require__(1);

// EXTERNAL MODULE: external "ui-extends/lib/utils/component"
var component_ = __webpack_require__(5);

// EXTERNAL MODULE: external "ui-extends/lib/mixins/slots-handler"
var slots_handler_ = __webpack_require__(16);
var slots_handler_default = /*#__PURE__*/__webpack_require__.n(slots_handler_);

// CONCATENATED MODULE: ./components/common-field/main.jsx




const fieldChild = {
  Select: 'Option',
  CheckboxGroup: 'Checkbox',
  RadioGroup: 'Radio'
};
/* harmony default export */ var main = ({
  name: 'UeCommonField',
  mixins: [slots_handler_default.a],
  props: {
    value: null,
    libPrefix: {
      type: String,
      default: 'El'
    },
    field: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    fieldValue: {
      get() {
        return this.field.initValue && typeof this.value === 'undefined' ? Object(lodash_["cloneDeep"])(this.field.initValue) : Object(lodash_["cloneDeep"])(this.value);
      },

      set(value) {
        const handleVal = typeof value === 'string' && this.field.isNumber ? this.parseNumber(value) : value;
        this.$emit('input', handleVal);
      }

    },

    fieldVDO() {
      const {
        props,
        events
      } = this.field;
      const handleEvents = Object.assign({}, this.$listeners, events, {
        input: val => this.fieldValue = val
      });
      return Object(component_["resolveProps"])(props, handleEvents, {
        ref: 'field'
      });
    },

    childField() {
      const {
        childComponent,
        component
      } = this.field;
      if (childComponent) return childComponent;

      if (typeof component === 'string') {
        const noPrefixName = component.replace(this.libPrefix, '');
        return fieldChild[noPrefixName] ? this.libPrefix + fieldChild[noPrefixName] : '';
      }
    },

    isItemNeedFixed() {
      const {
        childField,
        forbidValueFixed
      } = this;
      if (forbidValueFixed) return false;
      const childFieldName = typeof childField === 'string' ? childField : childField && childField.name;
      return ['ElRadio', 'ElCheckbox'].includes(childFieldName);
    },

    dataChildren() {
      const {
        field: {
          data
        },
        childField
      } = this;
      return Array.isArray(data) && data.length && childField ? data.map(this.createDataItem) : null;
    },

    slotChildren() {
      const {
        field: {
          slots
        },
        $createElement: h
      } = this;
      if (!slots) return;
      const workSlots = slots.component ? {
        default: slots
      } : slots;
      return this.$_mixin_slotsToVNode(workSlots);
    }

  },
  $_ue_methods: ['callFieldMethod'],
  methods: {
    /** public methods **/
    callFieldMethod(fn, ...args) {
      const {
        field
      } = this.$refs;
      if (field && typeof field[fn] === 'function') return field[fn](...args);
    },

    /** utils **/
    parseNumber(value) {
      return Number.isNaN(Number.parseFloat(value)) ? value : Number.parseFloat(value);
    },

    createDataItem(item, index) {
      const {
        field: {
          dataItemContent
        },
        $createElement: h,
        isItemNeedFixed,
        childField
      } = this;
      const {
        value,
        label
      } = item;
      const childNodes = dataItemContent && (typeof dataItemContent === 'function' ? dataItemContent(h, item, index) : h(dataItemContent, {
        props: {
          item,
          index
        }
      }));
      return isItemNeedFixed ? h(childField, {
        props: {
          label: value
        }
      }, childNodes ? [childNodes] : [label]) : h(childField, {
        props: item
      }, [childNodes]);
    }

  },

  render(h) {
    const {
      field: {
        component: Field,
        data,
        scopedSlots
      },
      fieldVDO,
      dataChildren,
      slotChildren
    } = this;
    if (!Field) return;
    return h(Field, babel_helper_vue_jsx_merge_props_default()([{}, fieldVDO, {
      "attrs": {
        "value": this.fieldValue
      },
      "scopedSlots": scopedSlots
    }]), [dataChildren, slotChildren]);
  }

});
// CONCATENATED MODULE: ./components/common-field/index.js


main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var common_field = __webpack_exports__["default"] = (main);

/***/ })

/******/ })["default"];