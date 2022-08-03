## PagedList 分页列表

分页组件和列表数据插槽的高阶封装，集成分页请求，数据处理，自动发送等功能，用于简化分页场景需求。

::: tip 提示
Pagination组件文档参照 <element-link component="Pagination"></element-link>
:::

### 无序列表（ul）

::: demo Ul
@[code](../.vuepress/demo/paged-list/Ul.vue)
:::

### 分页表格（table）

::: demo Table
@[code](../.vuepress/demo/paged-list/Table.vue)
:::

### 分页列表恢复

本例会用两个会销毁的tab容器模拟页面间的切换，数据恢复只有本组件创建时才会生效，如果同页面内希望恢复，可以通过修改组件的key让组件重新渲染。 

此外本来也展示了如何进行请求时序控制

::: demo Restore 恢复必须要设置`created-auto-send`为true，才会在组件创建时将记录数据传递给请求接口
@[code](../.vuepress/demo/paged-list/Restore.vue)
:::

!!!include(paged-list/index.zh-CN.md)!!!

### Time Control

::: tip 时序请求
<p>在很多需要短时高频ajax请求，由不能对请求做等待限制的场景下，例如匹配搜索。
因为接口是异步的，并且每次请求的返回顺序是不确定的。会导致先请求的数据后返回的情况，这种场合下一般需要抛弃之前请求的回调处理逻辑，仅处理最后一次发送请求的回调。</p>
<p>常见做法是定义一个变量，用来保存每次请求时的时间戳，而每次请求时会当时的时间戳传入接口请求函数，在接口回调里判断传入的时间戳和保存的值是否一致，不一致则放弃后续处理逻辑。</p>
<p>原理是变量值在每次发起请求时都会更新，而传入函数的时间戳会定格在请求发起时，只有最后一次请求函数内传入的时间戳会和保存的值一致。</p>
:::