---
sidebarDepth: 3
---

## 使用方法

``` ts
// 引入cjs文件
import { loadjs, vwp } from '@wxhccc/ui-extend'

```
## 方法

### loadjs

简单的动态js脚步引入函数，返回promise对象

**语法**: `loadjs(url: string)`

**参数**:

* `url` {string} 脚步地址。

**返回值**: promise


**示例**:

```js
import { loadjs } from '@wxhccc/ui-extend'

loadjs('https://www.example.com/xxxxxxxx.js').then(() => {
  // 这里的代码可以使用动态脚步的内容
})

```

### `vwp`

`@wxhccc/es-util`库的`wp` 函数的vue封装，提供ref的支持

**语法**: `vwp<T>(promise: Promise<T>, lock?: WpOptions['lock'] | Ref<boolean>)`

**参数**:

* `promise` {Promise} promise对象
* `lock` { WpOptions['lock'] | Ref\<boolean> } 格式化字符串，默认值为：`0,0`

**返回值**: 

**示例**

```ts
import { ref } from 'vue'
import { vwp } from '@wxhccc/ui-extend'

const loading = ref(false)


const getApiData = async () => {
  // 函数调用时会设置loading为true
  const [err, data] = vwm<Data>(fetch('https://xxxxxx.xx.xx'), loading)
  // promise结束后loading会为false
  // 如果promise报错，err是错误对象，否则data是返回数据
}
```

### `resolveFunctional`

解析可能是函数化返回的变量

**语法**: 
`resolveFunctional<R>(value: R | AnyFunction<R>, ...args: Parameters<AnyFunction<R>>): R`

**参数**:

* `value` {any | AnyFunction\<any>} 特定值，或者返回特定值的函数
* `...args` {any[]} 传递给函数的参数序列

**返回值**: any

**示例**

``` ts
import { resolveFunctional } from '@wxhccc/ui-extend'

/** 组件的props对象类型 */
type InputProps = xxx

/** 在另外一个组件里 */
interface CustomInputProps {
  inputProps: InputProps | (type: 'text' | 'password') => InputProps
}

/** 组建内部可以直接用来获取获取值 */
const trueInputProps = resolveFunctional(props.inputProps, 'text')
```

### `dateFormat`

使用`dayjs`库(时间处理库)的格式化函数格式化时间

**语法**: `dateFormat(date: string | number | Date | Dayjs, format: FormatShort | string = 'default'`

**参数**:

* `date` {string | number | Date | Dayjs} 需要转换的时间，支持Date对象，字符串格式时间，10/13位时间戳，dayjs对象
* `format` {string} 输出时间的格式。默认值为：'YYYY-MM-DD HH:mm:ss'，支持具体格式字符串或者格式别名。default: 'YYYY-MM-DD HH:mm:ss'，date: 'YYYY-MM-DD'

**返回值**: string

**示例**

```js
import { dateFormat } from '@wxhccc/ui-extend'

dateFormat(new Date())
// log '2019-08-29 11:12:13'
dateFormat('2019/08/29')
// log '2019-08-29 00:00:00'
dateFormat(1567042733116, 'date')
// log '2019-08-29'
dateFormat(1567042733, 'YYYY-MM-DD HH:mm')
// log '2019-08-29 09:38'

```