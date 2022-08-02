<template><div><h2 id="pagedtable-分页表格" tabindex="-1"><a class="header-anchor" href="#pagedtable-分页表格" aria-hidden="true">#</a> PagedTable 分页表格</h2>
<p><a href="./paged-list">PagedList</a>组件和<a href="./data-table">DataTable</a>组件的高阶封装，集成两组件功能，可用于生成通用分页表格。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>需要传入<code v-pre>columns</code>来生成表格列，需要传入<code v-pre>data</code>来显示数据和分页组件，需要传入<code v-pre>get-paged-data</code>回调函数来响应组件内数据变化。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/paged-table/Base.vue</p>
</comp-demo><h3 id="复杂功能" tabindex="-1"><a class="header-anchor" href="#复杂功能" aria-hidden="true">#</a> 复杂功能</h3>
<p>本例模拟了常见场景下的列表页面的基础要素，包括搜索条件，分页，单一条件排序（后端排序）</p>
<comp-demo name="Full"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/paged-table/Full.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">使用提示</p>
<p>组件透传了对应参数以及事件绑定给<code v-pre>PagedList</code>组件和<code v-pre>DataTable</code>组件。如果出现两组件参数同名情况，组件接受的是<code v-pre>PagedList</code>组件的参数，为了解决这类问题，可以使用<code v-pre>data-table-props</code>和<code v-pre>data-table-events</code>传入<code v-pre>DataTable</code>组件的参数以及绑定事件。如果需要对组件参数进行归类也可以使用这两个参数。</p>
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
<td style="text-align:left">data-table-props</td>
<td style="text-align:left">object</td>
<td style="text-align:left"><code v-pre>DataTable</code>组件绑定参数。可选传参方式</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">data-table-events</td>
<td style="text-align:left">object</td>
<td style="text-align:left"><code v-pre>DataTable</code>组件绑定事件对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-sort</td>
<td style="text-align:left">object</td>
<td style="text-align:left">远程排序数据的初始值。格式为<code v-pre>{orderby: 'id',order: 'desc'}</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ orderby</td>
<td style="text-align:left">string</td>
<td style="text-align:left">排序字段</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ order</td>
<td style="text-align:left">string</td>
<td style="text-align:left">排序规则</td>
<td style="text-align:left">desc/asc</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">sort-prop-keys</td>
<td style="text-align:left">object</td>
<td style="text-align:left">params数据中排序参数的键名，仅控制params对象中的键名，设置初始值时仍为<code v-pre>orderby</code>和<code v-pre>order</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ orderby</td>
<td style="text-align:left">string</td>
<td style="text-align:left">params中排序字段键名</td>
<td style="text-align:left">--</td>
<td style="text-align:left">orderby</td>
</tr>
<tr>
<td style="text-align:left">└ order</td>
<td style="text-align:left">string</td>
<td style="text-align:left">params中排序规则键名</td>
<td style="text-align:left">--</td>
<td style="text-align:left">order</td>
</tr>
</tbody>
</table>
<h3 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h3>
<p>组件透传绑定事件给<code v-pre>PagedList</code>组件和<code v-pre>DataTable</code>组件，可直接在组件上监听对应组件事件。</p>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了<code v-pre>PagedList</code>组件和<code v-pre>DataTable</code>组件(包括<code v-pre>Table</code>组件)提供的所有方法，可以直接在组件实例上调用。</p>
</div></template>
