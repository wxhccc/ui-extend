### Attributes

| 参数          | 类型   | 说明                                                                                    | 可选值 | 默认值 |
| :------------ | :----- | :-------------------------------------------------------------------------------------- | :----- | :----- |
| value/v-model | any    | 绑定值                                                                                  | --     | --     |
| field         | object | 表单域配置对象。具体字段见[field](#field)                                               | --     | --     |
| lib-prefix    | string | ui库组件前缀，例如'element-ui'前缀为'El'. 使用字符串生成带子组件的表单域组件时会用到。 | --     | 'El'   |


### field

::: warning 注意
配置参数是`field`对象的键名, 不能使用短横线写法.
:::

| 参数             | 类型                                 | 说明                                                                                                                                                               | 可选值 | 默认值 |
| :--------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :----- |
| component        | string(ComponentName)<br/>/Component | 表单域组件对象，或者字符串名称（需提前注册）。                                                                                                                     | --     | --     |
| props            | object/function                      | 表单域组件绑定props参数对象，或者返回参数对象的函数。                                                                                                              | --     | --     |
| events           | object                               | 表单域组件绑定事件对象。和合并覆盖通过模版写法传入组件的事件对象。                                                                                                 | --     | --     |
| data             | object[]                             | 表单域组件子组件数据列表。适用于`Select`等组件。                                                                                                                   | --     | --     |
| └ value          | string / number                      | 子组件绑定数据。`CheckboxGroup`,`RadioGroup`组件中的子组件会修正label为value值。                                                                                   | --     | --     |
| └ label          | string / number                      | 子组件展示文字。`CheckboxGroup`,`RadioGroup`组件中的子组件会用来填充到插槽中。                                                                                     | --     | --     |
| └ ...            | ...                                  | 其余属性会作为props绑定到子组件上                                                                                                                                  | --     | --     |
| isNumber         | boolean                              | 是否将绑定值转换为数字（如果可以）                                                                                                                                 | --     | --     |
| initValue        | any                                  | 组件绑定值初始值                                                                                                                                                   | --     | --     |
| forbidValueFixed | boolean                              | 是否禁用对(`ElCheckboxGroup`/`ElRadioGroup`)子组件的value修正。                                                                                                    | --     | --     |
| childComponent   | Component | 表单域组件子组件，用于生成`data`数据列表。<br/>如果`component`使用了(`ElCheckboxGroup`/`ElRadioGroup`), 此参数可以缺省。                                           | --     | --     |
| dataItemContent  | Component<br/>/() => VNode           | 表单域组件子组件默认插槽内容，可以使用组件或VNode渲染函数。                                                                                                        | --     | --     |
| slots            | object                               | 表单域组件的具名插槽配置对象。对象key为插槽名称，值为配置对象，例如`{ header: {...} }`。如果直接写配置对象会当作默认插处理。插槽配置对象说明见[slot](#slot-object) | --     | --     |
| scopedSlots      | object                               | 表单域组件的作用域域插槽配置对象。对象key为插槽名称，值为返回VNode的函数，具体见[vue-jsx](https://github.com/vuejs/jsx)                                            | --     | --     |

### slot object

| 参数      | 类型                                       | 说明                                                                                                                     | 可选值 | 默认值 |
| :-------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----- | :----- |
| component | Component<br/>/(h, vdo, slotName) => VNode | 插槽内容，可以使用组件或VNode渲染函数。函数会传入h($createElement别名)，Vue Data Object，插槽名称。组件则会绑定VDO对象。 | --     | --     |
| props     | object                                     | 插槽组件绑定props参数对象，会合并到VDO对象中。                                                                           | --     | --     |
| events    | object                                     | 插槽组件绑定事件对象。会合并到VDO对象中。                                                                                | --     | --     |
### Methods

| 方法名          | 说明                                 | 参数                       |
| :-------------- | :----------------------------------- | :------------------------- |
| callFieldMethod | 调用原表单域实例上的方法，可传递参数 | (fnName:String, ...args[]) |



