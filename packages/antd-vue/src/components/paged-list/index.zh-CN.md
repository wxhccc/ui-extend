### Attributes

| 参数               | 类型                        | 说明                                                                                                                  | 可选值                 | 默认值                       |
| :----------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------- | :--------------------------- |
| paged-data         | object                      | 分页数据源，必须包含总条数和数据数组，例如`{total: 200, rows: [...]}`                                                 | --                     | --                           |
| extra-model        | object                      | 外部输入表单数据，会合并到输出数据中，变化时也会重置页码                                                              | --                     | --                           |
| get-paged-data     | Function(params, accessKey) | 请求回调函数，会接受分页数据和`extra-model`传入的数据合并成params数据, 以及用于进行[时序请求](#time-control)需要的key | --                     | --                           |
| params-switch-maps | object                      | 数据传递给请求函数前，可以用searchFormDateSwitch对数据中的时间范围进行转换                                            | --                     | --                           |
| loading            | boolean                     | 数据是否在请求中                                                                                                      | --                     | --                           |
| flex-layout        | boolean                     | 是否使用flex布局填充满容器中                                                                                          | --                     | --                           |
| v-model:refresh    | boolean                     | 是否需要刷新列表中                                                                                                    | --                     | --                           |
| created-auto-send  | boolean                     | 是否在组件创建后自动发送请求                                                                                          | --                     | --                           |
| init-data          | object                      | 初始化分页数据，可以初始化`curPage`(当前页)和`pageSize`(每页条数)                                                     | --                     | { curPage: 1, pageSize: 20 } |
| prop-keys          | object                      | 组件内属性字段配置                                                                                                    | --                     | 详见[prop-keys](#prop-keys)  |
| pagination         | boolean \| object           | Pagination组件属性对象，支持绝大部分参数，不支持配置的参数见[prop-keys](#prop-keys)                                   | --                     | --                           |
| loading-props      | string / object             | Loading组件属性对象                                                                                                   | 见[Loading](./loading) | --                           |
| refresh            | boolean                     | 是否重新发送请求，必须用.sync修饰符，值为true时重新发送请求，然后设置值为false。也可以用方法重新发起请求              | --                     | --                           |
| fetch-access-key   | string/number               | 传入的请求时序控制值，只能为基础类型的值，组件内会默认使用当前时间戳，如果因为并发原因时间戳无法满足可手动传入值      | --                     | Date.now()                   |
| --                 | --                          | 以下属性为可选的高级功能，使用时可能需要多理解                                                                        | --                     | --                           |
| need-store         | boolean                     | 是否需要在每次请求时在SessionStorage中保存分页数据和请求的params                                                      | --                     | --                           |
| restore            | boolean                     | 是否需要恢复之前保存的值，适用于页面跳转后返回时恢复页面数据                                                          | --                     | --                           |
| store-key          | string                      | 组件保存数据时使用的命名空间，不设置则数据保存时会覆盖之前的值。建议使用当前路由name + 页面内组件用途的关键字         | --                     | 'data'                       |

::: warning 注意
<p>组件初始化时如果设置`restore`为true且之前有存储的数据，那么组件创建后会用之前存储的数据作为参数传递给请求回调函数。</p>
<p>在请求回调函数执行之前组件不会响应`extra-form`属性的变化，并且分页组件也不会显示。</p>
<p>如果希望在异步回调函数有结果返回之前都不响应变化（比如希望手动恢复`extra-form`的展示值），可以在回调函数里返回一个Promise对象</p>
:::

### prop-keys

::: warning 注意
配置参数是`prop-keys`对象的键名，会合并到默认值对象。不能使用短横线写法
:::

| 参数     | 类型   | 说明                                                    | 默认值  |
| :------- | :----- | :------------------------------------------------------ | :------ |
| total    | string | 数据源中总数对于字段                                    | 'total' |
| rows     | string | 数据源中数据数组对于字段                                | 'rows'  |
| pageSize | string | params中每页记录条数字段，不影响`init-data`中字段，下同 | 'size'  |
| curPage  | string | params中当前页码字段                                    | 'page'  |
| hasMore  | string | params中是否有下一页字段，适用于不知道总页数的情况      | 'page'  |

### limited Pagination Attributes

下列Pagination组件的参数因为封装组件内维护了，故无法通过`pagination`来配置。

| 参数         | 说明                                       |
| :----------- | :----------------------------------------- |
| page-size    | 每页条数                                   |
| current-page | 当前页码，如需手动修改请使用组件提供的方法 |
| total        | 总记录条数                                 |
| cur-page      | params中当前页码字段                       |

### Events

| 参数              | 说明                       | 回调参数                          |
| :---------------- | :------------------------- | :-------------------------------- |
| extra-model-change | `extra-model`发生变化时触发 | (newVal: any, oldValJson: string) |


### Methods

| 方法名         | 说明                                                                | 参数 |
| :------------- | :------------------------------------------------------------------ | :--- |
| getStoreData   | 获取组件内存储的数据，结构为 `{ pagination: {...}, params: {...} }` | --   |
| sendRequest    | 用当前params参数发送请求，用于重新发送请求。和`refresh`功能一致     | --   |
| clearStoreData | 清除组件内存储的数据                                                | --   |

### Slots

| name   | 说明                                           | 作用域数据               |
| :----- | :--------------------------------------------- | :----------------------- |
| --     | 默认插槽，内容会放置于表单项后，`Form`组件中。 | --                       |
| button | 自定义按钮，传入用于触发数据改变的函数。       | { onSearch: Function() } |
