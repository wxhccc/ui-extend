### Attributes

组件支持PagedList组件的绝大部分属性，以下仅列举额外熟悉

| 参数                   | 类型               | 说明                                                                                                                  | 可选值 | 默认值 |
| :--------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------- | :----- | :----- |
| row-key                | string             | `Table`组件的rowKey属性                                                                                               | --     | --     |
| columns                | object[]           | `Table`组件的columns对象扩展对象数组，支持最小宽度和最大宽度设置，具体参数见[PagedTbColumnProps](#PagedTbColumnProps) | --     | --     |
| v-model:selectionValue | (string\|number)[] | 远程排序数据的初始值。格式为`{orderby: 'id',order: 'desc'}`                                                           | --     | --     |


### Events

组件继承了`PagedList`组件和`Table`组件的大部分事件，可直接在组件上监听对应组件事件。

### Methods

组件代理了`PagedList`组件和`Table`组件提供的所有方法，可以直接在组件实例上调用。

### PagedTbColumnProps

| 参数     | 类型     | 说明                                   | 可选值 | 默认值 |
| :------- | :------- | :------------------------------------- | :----- | :----- |
| id       | string   | 列的唯一key                            | --     | --     |
| minWidth | number   | 最小宽度                               | --     | --     |
| maxWidth | number   | 最大宽度                               | --     | --     |
| actions  | object[] | 操作按钮对象数组，传递给ActionBtns组件 | --     | --     |



