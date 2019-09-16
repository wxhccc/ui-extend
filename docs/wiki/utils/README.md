---
sidebarDepth: 3
---

## 使用方法

Utils文件并未包含在组件库代码中，需要单独引入，使用方法如下：

### npm方式(推荐)

::: warning 提示
npm方式需要先安装依赖包，[numeral](https://npmjs.com/package/numeral)、[fecha](https://npmjs.com/package/fecha)
:::

``` js
// 引入cjs文件
import * as Utils from '@wxhccc/ui-extend/lib/utils'
// or 配置了node_modules内包也会解析的情况下
// import { loadjs, percent } from '@wxhccc/ui-extend/src/utils'

const { loadjs, percent } = Utils 

```
### cdn方式
```html
<!-- 先引入其他脚本 -->
<script src="https://unpkg.com/@wxhccc/ui-extend/lib/utils.min.js"></script>

<script>
const Utils = UIEXTENDS.utils

Utils.loadjs()
</script>
```

## 方法

### loadjs

简单的动态js脚步引入函数，返回promise对象

**语法**: `loadjs(url)`

**参数**:

* `url` {String} 脚步地址。

**返回值**: promise

**示例**:

```js
import { loadjs } from '@wxhccc/ui-extend/lib/utils'

loadjs('https://www.example.com/xxxxxxxx.js').then(() => {
  // 这里的代码可以使用动态脚步的内容
})

```

### `commaNum`

使用`numeral`库的格式化函数将数字转换为3位逗号分割的字符串，常用于显示金额数字，可指定精度

**语法**: `commaNum(number[, format])`

**参数**:

* `number` {Number/NumberString} 数字或者数字字符串
* `format` {String} 格式化字符串，默认值为：`0,0`

**返回值**: string

**示例**

```js
import { commaNum } from '@wxhccc/ui-extend/lib/utils'

commaNum(1242323)
// log '1,242,323'
commaNum(1242323.256, '$0,0.00')
// log '$1,242,323.26'
```

### `percent`

使用`numeral`库的格式化函数将数字转换为百分比，可指定精度，也可以不带百分比符号

**语法**: `percent(number[, format, noSymbol])`

**参数**:

* `number` {Number/NumberString} 数字或者数字字符串
* `format` {String} 格式化字符串，默认值为：`0.0`
* `noSymbol` {Boolean} 是否不带符号

**返回值**: string

**示例**

```js
import { percent } from '@wxhccc/ui-extend/lib/utils'

percent(0.1234)
// log '12.3%'
commaNum(1.2245, '0.00', true)
// log '122.45'
```

### `secondStringify`

将秒数转换为‘1小时2分钟6秒’或‘1day2hour’这种格式的字符

**语法**: `secondStringify(seconds[, level, lang])`

**参数**:

* `seconds` {Number} 总秒数
* `level` {Number} 从秒开始，按秒、分、小时、天的顺序，控制不显示数据的层级。默认值为：0（显示所有）
* `lang` {String/Array} 显示单位的语言，'zh'/'en'或者传入自定义4级单位字符串数组

**返回值**: string

**示例**

```js
import { secondStringify } from '@wxhccc/ui-extend/lib/utils'

secondStringify(3631)
// log '1小时31秒'
secondStringify(3671, 1, 'en')
// log '1hour1minute'
secondStringify(3671, 0, ['s', 'min', 'h', 'd'])
// log '1h1min11s'
```

### `dateFormat`

使用`fecha`库(时间处理库)的格式化函数格式化时间

**语法**: `dateFormat(date[, format])`

**参数**:

* `date` {Date/String/Number} 需要转换的时间，支持Date对象，字符串格式时间，10/13位时间戳
* `format` {String} 输出时间的格式。默认值为：'YYYY-MM-DD HH:mm:ss'，支持具体格式字符串或者格式别名，别名可以通过fecha.masks合并，具体见文档。fecha.masks已包含default: 'YYYY-MM-DD HH:mm:ss'，date: 'YYYY-MM-DD'

**返回值**: string

**示例**

```js
import { dateFormat } from '@wxhccc/ui-extend/lib/utils'

dateFormat(new Date())
// log '2019-08-29 11:12:13'
dateFormat('2019/08/29')
// log '2019-08-29 00:00:00'
dateFormat(1567042733116, 'date')
// log '2019-08-29'
dateFormat(1567042733, 'YYYY-MM-DD HH:mm')
// log '2019-08-29 09:38'
/** 高级功能，安装了fecha后，引入 **/
import fecha from 'fecha'
// 添加别名，也可以设置多语言
Object.assign(fecha.masks, {
  time: 'HH:mm:ss'
})

dateFormat(1567042733, 'time')
// log '09:38:53'
```