### Attributes

| 参数              | 类型   | 说明                                                                                     | 可选值   | 默认值  |
| :---------------- | :----- | :--------------------------------------------------------------------------------------- | :------- | :------ |
| data-table-props  | object | `DataTable`组件绑定参数。可选传参方式                                                    | --       | --      |
| data-table-events | object | `DataTable`组件绑定事件对象                                                              | --       | --      |
| init-sort         | object | 远程排序数据的初始值。格式为`{orderby: 'id',order: 'desc'}`                              | --       | --      |
| └ orderby         | string | 排序字段                                                                                 | --       | --      |
| └ order           | string | 排序规则                                                                                 | desc/asc | --      |
| sort-prop-keys    | object | params数据中排序参数的键名，仅控制params对象中的键名，设置初始值时仍为`orderby`和`order` | --       | --      |
| └ orderby         | string | params中排序字段键名                                                                     | --       | orderby |
| └ order           | string | params中排序规则键名                                                                     | --       | order   |

### Events

组件透传绑定事件给`PagedList`组件和`DataTable`组件，可直接在组件上监听对应组件事件。

### Methods

组件代理了`PagedList`组件和`DataTable`组件(包括`Table`组件)提供的所有方法，可以直接在组件实例上调用。


