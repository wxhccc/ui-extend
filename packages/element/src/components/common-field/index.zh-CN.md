### Attributes

| 参数               | 类型                     | 说明                                                                                                                     | 可选值                                                | 默认值 |
| :----------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- | :----- |
| modelValue/v-model | any                      | 绑定值                                                                                                                   | --                                                    | --     |
| component          | string \| Component      | 表单域组件对象，或者字符串名称（需提前注册）。                                                                           | --                                                    | --     |
| props              | object                   | () => object                                                                                                             | 表单域组件绑定props参数对象，或者返回参数对象的函数。 | --     | -- |
| events             | object                   | 表单域组件绑定事件对象。和合并覆盖通过模版写法传入组件的事件对象。                                                       | --                                                    | --     |
| data               | object[]                 | 表单域组件子组件数据列表。适用于`Select`等组件。                                                                         | --                                                    | --     |
| └ value            | string \| number         | 子组件绑定数据。`CheckboxGroup` , `RadioGroup`组件中的子组件会修正label为value值。                                       | --                                                    | --     |
| └ label            | string \| number         | 子组件展示文字。`CheckboxGroup` , `RadioGroup`组件中的子组件会用来填充到插槽中。                                         | --                                                    | --     |
| └ ...              | ...                      | 其余属性会作为props绑定到子组件上                                                                                        | --                                                    | --     |
| isNumber           | boolean                  | 是否将绑定值转换为数字（如果可以）                                                                                       | --                                                    | --     |
| initValue          | any                      | 组件绑定值初始值                                                                                                         | --                                                    | --     |
| needTrim           | boolean                  | 是否需要去掉字符串类型的绑定值前后的空格，仅在离开焦点时过滤，以保留字符串中间的空格。                                   | --                                                    | --     |
| childComponent     | string \| Component      | 表单域组件子组件，用于生成`data`数据列表。<br/>如果`component`使用了(`ElCheckboxGroup`/`ElRadioGroup`), 此参数可以缺省。 | --                                                    | --     |
| dataItemRenader    | Component \| () => VNode | 表单域组件子组件默认插槽内容，可以使用组件或VNode渲染函数。                                                              | --                                                    | --     |
| slots              | object                   | 表单域组件的插槽配置对象。对象key为插槽名称，值为配置对象，例如`{ header: Slot }`                                        | --                                                    | --     |


### Methods

| 方法名          | 说明                                 | 参数                       |
| :-------------- | :----------------------------------- | :------------------------- |
| callFieldMethod | 调用原表单域实例上的方法，可传递参数 | (fnName:String, ...args[]) |



