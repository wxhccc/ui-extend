### Attributes

| 参数          | 类型                                              | 说明                                                                                                      | 可选值 | 默认值 |
| :------------ | :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- | :----- | :----- |
| value/v-model | any                                               | 绑定值，如果fields是数组时，绑定值需要是一个对象。                                                        | --     | --     |
| props         | object/function                                   | 根层`FormItem`组件绑定props参数对象，或者返回参数对象的函数。                                             | --     | --     |
| prop          | string                                            | 根层`FormItem`组件绑定prop参数。仅需当前层级prop字符串。                                                  | --     | --     |
| prev-prop     | (string/number)[]                                 | 当前组件绑定`prop`参数的前置部分，数组格式。会拼接上`prop`后生成完整prop属性传递给根层`FormItem`。        | --     | --     |
| text          | boolean /<br/>string / <br/>Function(prop, value) | 表单域内是否显示文本，或者设置显示的文本内容。                                                            | --     | --     |
| field         | object                                            | 表单域组件配置对象，传递给`CommonField`组件的`field`字段，具体见[CommonField#field](./common-field#field) | --     | --     |
| children      | object []                                         | 子表单项数组，**和`field`字段互斥**，优先级高于`field`。用于在表单域区域生成子表单项。                    | --     | --     |
| └ prop        | 同上                                              | 作用同上一级prop。子表单项无需设置`prev-prop`字段，会使用上一级的自动拼接。                               | --     | --     |
| └ props       | 同上                                              | 作用同上一级`props`                                                                                       | --     | --     |
| └ text        | 同上                                              | 作用同上一级`text`                                                                                        | --     | --     |
| └ field       | 同上                                              | 作用同上一级`field`。有扩展字段                                                                           | --     | --     |
| └└ colProps   | object                                            | 默认情况下子表单项会平分24栅格。可以通过此字段自定义每项所占栅格数。                                      | --     | --     |
| slots         | object                                            | 插槽配置对象，具体结构见                                                                              | --     | --     |
### Methods

组件代理了根层级的`FormItem`组件上的方法， 具体见FormItem文档。

