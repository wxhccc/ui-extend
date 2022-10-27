### Attributes

| 参数           | 类型                                   | 说明                                                                             | 可选值 | 默认值 |
| :------------- | :------------------------------------- | :------------------------------------------------------------------------------- | :----- | :----- |
| cells          | object[]                               | 表格单元格配置对象数组。具体结构见[cell](#cell)                                  | --     | --     |
| data           | object                                 | 用于表格显示的数据对象。                                                         | --     | --     |
| set-empty-cell | boolean /<br/> Function(data, allData) | 是否需要将空单元格设置成'--'，也可以传入函数来自己决定怎么处理空单元格。         | --     | --     |
| is-edit        | boolean                                | 表格是否处于编辑状态。                                                           | --     | --     |
| value/v-model  | object                                 | 编辑状态表格表单的绑定值。                                                       | --     | --     |
| extra-data     | object                                 | 额外的数据对象。会合并`data`生成完整的数据对象。适用于存放不需要参数编辑的数据。 | --     | --     |

### cell

| 参数           | 类型                                 | 说明                                                                                                                                   | 可选值 | 默认值 |
| :------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----- | :----- |
| hide           | boolean/function                     | 单元格是否隐藏（不渲染）。                                                                                                             | --     | --     |
| props          | object/function                      | `Col`组绑定参数对象或返回对象的函数。                                                                                                  | --     | --     |
| prop           | string/number                        | 单元格显示内容在`data`中对应的键名，或表单项绑定值在`value`中对应的键名。                                                              | --     | --     |
| key            | string/number                        | 组件的`key`，缺省时使用`prop`属性。如果`prop`缺省时会使用数组索引，为了性能`prop`缺省时请设置`key`                                     | --     | --     |
| label          | string/boolean                       | 单元格label区域显示内容，传入false可不显示label                                                                                        | --     | --     |
| label          | string                               | 单元格label区域显示内容，传入空值可不显示label                                                                                         | --     | --     |
| icon           | string                               | 单元格label区域图标，在文字左侧。                                                                                                      | --     | --     |
| formatter      | Function(value, allData)             | 单元格内容区域显示内容的格式化函数。                                                                                                   | --     | --     |
| labelComponent | string(ComponentName)<br/>/Component | 单元格label自定义组件。组件会传入cell对象和allData数据，下同。                                                                         | --     | --     |
| valueComponent | string(ComponentName)<br/>/Component | 单元格内容区域自定义组件。                                                                                                             | --     | --     |
| canEdit        | boolean                              | 当前单元格是否可编辑。                                                                                                                 | --     | --     |
| fieldProps     | object                               | 单元格表单项组件的参数绑定对象，具体见[FormFieldItem](./form-field-item)。默认会合入单元格的`prop`作为表单项组件的`prop`属性，可覆盖。 | --     | --     |

### Events

| 参数   | 说明                       | 回调参数 |
| :----- | :------------------------- | :------- |
| change | 表格表单数据发生变化时触发 | --       |
