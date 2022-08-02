### Attributes

| 参数           | 类型                   | 说明                                                                                                                                                  | 可选值                        | 默认值 |
| :------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :----- |
| sending        | boolean                | 提交按钮是否loading中                                                                                                                                 | --                            | --     |
| parent-refs    | object                 | 包含Form组件ref值的$refs对象                                                                                                                          | --                            | --     |
| ref-key        | string                 | 需要进行校验的Form组件的ref名称                                                                                                                       | --                            | form   |
| is-cancel      | boolean                | 是否显示取消按钮而不是重置按钮                                                                                                                        | --                            | false  |
| submit-only    | boolean                | 是否仅显示提交按钮                                                                                                                                    | --                            | --     |
| submit         | function               | 点击提交按钮后的处理方法，如果需要验证和确认则在通过后调用                                                                                            | --                            | --     |
| cancel         | function               | 点击取消按钮后的处理方法                                                                                                                              | --                            | --     |
| btn-keys       | string[]               | 需要显示按钮的key数组，默认情况下组件会按照传入参数逻辑处理按钮显示，并且提交按钮在左。你可以通过这个属性设定要显示的按钮和顺序，设置后内部逻辑无效。 | submit/cancel/reset           | --     |
| is-validate    | boolean                | 是否需要检验表单，需要校验时parent-refs和ref-key必须正确传入                                                                                          | --                            | --     |
| submit-confirm | boolean                | 提交前是否需要用户确认操作，设置为`true`时会默认先进行表单验证                                                                                        | --                            | --     |
| btn-props      | object / function(key) | 按钮绑定的属性对象，为object是对所有按钮生效，可以用函数来针对每个按钮绑定不同属性，函数参数是按钮的key。                                             | --                            | --     |
| texts          | object                 | 组件内各按钮及状态提示文本对象                                                                                                                        | 见 [文本详情](#texts)  | --     |


### texts

::: warning 注意
列表里参数是texts对象的键名，会合并到默认值对象。不能使用短横线写法
:::

| 参数        | 类型   | 说明                  | 默认值      |
| :---------- | :----- | :-------------------- | :---------- |
| sureBtn     | string | 提交按钮文字          | '提交'      |
| cancelBtn   | string | 提交按钮是否loading中 | '取消'      |
| resetBtn    | string | 提交按钮是否loading中 | '重置'      |
| sending     | string | 提交按钮是否loading中 | '提交中...' |
| confirmWord | string | 提交按钮是否loading中 | '确认提交?' |