### Attributes

| 参数                  | 类型             | 说明                                                                                  | 可选值                           | 默认值 |
| :-------------------- | :--------------- | :------------------------------------------------------------------------------------ | :------------------------------- | :----- |
| row-key               | string/Function  | `Table`组件的`row-key`参数                                                            | --                               | 'id'   |
| export-url            | string           | 导出文件的链接地址，为空时不显示导出按钮                                              | --                               | --     |
| export-options        | object           | 导出按钮的配置对象                                                                    | 见 [导出配置](#export-options)   | --     |
| tabs-props            | object           | `Tabs`组件绑定参数对象，仅在有tabs时生效。                                            | --                               | --     |
| tab-form-key          | string           | 是否将`Tabs`组件的绑定值使用此参数指定key合入请求参数之中。为空时不合入。             | --                               | --     |
| search-forms          | object/object[]  | 搜索表单配置对象，或者配置对象数组。为数组时会生成tabs。                              | 见 [搜索表单配置](#search-forms) | --     |
| search-params-handler | Function(params) | 当前操作搜索表单数据更新前的处理函数，可用于对特定数据进行处理(例如时间组件数据)。    | --                               | --     |
| current-search-params | object           | 当前操作搜索表单的最终数据，支持`.sync`，仅支持内部到外部的同步。可用作生成导出链接。 | --                               | --     |
| current-tab           | string           | 当前选中tab的name值，支持`.sync`，仅支持内部到外部的同步。                            | --                               | --     |
| operation             | object           | 表格操作行配置对象。                                                                  | 见 [操作行配置](#operation)      | --     |


### export options

| 参数     | 类型   | 说明                       | 可选值 | 默认值                                     |
| :------- | :----- | :------------------------- | :----- | :----------------------------------------- |
| text     | string | 导出按钮的文字内容         | --     | '数据导出'                                 |
| btnProps | object | 导出按钮绑定的参数对象     | --     | { type: 'text', icon: 'el-icon-download' } |
| events   | object | 导出按钮绑定的事件监听对象 | --     | --                                         |

### search-forms

::: tip 提示
配置对象属性大部分会绑定到`SearchForm`组件上，少部分属性是数组格式独有(`TabPane`组件参数)。需要注意的是部分属性组件内有相关逻辑控制无法覆盖。
:::

| 参数                                       | 类型                                 | 说明                                         | 可选值 | 默认值 |
| :----------------------------------------- | :----------------------------------- | :------------------------------------------- | :----- | :----- |
| --                                         | --                                   | `TabPane`组件参数，数组格式独有              | --     | --     |
| name                                       | string                               | 选项卡绑定值value对应标识符                  | --     | --     |
| label                                      | object                               | 选项卡标题                                   | --     | --     |
| --                                         | --                                   | `SearchForm`组件支持参数列表，具体说明见文档 | --     | --     |
| items、button-trigger、button-item-options | --                                   | --                                           | --     | --     |
| --                                         | --                                   | --                                           | --     | --     |
| defaultSlot                                | string(ComponentName)<br/>/Component | `SearchForm`组件默认插槽内组件               | --     | --     |
| buttonSlot                                 | string(ComponentName)<br/>/Component | `SearchForm`组件具名插槽(button)内组件       | --     | --     |

### Methods

组件代理了`PagedTable`组件提供的所有方法，可以直接在组件实例上调用。其他内部组件方法可通过$refs获取

### Slots

| name | 说明                               | 作用域数据 |
| :--- | :--------------------------------- | :--------- |
| -- | 默认插槽，位于搜索表单和操作行直接 | --         |

