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
``` ts

import UiExtend from '@wxhccc/ui-extend'

app.use(UiExtend)
```
以上代码便完成了UiExtend的引入

### 按需引入

你可以通过以下的写法来按需加载组件或模块

``` ts
import { FormBtns } from '@wxhccc/ui-extend'
```