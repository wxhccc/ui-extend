### Attributes

| 参数            | 类型                     | 说明                                                                                             | 可选值 | 默认值                      |
| :-------------- | :----------------------- | :----------------------------------------------------------------------------------------------- | :----- | :-------------------------- |
| imgs            | string[]                 | 图片地址数组                                                                                     | --     | --                          |
| inline          | boolean                  | 是否使用行内模式。否则使用Model模式                                                              | --     | true                        |
| init-tip        | string                   | 行内模式下插件初始化时的提示文字                                                                 | --     | 'viewer is initializing...' |
| active-index    | number                   | 当前选中图片索引，支持`.sync`.                                                                   | --     | 0                           |
| thumb-src-query | string/(src) => thumbSrc | 缩略图query字符串（适用于通过参数控制图片大小的地址，例如oss）。也可以使用函数来返回缩略图地址。 | --     | --                          |
| options         | object                   | 插件的配置对象，可以设置所有文档支持的配置。常用参数见[options](#options)                        | --     | --                          |

### options

::: tip 提示
以下参数仅列举原插件中常用的字段，完整列表可查阅相关文档。
:::

| 参数      | 类型                                      | 说明                                                     | 可选值              | 默认值          |
| :-------- | :---------------------------------------- | :------------------------------------------------------- | :------------------ | :-------------- |
| url       | string/function                           | 组件获取img标签上的属性作为图片地址。                    | --                  | 'data-original' |
| backdrop  | string/boolean                            | 是否显示弹框背景遮层。设置`static`时点击遮层不会关闭弹框 | true/false/'static' | true            |
| button    | boolean                                   | 是否显示关闭按钮                                         | --                  | true            |
| navbar    | boolean/number                            | 是否显示导航栏。 更多用法参见文档                        | --                  | true            |
| title     | boolean/number/function/[number,function] | 是否显示图片标题以及控制标题显示内容。 更多用法参见文档  | --                  | true            |
| toolbar   | boolean/number/function/[number,function] | 是否显示工具栏以及精确控制工具栏。 更多用法参见文档      | --                  | true            |
| toolbar   | boolean/number/object                     | 是否显示工具栏以及精确控制工具栏。 更多用法参见文档      | --                  | true            |
| className | string                                    | 插件根元素添加的类名                                     | --                  | --              |
| container | Element/string                            | 弹框模式下弹框插入的节点。默认为body                     | --                  | 'body'          |
| loading   | boolean                                   | 加载图片时是否显示loading效果                            | --                  | true            |
| loop      | boolean                                   | 查看图片时是否支持循环                                   | --                  | true            |



### Events

组件会代理插件`options`中的各种事件，在调用传入的事件函数的同时，向外发送事件通知。

| 参数      | 说明               | 限定模式 | 回调参数       |
| :-------- | :----------------- | :------- | :------------- |
| on-ready  | 插件准备就绪时触发 | --       | --             |
| on-show   | 弹框显示时触发     | model    | --             |
| on-shown  | 弹框显示后触发     | model    | --             |
| on-hide   | 弹框隐藏时触发     | model    | --             |
| on-hidden | 弹框隐藏后触发     | model    | --             |
| on-view   | 查看图片时触发     | --       | (event: Event) |
| on-zoom   | 图片缩放时触发     | --       | (event: Event) |
| on-zoomed | 图片缩放后触发     | --       | (event: Event) |


### Methods

| 方法名   | 说明                                                             | 参数                                  |
| :------- | :--------------------------------------------------------------- | :------------------------------------ |
| show     | 控制弹框显示。model模式可用                                      | (immediate:Boolean)                   |
| hide     | 控制弹框隐藏。model模式可用                                      | (immediate:Boolean)                   |
| view     | 查看指定图片                                                     | (index:Number)                        |
| prev     | 查看前一张图片                                                   | (loop:Boolean)                        |
| next     | 查看后一张图片                                                   | (loop:Boolean)                        |
| move     | 当前查看图片相对移动指定像素                                     | (offsetX:Number[, offsetY: Number])   |
| moveTo   | 移动当前查看图片到指定坐标                                       | (x:Number[, y: Number])               |
| zoom     | 用相对比例缩放当前图片                                           | (ratio:Number[, hasTooltip: Boolean]) |
| rotate   | 当前图片旋转指定度数，正右负左                                   | (degree:Number)                       |
| rotateTo | 旋转当前图片到指定度数                                           | (degree:Number)                       |
| scale    | 图片变形缩放（0-1）                                              | (scaleX:Number[, scaleY:Number])      |
| scaleX   | 图片X轴缩放                                                      | (scaleX:Number)                       |
| scaleY   | 图片Y轴缩放                                                      | (scaleY:Number)                       |
| play     | 播放幻灯片                                                       | (fullscreen:Boolean)                  |
| stop     | 停止播放幻灯片                                                   | (scaleY:Number)                       |
| full     | 进入model模式，仅限inline模式                                    | --                                    |
| exit     | 退出model模式，仅限inline模式                                    | --                                    |
| tooltip  | 显示当前图片的显示大小百比例                                     | --                                    |
| toggle   | 切换当前显示图片显示大小到原图大小                               | --                                    |
| reset    | 重置当前图片状态。注意是当前图片，而不是组件状态                 | --                                    |
| update   | 更新组件图片列表，适用于插槽方式动态添加图片(imgs方式会自动更新) | --                                    |

::: tip 提示
组件的实例上的$viewer属性为插件的实例，可以调用插件的方法或获取插件的属性。$cropper在组件初始化完成后才能正常访问。
:::

### Slots

| name | 说明                                                 | 作用域数据 |
| :--- | :--------------------------------------------------- | :--------- |
| --   | 对于需要查看页面某个区域的图片，可以使用默认插槽方式 | --         |
| init | 行内模式下，定制初始化状态提示界面                   | --         |

