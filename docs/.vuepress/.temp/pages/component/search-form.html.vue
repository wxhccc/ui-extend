<template><div><h2 id="searchform-搜索表单" tabindex="-1"><a class="header-anchor" href="#searchform-搜索表单" aria-hidden="true">#</a> SearchForm 搜索表单</h2>
<p>基于<a href="./form-fields">FormFields</a>组件和<element-link component="Form"></element-link>组件封装的搜索表单。用于列表的搜索条件。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>建议使用按钮触发数据变动，这样可以避免短时间内多次调用数据接口。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/search-form/Base.vue</p>
</comp-demo><h3 id="设置form组件和搜索按钮的参数" tabindex="-1"><a class="header-anchor" href="#设置form组件和搜索按钮的参数" aria-hidden="true">#</a> 设置Form组件和搜索按钮的参数</h3>
<p>组件会透传所有属性和事件给内部<code v-pre>Form</code>组件，并且代理了<code v-pre>Form</code>组件上的所有方法。</p>
<p>此例使用了<code v-pre>data.sync</code>来绑定数据。</p>
<comp-demo name="more-props"><div slot="description"><p>此例设置了<code>Form</code>组件的size，label-width属性，还通过<code>buttonItemOptions</code>设置了搜索按钮的参数和其父级<code>FormItem</code>组件的属性。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/search-form/more-props.vue</p>
</comp-demo><h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h3>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">可选值</th>
<th style="text-align:left">默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">items</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">表单项对象数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">button-trigger</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否使用按钮来触发数据更新</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">object</td>
<td style="text-align:left">同步数据对象，支持<code v-pre>.sync</code>。组件恢复数据时会更新为组件内存储数据。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">searching</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">搜索按钮是否出于loading状态</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">button-item-options</td>
<td style="text-align:left">object</td>
<td style="text-align:left">按钮即其<code v-pre>FormItem</code>组件绑定参数配置对象。具体见<a href="#button-item-options">button item options</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">以下属性为可选的高级功能，使用时可能需要多理解</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">need-store</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否需要在每次请求时在SessionStorage中保存分页数据和请求的params</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">restore</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否需要恢复之前保存的值，适用于页面跳转后返回时恢复页面数据</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">store-key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">组件保存数据时使用的命名空间，不设置则数据保存时会覆盖之前的值。建议使用当前路由name + 页面内组件用途的关键字</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'data'</td>
</tr>
</tbody>
</table>
<h3 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h3>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">search</td>
<td style="text-align:left">点击按钮或者内部表单数据对象发生改变时触发</td>
<td style="text-align:left">(data: Object)</td>
</tr>
</tbody>
</table>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了<code v-pre>Form</code>组件的所有方法，具体见Form文档</p>
<h3 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h3>
<table>
<thead>
<tr>
<th style="text-align:left">name</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">作用域数据</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">默认插槽，放置于搜索表单项之后。</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">button</td>
<td style="text-align:left">自定义按钮插槽，会传入用于触发数据更新的回调函数</td>
<td style="text-align:left">{ onSearch: Function }</td>
</tr>
</tbody>
</table>
</div></template>
