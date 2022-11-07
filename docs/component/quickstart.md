---
sidebarDepth: 2
---

## 引入 UiExtend

你可以引入整个UiExtend包，或是根据需要仅引入部分组件。

::: warning 样式
组件库仅包含少量样式，所以样式合并为单一文件，直接全量引入样式接口
:::
> 

### 完整引入

在main.js中添加以下内容

<libs-content>
  <template #antd-vue>

``` ts
import UiExtend from '@wxhccc/ui-antd-vue'
import '@wxhccc/ui-antd-vue/dist/style.css'

app.use(UiExtend)
```

  </template>
  <template #element>

``` ts
import UiExtend from '@wxhccc/ue-element'
import '@wxhccc/ue-element/dist/style.css'

app.use(UiExtend)
```

  </template>
</libs-content>


以上代码便完成了UiExtend的引入

### 按需引入

需要先在main.js文件中引入样式文件

你可以通过以下的写法来按需加载组件或模块

<libs-content>
  <template #antd-vue>

``` ts
import { FormBtns } from '@wxhccc/ui-extend'
```

  </template>
  <template #element>

``` ts
import { FormBtns } from '@wxhccc/ue-element'
```

  </template>
</libs-content>
