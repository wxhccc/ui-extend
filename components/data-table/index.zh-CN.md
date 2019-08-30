### Attributes

| 参数            | 类型                                                        | 说明                                                                                                                                                                      | 可选值 | 默认值 |
| :-------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----- | :----- |
| columns         | object[]                                                    | 列配置项(column)的数组，具体参数见[column](#column)                                                                                                                       | --     | --     |
| set-empty-cell  | boolean /<br/> Function(result, row,column,cellValue,index) | 是否需要将空单元格设置成'--',也可以传入函数来自己决定怎么处理空单元格。<br/>第一个参数为cellValue/formatter(如果设置了)处理结果，余下的和TableColumn组件的`formatter`一致 | --     | --     |
| selection-key   | string /<br/> Function(row)                                 | 行数据的Key，指定选择组件绑定值。也可以使用函数。功能和`Table`组件的`row-key`类似，缺省时会尝试使用`row-key`的值。                                                        | --     | --     |
| selection-value | number/ string/ number[] / string[]                         | 多（单）选择列的同步值，支持`.sync`修饰符。多选时必须为数组                                                                                                               | --     | --     |

### Methods

组件代理了Table组件的所有方法，具体见Table文档

### column

| 参数            | 类型                                 | 说明                                                                                                                                                               | 可选值           | 默认值 |
| :-------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------- | :----- |
| key       | string                               | 渲染列组件时使用的key属性, 默认使用prop属性, 如果列对象没有prop属性，会使用列在数组中的索引作为key                                                                 | --               | --     |
| hide            | boolean/Function()                     | 是否隐藏（不渲染）当前列，可以为boolean类型值，也可以用函数动态控制。                                                                                              | --               | --     |
| scopeSlot       | string(ComponentName)<br/>/Component | 列的作用域插槽内渲染的组件，会传入column和scope两个props参数。                                                                                                     | --               | --     |
| action          | object[]                             | 操作按钮数组，设置此值时会使用内部操作按钮组件传递给`scopeSlot`来生成按钮。操作按钮采用ActionBtns组件生成，函数参数见下文说明。组件具见[ActionBtns](./action-btns) | --               | --     |
| selection       | string                               | 是否使用单(多)选择列，设置此值时会使用内部组件传递给`scopeSlot`来生成选择列（而非Table自带选择列）。使用`selectionValue.sync`来同步数据。                          | radio / checkbox | --     |
| notUseScopeSlot | boolean                              | 是否不使用作用域插槽，即使设置了`scopeSlot`。可用于在文本和作用域插槽间切换                                                                                        | --               | --     |

::: tip column参数说明
参数优先级关系：`scopeSlot` > `action` > `selection`
<p>action按钮项的涉及到的函数的参数Function(row, btn, scope)，分别是当前行数据，当前点击按钮对象，当前行scope对象（包含row, column, $index等）</p>
:::

::: warning columns性能分析
column列对象的`columnKey`属性可用于组件性能优化。当`columns`对象属性可能发送变化时，存在如下情形。
* 如果所有列都是固定的也不存在显示隐藏，那么是否设置`columnKey`或列是否有`prop`属性没有影响。
* 如果所有列都是固定的但有列会切换显示隐藏，那么不设置`columnKey`时，是否会有影响取决于是否设置了`prop`。原因，如果没有`columnKey`和`prop`，列组件会使用index作为key，index会因为显示隐藏发生变化。还有可能因为组件复用导致渲染出错。
* 如果列不固定且有切换显示隐藏。那么index无法保障有效的顺序。这种情况下列至少需要设置`prop`和`columnKey`其中之一作为key。
* 最后是最少见的场景，即需要在让`columns`发生变化时所有列都强制重新渲染，这时候可以利用计算属性设置每列的`columnKey`值为随机值。
:::


### Table Attributes

仅列举原组件受影响的字段，其他字段见原组件文档。

| 参数   | 能否覆盖 | 默认值 | 说明                       |
| :----- | :------- | :----- | :------------------------- |
| border | 是       | true   | 个人感觉，有边框视觉更舒适 |
| stripe | 是       | true   | 斑马纹，yes！              |
