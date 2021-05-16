### Attributes

| 参数          | 类型   | 说明                                                                                    | 可选值 | 默认值 |
| :------------ | :----- | :-------------------------------------------------------------------------------------- | :----- | :----- |
| modelValue/v-model | any    | 绑定值                                                                                  | --     | --     |
| field         | object | 表单域配置对象。具体字段见[field](#field)                                               | --     | --     |



### field

::: warning 注意
配置参数是`field`对象的键名, 不能使用短横线写法.
:::

| 参数             | 类型                                 | 说明                                                                                                                                                               | 可选值 | 默认值 |
| :--------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :----- |
| component        | string(ComponentName)<br/>/Component | 表单域组件对象，或者字符串名称（需提前注册）。                                                                                                                     | --     | --     |
| props            | object/function                      | 表单域组件绑定props参数对象，或者返回参数对象的函数。                                                                                                              | --     | --     |
| data             | object[]                             | 表单域组件子组件数据列表。适用于`Select`等组件。对支持options属性的组件会优先作为参数传递                                                                                                                   | --     | --     |
| └ value          | string / number                      | 子组件绑定数据。`ElCheckboxGroup`,`ElRadioGroup`组件中的子组件会修正label为value值。                                                                                   | --     | --     |
| └ label          | string / number                      | 子组件展示文字。`ElCheckboxGroup`,`ElRadioGroup`组件中的子组件会用来填充到插槽中。                                                                                     | --     | --     |
| └ ...            | ...                                  | 其余属性会作为props绑定到子组件上                                                                                                                                  | --     | --     |
| isNumber         | boolean                              | 是否将绑定值转换为数字（如果可以）                                                                                                                                 | --     | --     |
| initValue        | any                                  | 组件绑定值初始值                                                                                                                                                   | --     | --     |
| forbidValueFixed | boolean                              | 是否禁用对(`ElCheckboxGroup`/`ElRadioGroup`)子组件的value修正。                                                                                                    | --     | --     |
| childComponent   | string(ComponentName)<br/>/Component | 表单域组件子组件，用于生成`data`数据列表。<br/>如果`component`使用了(`CheckboxGroup`/`RadioGroup`/`Select`), 此参数可以缺省,如果你想使用button类型的子组件，可以提供此属性。                                           | --     | --     |
| dataItemRenader  | () => VNode           | 表单域组件子组件默认插槽内容，可以使用组件或VNode渲染函数，可以自定义显示内容。                                                                                                        | --     | --     |
| slots            | object                               | 表单域组件的具名插槽配置对象。对象key为插槽名称，值为返回VNode的函数，例如`{ header: () =>VNode }`。模板插槽内容具有更高优先级，会覆盖同名插槽 | --     | --     |


### Methods

| 方法名          | 说明                                 | 参数                       |
| :-------------- | :----------------------------------- | :------------------------- |
| callFieldMethod | 调用原表单域实例上的方法，可传递参数 | (fnName:String, ...args[]) |



