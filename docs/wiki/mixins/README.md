---
sidebarDepth: 3
---
## 使用方法

Mixins文件并未包含在组件库代码中，需要单独引入，使用方法如下

### npm方式(推荐)
``` js
// 引入cjs文件
import { routeWatcher } from '@wxhccc/ui-extends/lib/mixins'
// or 配置了node_modules内包也会解析的情况下
// import * as Mixins from '@wxhccc/ui-extends/src/mixins'
export default {
  ...
  mixins: [routeWatcher()]
}
```
### cdn方式
```html
<!-- 先引入其他脚本 -->
<script src="https://unpkg.com/@wxhccc/ui-extends/lib/mixins.min.js"></script>

<script>
const routeWatcher = UIEXTENDS.mixins.routeWatcher
const Page = new Vue({
  ...
  mixins: [routeWatcher()]
})
</script>
```
## 方法

### routeWatcher

返回用于混入路由组件的mixin对象，会监听路由变化并自动重置数据和重新运行逻辑函数

#### 返回值
mixin对象，具体结构如下

**`methods`**

* `initRouteState`
  路由初始化处理函数，如果组件内定义了此函数，函数会在每次路由变化（包括参数变化）时调用

* `$_mixin_initData(initData, dynamData)`

  在组件data函数内调用，将返回值作为data数据

  **paramsters**:

  * `initData` {Object} 需要在路由变化时恢复初始值的数据，可以方便的初始化大量数据。
  * `dynamData` {Object} 不需要在路由变化时恢复的数据，可以用来保存页面配置、插件引用等数据。

  **return**: object

  **示例**

  ```js
  // users-list.vue
  import { routeWatcher } from '@wxhccc/ui-extends/lib/mixins'
  export default {
    mixins: [routeWatcher()],
    data () {
      return this.$_mixin_initData({
        page: 0,
        name: ''
      }, {
        pageSize: 20
      })
    },
    methods: {
      initRouteState () {
        // 获取路由参数并进行响应处理
      }
    }
  }
  ```