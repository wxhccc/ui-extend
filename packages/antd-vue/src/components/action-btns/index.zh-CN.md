### Attributes

::: warning 提醒
`btns`属性为对象数组，对象内的属性并非组件属性，故键名必须和文档一致。
:::

| 参数            | 类型     | 说明                                                                               | 可选值 | 默认值 |
| :-------------- | :------- | :--------------------------------------------------------------------------------- | :----- | :----- |
| data            | any      | 按钮点击事件触以及其他所有支持函数的属性在调用时传递的数据信息。                   | --     | --     |
| extra-args      | any[]    | 其他需要附带传递的数据。任意类型值组成的数组，会用展开运算符按序传递给对应的函数。 | --     | --     |
| btns            | object[] | 按钮数据对象数组，具体结构见[ActionBtnItem](#ActionBtnItem)                        | --     | --     |
| loading-flags   | object   | 按钮loading标识值对象，如果`data`数据为对象且允许修改时可设置为data                | --     | --     |
| confirm-options | object   | 确认弹框的自定义配置对象                                                           | --     | --     |


### ActionBtnItem

| 参数        | 类型                                        | 说明                                                                                                 | 可选值 | 默认值                 |
| :---------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------- | :----- | :--------------------- |
| props       | object / Function(data, btn, ...extraArgs)  | 当前按钮上绑定的属性，可以为对象或函数，函数参数为传入数据和当前按钮对象（参数下同）                 | --     | --                     |
| hide        | boolean / Function(data, btn, ...extraArgs) | 当前按钮是否隐藏（完全隐藏，按钮不会存在），适合权限控制                                             | --     | --                     |
| btype       | string / Function(data, btn, ...extraArgs)  | 当前按钮的type属性。也可通过`props`属性控制。                                                        | --     | --                     |
| text        | string / Function(data, btn, ...extraArgs)  | 当前按钮的提示文字。                                                                                 | --     | --                     |
| loadingText | string / Function(data, btn, ...extraArgs)  | 当前按钮在loading状态时的提示文字。                                                                  | --     | --                     |
| key         | string                                      | 当前按钮的唯一标示。在函数的btn参数中可用于确定按钮。也用在按钮的key属性上（缺省时会使用按钮索引值） | --     | --                     |
| loadingKey  | string                                      | 当前按钮的loading状态标识值在`loading-flags`对象中的键名                                             | --     | `__btn${index}loading` |
| click       | Function(data, btn, ...extraArgs)           | 按钮的点击事件函数                                                                                   | --     | --                     |
| isConfirm   | boolean                                     | 按钮点击后是否需要确认操作再执行`click`事件                                                          | --     | --                     |
| confirmMsg  | string / Function(data, btn, ...extraArgs)  | 确认消息框的提示文案                                                                                 | --     | '确定执行此操作?'      |

