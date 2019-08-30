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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("ui-extends/lib/utils/lodash");

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("ui-extend/lib/form-field-item");

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/form-fields/main.vue?vue&type=template&id=0d878a01&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ue-form-fields" },
    [
      _vm._l(_vm.handledItems, function(item, index) {
        return [
          item.component
            ? _c(
                item.component,
                _vm._g(
                  _vm._b(
                    {
                      key: _vm.getItemKey(item, index),
                      ref: item.prop || item.key,
                      refInFor: true,
                      tag: "component",
                      attrs: { value: _vm.getValue(item.prop) },
                      on: {
                        input: function($event) {
                          return _vm.setValue(item.prop, $event)
                        }
                      }
                    },
                    "component",
                    _vm.getCustomItemProps(item),
                    false
                  ),
                  item.fieldEvents
                )
              )
            : _c(
                "ue-form-field-item",
                _vm._b(
                  {
                    key: _vm.getItemKey(item, index),
                    ref: item.prop || item.key,
                    refInFor: true,
                    attrs: { value: _vm.getValue(item.prop) },
                    on: {
                      input: function($event) {
                        return _vm.setValue(item.prop, $event)
                      }
                    }
                  },
                  "ue-form-field-item",
                  _vm.getFormFieldProps(item),
                  false
                )
              )
        ]
      }),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./components/form-fields/main.vue?vue&type=template&id=0d878a01&

// EXTERNAL MODULE: external "ui-extend/lib/form-field-item"
var form_field_item_ = __webpack_require__(10);
var form_field_item_default = /*#__PURE__*/__webpack_require__.n(form_field_item_);

// EXTERNAL MODULE: external "ui-extends/lib/utils/lodash"
var lodash_ = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./components/form-fields/main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const {
  hasOwnProperty: mainvue_type_script_lang_js_hasOwnProperty
} = Object.prototype;
const formFieldItemProps = Object.keys(form_field_item_default.a.props);
/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'UeFormFields',
  components: {
    FormFieldItem: form_field_item_default.a
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    delayUpdate: Boolean
  },

  data() {
    return {
      cacheValue: {},
      handledItems: this.handleFormItems()
    };
  },

  created() {
    this.watchModel();
    this.resetFieldData();
  },

  watch: {
    items() {
      this.handledItems = this.handleFormItems();
      this.watchModel();
      this.resetFieldData();
    }

  },
  $_ue_methods: ['callItemMethod'],
  methods: {
    /** public methods **/
    callItemMethod(prop, fnName, ...args) {
      this.$refs[prop] && this.$refs[prop][0] && typeof this.$refs[prop][0][fnName] === 'function' && this.$refs[prop][0][fnName](...args);
    },

    /** utils **/
    getValue(prop) {
      return prop ? this.value[prop] : this.value;
    },

    setValue(prop, value) {
      const newValue = Object.assign({}, this.value, prop ? {
        [prop]: value
      } : value);
      this.delayUpdate ? this.setValueDelay(prop, value) : this.$emit('input', newValue);
    },

    setValueDelay(prop, value) {
      setTimeout(() => {
        this.cacheValue = Object.assign({}, this.value, prop ? {
          [prop]: value
        } : value);
        this.$emit('input', this.cacheValue);
        this.cacheValue = {};
      }, 0);
    },

    handleFormItems() {
      return Object(lodash_["cloneDeep"])(this.items.filter(item => typeof item.hide === 'function' ? !item.hide() : !item.hide));
    },

    getItemKey(item, index) {
      return item.key || item.prop || index;
    },

    getCustomItemProps(item) {
      const {
        props,
        cascadeData,
        cascaderHandler
      } = item;
      const handledProps = typeof props === 'function' ? props() : props;
      return Object.assign({}, handledProps, {
        cascadeData
      });
    },

    getFormFieldProps(item) {
      return Object(lodash_["pick"])(item, formFieldItemProps);
    },

    // model值动态watch
    watchModel() {
      this.handledItems.forEach(item => {
        item.cascadeModel && this.listenCascader(item);
      });
    },

    initCascaderFields() {
      this.handledItems.forEach(item => {
        item.__watchers && item.__watchers.forEach(watcher => watcher(this.value[item.prop], true));
      });
    },

    changeHandler(item, value) {
      const {
        __watchers
      } = item;
      Array.isArray(__watchers) && __watchers.forEach(watcher => watcher(value));
    },

    resetFieldData() {
      this.handledItems.forEach(item => {
        const {
          cascadeModel
        } = item;
        cascadeModel && mainvue_type_script_lang_js_hasOwnProperty.call(this.value, cascadeModel) && this.cascaderHandler(item, this.value[cascadeModel], true);
      });
    },

    cascaderHandler(item, value, init) {
      const {
        field,
        cascadeData,
        spliceStart,
        clearValue,
        prop,
        cascadeHandler
      } = item;
      const modelData = cascadeData && Array.isArray(cascadeData[value]) ? cascadeData[value] : [];

      if (typeof cascadeHandler === 'function') {
        cascadeHandler.call(this, value, prop, modelData, item);
      } else if (field) {
        let {
          data
        } = field;
        Array.isArray(data) ? data.splice(spliceStart || 0, data.length, ...modelData) : this.$set(field, 'data', modelData);
      }

      if (!init && prop && mainvue_type_script_lang_js_hasOwnProperty.call(this.value, prop)) {
        this.setValueDelay(prop, clearValue);
        this.changeHandler(item, this.value[prop]);
      }
    },

    // 级联数据项监听器
    listenCascader(item) {
      const {
        cascadeModel
      } = item;
      const cascaderField = this.handledItems.find(item => item.prop === cascadeModel);
      if (!cascaderField) return;
      const changeListener = {
        change: this.changeHandler.bind(this, cascaderField)
      };

      if (cascaderField.component) {
        cascaderField.fieldEvents = Object.assign({}, cascaderField.fieldEvents, changeListener);
      } else {
        !cascaderField.field && (cascaderField.field = {});
        cascaderField.field.events = Object.assign({}, cascaderField.field.events, changeListener);
      }

      !cascaderField.__watchers && (cascaderField.__watchers = []);

      cascaderField.__watchers.push(this.cascaderHandler.bind(this, item));
    }

  }
});
// CONCATENATED MODULE: ./components/form-fields/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_fields_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./components/form-fields/main.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  form_fields_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/form-fields/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./components/form-fields/index.js


main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var form_fields = __webpack_exports__["default"] = (main);

/***/ })

/******/ })["default"];