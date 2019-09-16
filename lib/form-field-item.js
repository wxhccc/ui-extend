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
/******/ 	return __webpack_require__(__webpack_require__.s = 96);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("./mixins/slots-handler");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = require("./common-field");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("./utils/component");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("./mixins/ref-fn-proxy");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@vue/babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@vue/babel-helper-vue-jsx-merge-props"
var babel_helper_vue_jsx_merge_props_ = __webpack_require__(9);
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external {"root":"ELEMENT","commonjs":"element-ui","commonjs2":"element-ui"}
var external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_ = __webpack_require__(4);

// EXTERNAL MODULE: external "./common-field"
var external_common_field_ = __webpack_require__(40);
var external_common_field_default = /*#__PURE__*/__webpack_require__.n(external_common_field_);

// EXTERNAL MODULE: external "./mixins/slots-handler"
var slots_handler_ = __webpack_require__(16);
var slots_handler_default = /*#__PURE__*/__webpack_require__.n(slots_handler_);

// EXTERNAL MODULE: external "./mixins/ref-fn-proxy"
var ref_fn_proxy_ = __webpack_require__(7);
var ref_fn_proxy_default = /*#__PURE__*/__webpack_require__.n(ref_fn_proxy_);

// EXTERNAL MODULE: external "./utils/component"
var component_ = __webpack_require__(5);

// CONCATENATED MODULE: ./components/form-field-item/main.jsx








/* harmony default export */ var main = ({
  name: 'UeFormFieldItem',
  mixins: [slots_handler_default.a, ref_fn_proxy_default()('formItem', ['resetField', 'clearValidate'])],
  props: {
    value: null,
    props: [Object, Function],
    prop: [String, Number],
    prevProp: Array,
    text: [Boolean, String, Function],
    slots: Object,
    scopedSlots: Object,
    field: {
      type: Object,
      default: () => ({})
    },
    children: Array
  },
  computed: {
    handleValue: {
      get() {
        return this.hasChild ? typeof this.value === 'object' ? this.value : {} : this.value;
      },

      set(val) {
        this.$emit('input', val);
      }

    },

    hasChild() {
      return Array.isArray(this.children) && this.children.length > 0;
    },

    formItemProp() {
      return this.handleFormItemProp(this.prop, this.prevProp);
    },

    formItemProps() {
      return Object(component_["resolveProps"])(this.props);
    },

    formItemSlots() {
      return this.$_mixin_slotsToVNode(this.slots, this.formItemProps.props, ['label', 'default']);
    },

    handledItemText() {
      const {
        prop,
        text,
        handleValue
      } = this;
      return this.handleItemText(text, prop, handleValue);
    },

    handledFieldContent() {
      const {
        prop,
        field,
        hasChild,
        children
      } = this;
      if (!field) return;
      return hasChild ? this.handleMultItems(children) : this.handleFormItemField(prop, field);
    },

    formItemContent() {
      if (this.text) return this.handledItemText;
      return this.handledFieldContent;
    }

  },
  methods: {
    handleValueChange(value, prop) {
      const newValue = this.hasChild ? { ...this.handleValue,
        [prop]: value
      } : value;
      this.$emit('input', newValue);
    },

    handleFormItemProp(prop = '', prevProp) {
      return Array.isArray(prevProp) ? prevProp.concat([prop]).join('.') : prop;
    },

    handleItemText(text, prop, value) {
      return typeof text === 'function' ? text(value, prop) : typeof text !== 'boolean' ? text : value;
    },

    handleChildItemContent(item) {
      const {
        text,
        prop,
        handleValue,
        field
      } = item;
      if (text) return this.handleItemText(text, prop, handleValue[prop]);
      return this.handleFormItemField(prop, field);
    },

    handleFormItemField(prop, field) {
      const h = this.$createElement;
      const value = this.hasChild ? this.handleValue[prop] : this.handleValue;
      return h(external_common_field_default.a, {
        "class": "ue-form-field",
        "attrs": {
          "field": field,
          "value": value
        },
        "on": {
          "input": val => this.handleValueChange(val, prop)
        }
      });
    },

    getChildFormItemVDO(child) {
      const {
        prop,
        props,
        scopedSlots
      } = child;
      const prevProp = Array.isArray(this.prevProp) ? this.prevProp.concat([this.prop]) : [this.prop];
      let vdo = Object(component_["resolveProps"])(props, null, {
        scopedSlots,
        ref: prop
      });
      vdo.props.prop = this.handleFormItemProp(prop, prevProp);
      return vdo;
    },

    handleMultItems(children) {
      const h = this.$createElement;
      const span = 24 / children.length;
      return h(external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["Row"], {
        "attrs": {
          "type": "flex",
          "gutter": 20
        }
      }, [children.map((child, idx) => {
        const {
          key,
          prop,
          colProps,
          fields,
          slots
        } = child;
        const colKey = key || prop || idx;
        const colVdo = colProps ? Object(component_["resolveProps"])(colProps) : {
          props: {
            span
          }
        };
        const formItemVDO = this.getChildFormItemVDO(child);
        const formItemSlots = this.$_mixin_slotsToVNode(slots, ['label', 'default']);
        const formItemContent = this.handleChildItemContent(child);
        return h(external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["Col"], babel_helper_vue_jsx_merge_props_default()([{
          "class": "ue-sub-item-panel"
        }, colVdo, {
          "key": colKey
        }]), [h(external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["FormItem"], babel_helper_vue_jsx_merge_props_default()([{}, formItemVDO]), [formItemContent, formItemSlots])]);
      })]);
    }

  },

  render(h) {
    const {
      formItemProp,
      formItemProps,
      scopedSlots
    } = this;
    return h(external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["FormItem"], babel_helper_vue_jsx_merge_props_default()([{
      "class": "ue-form-field-item",
      "ref": "formItem"
    }, formItemProps, {
      "attrs": {
        "prop": formItemProp
      },
      "scopedSlots": scopedSlots
    }]), [this.formItemContent, this.formItemSlots]);
  }

});
// CONCATENATED MODULE: ./components/form-field-item/index.js


main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var form_field_item = __webpack_exports__["default"] = (main);

/***/ })

/******/ })["default"];