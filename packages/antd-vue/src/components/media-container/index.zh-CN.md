### Attributes

| 参数              | 类型    | 说明                                                                       | 可选值         | 默认值 |
| :---------------- | :------ | :------------------------------------------------------------------------- | :------------- | :----- |
| type              | string  | 媒体文件类型                                                               | image \| video | image  |
| src               | string  | 文件地址                                                                   | --             | --     |
| loading           | boolean | 是否在加载中, 传入src时组件自动处理，一般和mediaSize配合使用               | --             | true   |
| autoFit           | boolean | 是否自动适应容器尺寸变化                                                   | --             | true   |
| showBackgroud     | boolean | 是否需要显示背景                                                           | --             | true   |
| v-model:mediaSize | Size    | 媒体文件尺寸，如果媒体源被其他组件引用，也可以用媒体元素的实际像素尺寸传入 | --             | --     |


