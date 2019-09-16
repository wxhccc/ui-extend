"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFfiRulesProps = createFfiRulesProps;
exports.createFormFieldItem = createFormFieldItem;
exports.createInputFormItem = createInputFormItem;
exports.createRadiosFormItem = createRadiosFormItem;
exports.createSelectFormItem = createSelectFormItem;
exports.createDateFormItem = createDateFormItem;
exports.createTableColumn = createTableColumn;
exports.formatters = exports.dateFormatter = exports.createOption = void 0;

var _utils = require("../utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 下拉默认项
var createOption = function createOption(defaultVal) {
  var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '全部';
  return [{
    value: typeof defaultVal !== 'undefined' ? defaultVal : 0,
    label: label
  }];
}; // 时间格式化函数


exports.createOption = createOption;

var dateFormatter = function dateFormatter() {
  var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (row, column, cellValue, index) {
    return (0, _utils.dateFormat)(cellValue, format);
  };
}; // 生成FormFieldItem组件的props属性对象


exports.dateFormatter = dateFormatter;

function createFfiRulesProps(label, required) {
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var others = arguments.length > 3 ? arguments[3] : undefined;
  return _objectSpread({
    label: label,
    rules: (required ? [{
      required: true,
      message: typeof required === 'string' ? required : '请输入' + label,
      trigger: 'blur'
    }] : []).concat(rules)
  }, others);
} // 生成FormFieldItem组件的配置对象


function createFormFieldItem(component, label, prop) {
  var fieldExtra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var extraProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return _objectSpread({
    props: _typeof(label) === 'object' ? label : {
      label: label
    },
    field: _objectSpread({
      component: component
    }, fieldExtra),
    prop: prop
  }, extraProps);
} // 生成输入框表单项配置对象


function createInputFormItem(label, prop, placeholder) {
  var extraProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var slots = arguments.length > 4 ? arguments[4] : undefined;
  var slotComp = typeof slots === 'string' ? {
    slots: {
      'append': {
        component: 'div',
        text: slots
      }
    }
  } : slots;
  return createFormFieldItem('ElInput', label, prop, _objectSpread({
    props: _typeof(placeholder) === 'object' ? placeholder : {
      placeholder: placeholder || '请输入' + label
    }
  }, slotComp), extraProps);
} // 生成单选表单项配置对象


function createRadiosFormItem(label, prop, data, fieldExtra, extraProps) {
  return createFormFieldItem('ElRadioGroup', label, prop, _objectSpread({
    data: data
  }, fieldExtra), extraProps);
} // 生成下拉表单项配置对象


function createSelectFormItem(label, prop, data, allDef, placeholder, fieldExtra, extraProps) {
  return createFormFieldItem('ElSelect', label, prop, _objectSpread({
    data: (allDef !== false ? createOption(allDef) : []).concat(Array.isArray(data) ? data : []),
    props: _typeof(placeholder) === 'object' ? placeholder : {
      placeholder: placeholder
    }
  }, fieldExtra), extraProps);
}

var dateTypeProps = function dateTypeProps() {
  return {
    date: {
      type: 'date',
      valueFormat: 'timestamp'
    },
    daterange: {
      type: 'daterange',
      valueFormat: 'yyyy-MM-dd',
      defaultTime: ['00:00:00', '23:59:59'],
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  };
}; // 生成时间表单项配置对象


function createDateFormItem(label, prop, type, fieldExtra, extraProps) {
  var typeProps = dateTypeProps();
  return createFormFieldItem('ElDatePicker', label, prop, _objectSpread({
    props: _typeof(type) === 'object' ? type : typeProps[type] || {
      type: type
    }
  }, fieldExtra), extraProps);
} // 生成表格表头配置对象


function createTableColumn(label, prop, others) {
  return _objectSpread({
    label: label,
    prop: prop
  }, others);
}

var formatters = {
  moneyFormatter: function moneyFormatter(row, column, cellValue) {
    return cellValue && (0, _utils.commaNum)(cellValue, '0,0.00');
  }
};
exports.formatters = formatters;