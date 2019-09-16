---
sidebarDepth: 2
---

## 引入 UiExtend

你可以引入整个UiExtend，或是根据需要仅引入部分组件。

### 完整引入

::: warning 提醒
完整引入需先安装前置依赖，具体见[安装](./)
:::

在main.js中添加以下内容
``` js
import Vue from 'vue'

import UiExtend from '@wxhccc/ui-extend'

Vue.use(UiExtend)
```
以上代码便完成了UiExtend的引入

### 按需引入

你可以通过以下的写法来按需加载组件或模块
``` js
// 引入组件
import FormBtns from '@wxhccc/ui-extend/lib/form-btns'
// 引入模块
import mixins from '@wxhccc/ui-extend/lib/mixins/'
```

如果你使用了babel，你可以借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)引入需要的组件，以达到见效项目体积的目的。而写法可以仍然使用
``` js
import { FormBtns } from '@wxhccc/ui-extend'
```