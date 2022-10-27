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

简单的动态js脚步引入函数，返回promise对象，适用于没有npm包或者希望懒加载cdn资源的场景。

**类型定义**: `loadjs(url: string)`
```ts
function loadjs(url: string): Promise<void>
```

**参数**:

* `url` { string } js脚本地址。


**示例**:

```js
import { loadjs } from '@wxhccc/ui-extend'

loadjs('https://www.example.com/xxxxxxxx.js').then(() => {
  // 这里的代码可以使用动态脚步的内容
})

```

### `vwp`

`@wxhccc/es-util`库的`wp` 函数的vue封装，提供ref的支持

**类型定义**: 
``` ts
declare const vwp = <T>(promise: Promise<T>, lock?: WpOptions['lock'] | Ref<boolean>): Promise<[null, T] | [Error, undefined]>
```

**参数**:

* `promise`   promise对象
* `lock`      格式化字符串，默认值为：`0,0`

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

**类型定义**: 
```ts
declare const resolveFunctional = <R>(value: R | AnyFunction<R>, ...args: Parameters<AnyFunction<R>>): R
```

**参数**:

* `value` { `any | AnyFunction<any>` } 特定值，或者返回特定值的函数
* `...args` { `any[]` } 传递给函数的参数序列

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

**类型定义**: 
```ts
function dateFormat(date: string | number | Date | Dayjs, format?: 'default' | 'date' | 'time' | string): string
```

**参数**:

* `date` {string | number | Date | Dayjs} 需要转换的时间，支持Date对象，字符串格式时间，10/13位时间戳，dayjs对象
* `format` {string} 输出时间的格式。默认值为：'YYYY-MM-DD HH:mm:ss'，支持具体格式字符串或者格式别名。default: 'YYYY-MM-DD HH:mm:ss'，date: 'YYYY-MM-DD'

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