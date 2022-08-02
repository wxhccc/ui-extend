<template><div><h2 id="commonlistpage-通用列表页模版" tabindex="-1"><a class="header-anchor" href="#commonlistpage-通用列表页模版" aria-hidden="true">#</a> CommonListPage 通用列表页模版</h2>
<p>基于<code v-pre>PagedTable</code>组件和<code v-pre>SearchForm</code>组件封装的高阶组件，用于生成通用场景下的列表页面。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-list-page/Base.vue</p>
</comp-demo><h3 id="多tabs搜索表单" tabindex="-1"><a class="header-anchor" href="#多tabs搜索表单" aria-hidden="true">#</a> 多tabs搜索表单</h3>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>各Tab表单之间数据相互独立，表单项组件是否独立取决于<code v-pre>items</code>对象数组元素是否是同一对象。对于无数据表单组件(例如Input)复用同一个表单项配置对象无太大影响，但对于Select这类的组件，如果需要Options保持独立，那么配置对象就不能使用同一个引用。</p>
</div>
<comp-demo name="mult-tabs"><div slot="description"><p>设置<code>searchForms</code>为包含多个表单配置对象的数组即可生成tab。可以通过设置<code>tabFormKey</code>来将tab的值合并到请求参数对象中。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-list-page/mult-tabs.vue</p>
</comp-demo><h3 id="带操作行的表格" tabindex="-1"><a class="header-anchor" href="#带操作行的表格" aria-hidden="true">#</a> 带操作行的表格</h3>
<p>操作行可以使用表单项组件来做简单的查询，复杂表单还是建议使用<code v-pre>searchForms</code>。</p>
<comp-demo name="Operation"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-list-page/Operation.vue</p>
</comp-demo><h3 id="列表页数据缓存及恢复" tabindex="-1"><a class="header-anchor" href="#列表页数据缓存及恢复" aria-hidden="true">#</a> 列表页数据缓存及恢复</h3>
<p>本例会用两个会销毁的tab容器模拟页面间的切换，数据恢复只有本组件创建时才会生效，如果同页面内希望恢复，可以通过修改组件的key让组件重新渲染。</p>
<comp-demo name="page-restore"><div slot="description"><p>恢复必须要设置<code>created-auto-send</code>为true，才会在组件创建时将记录数据传递给请求接口</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-list-page/page-restore.vue</p>
</comp-demo><h3 id="数据导出功能" tabindex="-1"><a class="header-anchor" href="#数据导出功能" aria-hidden="true">#</a> 数据导出功能</h3>
<p>组件提供了一个导出按钮，如果提供了<code v-pre>exportUrl</code>参数，点击按钮会打开新标签页用于下载导出文件。
可以通过<code v-pre>currentSearchParams.sync</code>同步当前表单搜索条件，用于控制导出数据范围。</p>
<comp-demo name="export-url"><div slot="description"><p>可以通过<code>export-options</code>参数设置导出按钮的样式和文字，也可以绑定事件。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-list-page/export-url.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">使用提示</p>
<p>组件透传了对应参数以及事件绑定给<code v-pre>PagedTable</code>组件。具见组件文档。</p>
</div>
<h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h3>
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
<td style="text-align:left">row-key</td>
<td style="text-align:left">string/Function</td>
<td style="text-align:left"><code v-pre>Table</code>组件的<code v-pre>row-key</code>参数</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'id'</td>
</tr>
<tr>
<td style="text-align:left">export-url</td>
<td style="text-align:left">string</td>
<td style="text-align:left">导出文件的链接地址，为空时不显示导出按钮</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">export-options</td>
<td style="text-align:left">object</td>
<td style="text-align:left">导出按钮的配置对象</td>
<td style="text-align:left">见 <a href="#export-options">导出配置</a></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">tabs-props</td>
<td style="text-align:left">object</td>
<td style="text-align:left"><code v-pre>Tabs</code>组件绑定参数对象，仅在有tabs时生效。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">tab-form-key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">是否将<code v-pre>Tabs</code>组件的绑定值使用此参数指定key合入请求参数之中。为空时不合入。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">search-forms</td>
<td style="text-align:left">object/object[]</td>
<td style="text-align:left">搜索表单配置对象，或者配置对象数组。为数组时会生成tabs。</td>
<td style="text-align:left">见 <a href="#search-forms">搜索表单配置</a></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">search-params-handler</td>
<td style="text-align:left">Function(params)</td>
<td style="text-align:left">当前操作搜索表单数据更新前的处理函数，可用于对特定数据进行处理(例如时间组件数据)。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">current-search-params</td>
<td style="text-align:left">object</td>
<td style="text-align:left">当前操作搜索表单的最终数据，支持<code v-pre>.sync</code>，仅支持内部到外部的同步。可用作生成导出链接。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">current-tab</td>
<td style="text-align:left">string</td>
<td style="text-align:left">当前选中tab的name值，支持<code v-pre>.sync</code>，仅支持内部到外部的同步。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">operation</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表格操作行配置对象。</td>
<td style="text-align:left">见 <a href="#operation">操作行配置</a></td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="export-options" tabindex="-1"><a class="header-anchor" href="#export-options" aria-hidden="true">#</a> export options</h3>
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
<td style="text-align:left">text</td>
<td style="text-align:left">string</td>
<td style="text-align:left">导出按钮的文字内容</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'数据导出'</td>
</tr>
<tr>
<td style="text-align:left">btnProps</td>
<td style="text-align:left">object</td>
<td style="text-align:left">导出按钮绑定的参数对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">{ type: 'text', icon: 'el-icon-download' }</td>
</tr>
<tr>
<td style="text-align:left">events</td>
<td style="text-align:left">object</td>
<td style="text-align:left">导出按钮绑定的事件监听对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="search-forms" tabindex="-1"><a class="header-anchor" href="#search-forms" aria-hidden="true">#</a> search-forms</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>配置对象属性大部分会绑定到<code v-pre>SearchForm</code>组件上，少部分属性是数组格式独有(<code v-pre>TabPane</code>组件参数)。需要注意的是部分属性组件内有相关逻辑控制无法覆盖。</p>
</div>
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
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left"><code v-pre>TabPane</code>组件参数，数组格式独有</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">name</td>
<td style="text-align:left">string</td>
<td style="text-align:left">选项卡绑定值value对应标识符</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">label</td>
<td style="text-align:left">object</td>
<td style="text-align:left">选项卡标题</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left"><code v-pre>SearchForm</code>组件支持参数列表，具体说明见文档</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">items、button-trigger、button-item-options</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">defaultSlot</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left"><code v-pre>SearchForm</code>组件默认插槽内组件</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">buttonSlot</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left"><code v-pre>SearchForm</code>组件具名插槽(button)内组件</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了<code v-pre>PagedTable</code>组件提供的所有方法，可以直接在组件实例上调用。其他内部组件方法可通过$refs获取</p>
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
<td style="text-align:left">默认插槽，位于搜索表单和操作行直接</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
