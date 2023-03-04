### Attributes

| 参数           | 类型     | 说明                                                                                                          | 可选值 | 默认值 |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------ | :----- | :----- |
| v-model        | object   | 表单绑定对象                                                                                                  | --     | --     |
| items          | object[] | 表单项对象数组                                                                                                | --     | --     |
| button-trigger | boolean  | 是否使用按钮来触发数据更新                                                                                    | --     | true   |
| data           | object   | 同步数据对象，支持`.sync`。组件恢复数据时会更新为组件内存储数据。                                             | --     | --     |
| searching      | boolean  | 搜索按钮是否出于loading状态                                                                                   | --     | --     |
| show-reset     | boolean  | 是否显示重置按钮                                                                                              | --     | --     |
| validate-model | boolean  | 是否在表单验证通过后才更新modelValue值                                                                        | --     | --     |
| single-line    | boolean  | 表单项元素是否单行显示                                                                                        | --     | --     |
| buttonOptions  | object   | 搜索按钮配置对象。具体见[ButtonOptions](#ButtonOptions)                                                       | --     | --     |
| --             | --       | 以下属性为可选的高级功能，使用时可能需要多理解                                                                | --     | --     |
| need-store     | boolean  | 是否需要在每次请求时在SessionStorage中保存分页数据和请求的params                                              | --     | --     |
| restore        | boolean  | 是否需要恢复之前保存的值，适用于页面跳转后返回时恢复页面数据                                                  | --     | --     |
| store-key      | string   | 组件保存数据时使用的命名空间，不设置则数据保存时会覆盖之前的值。建议使用当前路由name + 页面内组件用途的关键字 | --     | 'data' |


### Events

| 参数   | 说明                                       | 回调参数       |
| :----- | :----------------------------------------- | :------------- |
| search | 点击按钮或者内部表单数据对象发生改变时触发 | (data: Object) |



### Methods

组件代理了`Form`组件的所有方法，具体见Form文档

### Slots

| name   | 说明                                             | 作用域数据             |
| :----- | :----------------------------------------------- | :--------------------- |
| --     | 默认插槽，放置于搜索表单项之后。                 | --                     |
| button | 自定义按钮插槽，会传入用于触发数据更新的回调函数 | { onSearch: Function } |


### ButtonOptions

| 参数           | 类型   | 说明           | 可选值 | 默认值 |
| :------------- | :----- | :------------- | :----- | :----- |
| searchBtnProps | object | 按钮属性对象   | --     | --     |
| btnText        | string | 搜索按钮文字象 | --     | --     |
| resetText      | string | 重置按钮文字   | --     | --     |
| resetBtnProps  | object | 重置按钮属性   | --     | --     |