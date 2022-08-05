## ScrollPane 瀑布流容器

适用于需要无限滚动来进行数据翻页操作的场景，自带美化滚动条和数据去重等功能。

::: warning 使用提醒
组件内滚动条组件不支持动态高度，所以组件需要有初始高度值（无论是组件自身高度或者继承自父级dom的高度）。
:::

### 基础用法

:::demo Base
@[code](../.vuepress/demo/scroll-pane/Base.vue)
:::

### 数据去重

对于短期内数据会有变动接口，在分页请求过程中会出现数据重复的情况。这种场景下可以利用`unique-key`对数据进行去重

:::demo Unique 去重后的数据条数一般会小于接口返回的`total`值，这会导致“数据到底了”的限制无效。如果需要这个限制功能，可通过设置`no-more-data`属性来自行判断
@[code](../.vuepress/demo/scroll-pane/Unique.vue)
:::

### 数据到底允许重新请求以及定制提示文字

:::demo custom-texts
@[code](../.vuepress/demo/scroll-pane/custom-texts.vue)
:::


!!!include(scroll-pane/index.zh-CN.md)!!!