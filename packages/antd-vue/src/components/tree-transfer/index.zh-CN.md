### Attributes

| 参数           | 类型                                              | 说明                                                         | 可选值          | 默认值 |
| :------------- | :------------------------------------------------ | :----------------------------------------------------------- | :-------------- | :----- |
| value/v-model  | string[] / number[]                               | 绑定值, `node-key`指定属性对应值的数组                       | --              | --     |
| data           | object[]                                          | 数据源                                                       | --              | --     |
| node-key       | string                                            | 和Tree组件同名属性意义一致，属性对应不上时无法查找节点会报错 | --              | 'id'   |
| loading        | boolean                                           | 是否加载中                                                   | --              | --     |
| data           | object[]                                          | 数据源                                                       | --              | --     |
| chosed-mode    | string                                            | 左侧已选择项的展示形式，有禁用和过滤两种，默认为禁用         | disabled/filter | --     |
| one-way        | boolean                                           | 是否采用单向关联，同TreeField组件                            | --              | --     |
| titles         | boolean \| [boolean \| string, boolean \| string] | 转换框header右侧自定义内容，设置false会隐藏header            | --              | --     |
| show-filter    | boolean \| (direction) => boolean                 | 是否显示搜索过滤, 可通过函数区分左右框                       | --              | --     |
| tree-props     | object \| (direction) => object                   | 两侧树组件的props对象                                        | --              | --     |
| button-trigger | boolean                                           | 是否由按钮触发数据转移                                       | --              | tree   |
