"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  loadjs: true
};
exports.loadjs = loadjs;

var _formatter = require("./formatter");

Object.keys(_formatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formatter[key];
    }
  });
});

/***
** 动态加载远程js脚本
* {string} url 远程js脚本地址
** 返回值: promise 对象
***/
function loadjs(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
}