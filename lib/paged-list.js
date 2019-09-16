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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
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

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/theme-chalk/base.css");

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/loading");

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(3).default
var update = add("6bcbd593", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}
// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


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

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// Module
exports.push([module.i, ".ue-paged-list .pagination-container {\n  margin-top: 4px;\n  padding: 18px 0;\n  text-align: center;\n  background-color: #fff;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n", ""]);



/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("./mixins/component-storage");

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/paged-list/main.vue?vue&type=template&id=201fb1f2&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ue-paged-list" },
    [
      _vm.loading
        ? _c("ue-loading", _vm._b({}, "ue-loading", _vm.handledLoading, false))
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default", null, { rows: _vm.dataList }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "pagination-container" },
        [
          _vm.isPaginationShow
            ? _c(
                "ue-pagination",
                _vm._g(
                  _vm._b(
                    {
                      attrs: {
                        "page-size": _vm.pageSize,
                        "current-page": _vm.curPage,
                        total: _vm.dataTotal
                      },
                      on: {
                        "update:currentPage": function($event) {
                          _vm.curPage = $event
                        },
                        "update:current-page": function($event) {
                          _vm.curPage = $event
                        },
                        "size-change": _vm.handleSizeChange
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function() {
                              return [_vm._t("pagination-layout")]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    "ue-pagination",
                    _vm.handlePagination,
                    false
                  ),
                  _vm.paginationEvents
                )
              )
            : _vm._e()
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./components/paged-list/main.vue?vue&type=template&id=201fb1f2&

// EXTERNAL MODULE: ./src/ui-comps/loading/index.js + 1 modules
var loading = __webpack_require__(36);

// EXTERNAL MODULE: external {"root":"ELEMENT","commonjs":"element-ui","commonjs2":"element-ui"}
var external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_ = __webpack_require__(4);

// EXTERNAL MODULE: external "./mixins/component-storage"
var component_storage_ = __webpack_require__(8);
var component_storage_default = /*#__PURE__*/__webpack_require__.n(component_storage_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./components/paged-list/main.vue?vue&type=script&lang=js&
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


const propsDefault = {
  background: true
};
/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'UePagedList',
  components: {
    'UeLoading': loading["default"],
    'UePagination': external_root_ELEMENT_commonjs_element_ui_commonjs2_element_ui_["Pagination"]
  },
  mixins: [component_storage_default()()],
  props: {
    paginationProps: Object,
    paginationEvents: Object,
    loading: {
      type: Boolean,
      default: false
    },
    loadingProps: {
      type: [String, Object],
      default: '给我一点时间'
    },
    pagedData: Object,
    propKeys: Object,
    extraForm: Object,
    getPagedData: {
      type: Function,
      default: () => () => {}
    },
    refresh: Boolean,
    storeKey: {
      type: String,
      default: 'data'
    },
    initData: Object,
    fetchAccessKey: [Number, String],
    createdAutoSend: Boolean,
    restore: Boolean,
    needStore: Boolean
  },

  data() {
    const {
      storeKey,
      restore,
      initData
    } = this;
    return Object.assign({
      pageSize: 20,
      curPage: 1
    }, initData, {
      $_isRestoring: restore,
      $_oldExtraForm: {}
    }, restore && this.$_mixin_storeSession('pagination', storeKey));
  },

  created() {
    this.createdAutoSend && this.getInitPageData();
  },

  computed: {
    handledPropKey() {
      return Object.assign({
        total: 'total',
        rows: 'rows',
        pageSize: 'size',
        curPage: 'page'
      }, this.propKeys);
    },

    orderRules() {
      this.curPage = 1;
      return this.orderRules;
    },

    handlePagination() {
      return Object.assign({}, propsDefault, this.paginationProps);
    },

    handledLoading() {
      const {
        loadingProps
      } = this;
      return typeof loadingProps === 'string' ? {
        text: loadingProps
      } : loadingProps;
    },

    dataList() {
      const {
        rows
      } = this.handledPropKey;
      return this.pagedData && Array.isArray(this.pagedData[rows]) ? this.pagedData[rows] : [];
    },

    dataTotal() {
      const {
        total
      } = this.handledPropKey;
      return this.pagedData && this.pagedData[total] ? Number(this.pagedData[total]) : 0;
    },

    params() {
      const {
        pageSize,
        curPage
      } = this.handledPropKey;
      return Object.assign({}, this.extraForm, {
        [pageSize]: this.pageSize,
        [curPage]: this.curPage
      });
    },

    isPaginationShow() {
      const {
        restore,
        curPage,
        dataTotal
      } = this;
      return curPage === 1 || !restore || restore && dataTotal;
    }

  },
  watch: {
    'extraForm': {
      handler: 'handleExtraForm',
      deep: true
    },
    'params': 'sendFetchParam',
    'refresh': 'refreshList'
  },
  $_ue_methods: ['getStoreData', 'sendRequest', 'clearStoreData'],
  methods: {
    /** utils **/
    getInitPageData() {
      const {
        restore,
        $_mixin_storeSession,
        storeKey
      } = this;

      if (restore && $_mixin_storeSession('params', storeKey)) {
        Promise.resolve(this.getPagedData($_mixin_storeSession('params', storeKey))).finally(() => {
          this.$_isRestoring = false;
        });
      } else {
        this.sendFetchParam();
      }
    },

    /** bussiness **/
    handleExtraForm(newVal, oldVal) {
      const {
        $_oldExtraForm
      } = this;

      if (newVal !== oldVal || JSON.stringify(newVal) !== $_oldExtraForm) {
        this.$_oldExtraForm = JSON.stringify(newVal);
        this.curPage = 1;
        this.$emit('extra-form-change', newVal, this.$_oldExtraForm);
      }
    },

    sendFetchParam() {
      if (this.$_isRestoring) return;
      this.needStore && this.storeData();
      const fetchAccessKey = this.fetchAccessKey || +new Date();
      this.getPagedData(this.params, fetchAccessKey);
    },

    refreshList(newVal) {
      if (newVal) {
        this.sendFetchParam();
        this.$emit('update:refresh', false);
      }
    },

    storeData() {
      const {
        curPage,
        pageSize
      } = this;
      this.$_mixin_storeSession('pagination', this.storeKey, {
        curPage,
        pageSize
      });
      this.$_mixin_storeSession('params', this.storeKey, this.params);
    },

    /** public methods **/
    getStoreData() {
      return {
        pagination: this.$_mixin_storeSession('pagination', this.storeKey),
        params: this.$_mixin_storeSession('params', this.storeKey)
      };
    },

    sendRequest() {
      this.sendFetchParam();
    },

    clearStoreData(module = ['params', 'pagination']) {
      const modules = Array.isArray(module) ? module : [module];
      modules.forEach(item => {
        this.$_mixin_storeSession(item, this.storeKey, null, true);
      });
    },

    /** events **/
    handleSizeChange(val) {
      this.pageSize = val;
    }

  }
});
// CONCATENATED MODULE: ./components/paged-list/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var paged_list_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./components/paged-list/main.vue?vue&type=style&index=0&lang=scss&
var mainvue_type_style_index_0_lang_scss_ = __webpack_require__(62);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./components/paged-list/main.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  paged_list_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "components/paged-list/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./components/paged-list/index.js


main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var paged_list = __webpack_exports__["default"] = (main);

/***/ })

/******/ })["default"];