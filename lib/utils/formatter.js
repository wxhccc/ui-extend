"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commaNum = commaNum;
exports.percent = percent;
exports.secondStringify = secondStringify;
exports.dateFormat = dateFormat;

var _numeral = _interopRequireDefault(require("numeral"));

var _fecha = _interopRequireDefault(require("fecha"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
** 将数字转化为需要的格式的字符串，使用numeral转化
* {number} value 需要格式转化的数字
* {string} format 转化格式的字符串
** 返回值: {string} 返回转化后的字符串
***/
function commaNum(value) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0,0';
  return typeof format === 'string' ? (0, _numeral["default"])(value).format(format) : value;
}
/***
** 将数字转化为百分比格式字符串，使用numeral转化
* {number} value 需要格式转化的数字
* {string} format 转化格式的字符串
* {boolean} hasSymbol 是否添加%符号
** 返回值: {string} 返回转化后的字符串
***/


function percent(value) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0';
  var noSymbol = arguments.length > 2 ? arguments[2] : undefined;
  var result = (0, _numeral["default"])(value).format("".concat(format, "%"));
  return noSymbol ? result.replace('%', '') : result;
}
/***
** 秒数转换为时分秒
* {integer} seconds 需要转化的秒数
* {integer} level 需要显示的级数
* {string} lang 显示的单位语言，zh/en
** 返回值: {string} 转换后的字符串，例如secToWord(65)返回1分钟5秒
***/


var unitMap = {
  zh: ['秒', '分钟', '小时', '天'],
  en: ['second', 'minute', 'hour', 'day']
};

function secondStringify(seconds) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'zh';
  var units = Array.isArray(lang) ? lang : unitMap[lang] || unitMap['en'];

  var roundFn = function roundFn(lvl, num) {
    return lvl === level ? Math.round(num) : Math.floor(num);
  };

  var countArr = [seconds % 60];
  seconds >= 60 && countArr.push(roundFn(1, seconds % 3600 / 60));
  seconds >= 3600 && countArr.push(roundFn(2, seconds % 86400 / 3600));
  seconds >= 86400 && countArr.push(roundFn(3, seconds / 86400));
  var result = countArr.map(function (item, index) {
    return level <= index ? item > 0 || countArr.length === 1 ? "".concat(item).concat(units[index]) : '' : '';
  }).reverse();
  return result.join('');
}
/***
** 使用fecha做时间格式化
* {integer | string | Date} date 需要格式化的时间，10/13位时间戳数字，合法格式时间字符串，Date对象
* {string} format fecha支持的转化格式字符串
** 返回值: {string} 返回转化后的时间字符串
***/


_fecha["default"].masks = {
  "default": 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD'
};

function dateFormat(date, format) {
  var trueDate = null;

  if (date instanceof Date) {
    trueDate = date;
  } else if (!isNaN(new Date(date).getTime())) {
    trueDate = new Date(date);
  } else if (isFinite(Number(date)) && !isNaN(new Date(date * 1000).getTime())) {
    trueDate = date * 1000;
  }

  return trueDate ? _fecha["default"].format(trueDate, format) : '';
}