### Attributes

| 参数                  | 类型                                 | 说明                                                                               | 可选值                      | 默认值 |
| :-------------------- | :----------------------------------- | :--------------------------------------------------------------------------------- | :-------------------------- | :----- |
| row-key               | string/Function                      | `Table`组件的`row-key`参数                                                         | --                          | 'id'   |
| request               | () => Promise<PagedData>             | 数据请求函数，需返回指定格式数据                                                   | --                          | --     |
| search-forms          | object                               | 搜索表单配置对象，传递给SearchForm组件, 类型SearchFormProps                        | --                          | --     |
| v-model:search-params | object                               | 搜索表单绑定对象，需要在外部处理绑定表单对象时使用                                 | --                          | --     |
| search-params-handler | Function(params)                     | 当前操作搜索表单数据更新前的处理函数，可用于对特定数据进行处理(例如时间组件数据)。 | --                          | --     |
| init-search-params    | object                               | 初始搜索参数，表单需要默认值时设置。                                               | --                          | --     |
| operation             | OperationItem[] \|   OperationOption | 操作区配置参数。                                                                   | 见 [操作行配置](#operation) | --     |

### operation

OperationItem类型说明

| 参数       | 类型                                                     | 说明                             | 可选值 | 默认值  |
| :--------- | :------------------------------------------------------- | :------------------------------- | :----- | :------ |
| component  | string                                                   | 组件名或组件，默认是按钮         | --     | Buttton |
| key        | string                                                   | 操作项唯一key                    | --     | --      |
| props      | object                                                   | 操作项组件的props对象            | --     | --      |
| btnText    | string                                                   | 按钮内文字                       | --     | --      |
| lockingKey | string                                                   | loading字段在loadings对象中的key | --     | --      |
| onClick    | (item: OperationItem, loadingSwitch: BoolSwitch) => void | 按钮的点击事件处理函数           | --     | --      |

OperationOption类型说明

| 参数     | 类型            | 说明                        | 可选值 | 默认值 |
| :------- | :-------------- | :-------------------------- | :----- | :----- |
| loadings | object          | 操作项组件的loading状态集合 | --     | --     |
| items    | OperationItem[] | 操作项对象数组              | --     | --     |

### Slots

| name      | 说明                             | 作用域数据 |
| :-------- | :------------------------------- | :--------- |
| --        | 默认插槽，位于搜索表单和表格之间 | --         |
| operation | 操作区插槽                       | --         |

