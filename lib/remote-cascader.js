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
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
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

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/remote-cascader/main.vue?vue&type=template&id=023181de&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ue-cascader",
    _vm._g(
      _vm._b(
        {
          attrs: {
            options: _vm.options,
            props: _vm.props,
            disabled: _vm.initLoading
          },
          model: {
            value: _vm.handleValue,
            callback: function($$v) {
              _vm.handleValue = $$v
            },
            expression: "handleValue"
          }
        },
        "ue-cascader",
        _vm.$attrs,
        false
      ),
      _vm.listeners
    )
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./components/remote-cascader/main.vue?vue&type=template&id=023181de&

// EXTERNAL MODULE: external {"root":"ELEMENT","commonjs":"element-ui","commonjs2":"element-ui"}
var external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./components/remote-cascader/main.vue?vue&type=script&lang=js&
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

/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: "UeRemoteCascader",
  components: {
    UeCascader: external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["Cascader"]
  },
  props: {
    load: {
      type: Function,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    initFirstChange: Boolean,
    initValue: Array,
    initInOrder: Boolean,
    isResolve: Boolean
  },

  data() {
    return {
      rootFetch: null,
      initLoading: false,
      options: [],
      listeners: Object.assign({}, this.$listeners, !this.isResolve ? {
        'active-item-change': this.handleItemChange
      } : {}, {
        change: this.getFullValue
      })
    };
  },

  created() {
    this.initFirstChange && this.$once('value-init', this.fetchInitValue);
    !this.isResolve && (this.value.length ? this.fetchInitValue(this.value) : this.handleItemChange(this.value));
  },

  computed: {
    handleValue: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit("input", val);
      }

    },

    props() {
      return Object.assign({
        value: 'value',
        label: 'label',
        children: 'children'
      }, this.$attrs.props, this.isResolve ? {
        lazy: true,
        lazyLoad: this.lazyLoad
      } : {});
    }

  },
  watch: {
    value(newVal) {
      this.$emit('value-init', newVal);
    },

    initValue(newVal) {
      if (Array.isArray(newVal)) {
        this.fetchInitValue(newVal);
        this.handleValue = newVal;
      }
    }

  },
  methods: {
    async handleItemChange(value) {
      !this.options.length && (this.options = await this.getRootList());
      let lastItem = this.options;
      const {
        value: valueProp,
        label,
        children
      } = this.props;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i];
          let curItem = lastItem && lastItem.find(item => item[valueProp] === val);
          curItem && curItem[children] && !curItem[children].length && (curItem[children] = await this.fetchReturnHandle(i + 1, val, value, curItem));
          lastItem = curItem && curItem[children];
        }
      }
    },

    getRootList() {
      this.rootFetch = this.fetchReturnHandle(0);
      return this.rootFetch;
    },

    async lazyLoad(node, resolve) {
      const {
        level,
        value,
        path,
        data
      } = node;
      const result = await this.fetchReturnHandle(level, value, path, data, node);
      resolve(Array.isArray(result) ? result : []);
    },

    async fetchReturnHandle(...args) {
      const value = await this.load(...args);
      return Array.isArray(value) ? value : [];
    },

    fetchInitValue(originValues) {
      const values = originValues.slice(0);
      if (!Array.isArray(values) || !values.length) return;

      if (this.isResolve) {
        this.initLoading = true;
      }

      if (this.initInOrder) {
        this.handleItemChange(values).finally(this.resoveReady);
      } else {
        this.fetchAtSomeTime(values);
      }
    },

    fetchAtSomeTime(values) {
      const fetchQueue = values.map((val, index) => {
        return index === 0 && this.rootFetch ? this.rootFetch : this.fetchReturnHandle(index, val, values);
      });
      return Promise.all(fetchQueue).then(results => {
        const {
          value,
          label,
          children
        } = this.props;
        !this.options.length && Array.isArray(results[0]) && (this.options = results[0]);
        let parentNode = this.options;
        values.forEach((val, index) => {
          const curNode = parentNode.find(item => item[value] === val);
          curNode && curNode[children] && !curNode[children].length && results[index + 1] && (curNode[children] = results[index + 1]);
          parentNode = curNode && curNode[children];
        });
      }).catch(() => {}).finally(this.resoveReady);
    },

    resoveReady() {
      this.initLoading = false;
    },

    getFullValue(value) {
      this.$emit('change', value);
      let lastItem = this.options;
      const fullValues = value.map((val, index) => {
        const curItem = lastItem.find(item => item.value === val);
        lastItem = curItem ? curItem.children : [];
        return curItem;
      });
      this.$emit("on-change", fullValues);
    },

    modifyOptions(handler) {
      typeof handler === 'function' && handler(this.options);
    }

  }
});
// CONCATENATED MODULE: ./components/remote-cascader/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var remote_cascader_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./components/remote-cascader/main.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  remote_cascader_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/remote-cascader/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./components/remote-cascader/index.js


main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var remote_cascader = __webpack_exports__["default"] = (main);

/***/ })

/******/ })["default"];