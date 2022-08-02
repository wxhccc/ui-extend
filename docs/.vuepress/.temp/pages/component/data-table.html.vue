<template><div><h2 id="datatable-数据表格" tabindex="-1"><a class="header-anchor" href="#datatable-数据表格" aria-hidden="true">#</a> DataTable 数据表格</h2>
<p>基于Table组件封装的表格组件，采用columns配置列，让table可以数据化驱动。</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>组件会透传Table组件支持的所有属性和事件绑定，部分属性设置了默认值，你可以选择覆盖。
组件放弃了插槽的透传，毕竟组件的目的是数据化驱动Table，而插槽写法会妨碍数据化，需要插槽定制的需求可以通过传入组件实现（组件也是数据的一种）。</p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>只需要<code v-pre>columns</code>就可以渲染出表格，传入<code v-pre>data</code>即可显示数据。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/Base.vue</p>
</comp-demo><h3 id="配置原始table组件的各项参数" tabindex="-1"><a class="header-anchor" href="#配置原始table组件的各项参数" aria-hidden="true">#</a> 配置原始Table组件的各项参数</h3>
<div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>如无特殊说明，组件支持透传Table组件的所有方法和绝大部分参数，<code v-pre>columns</code>配置项支持TableColumn组件的绝大部分属性。插槽请按本组件文档描述使用。</p>
</div>
<p>本例设置了Table组件<code v-pre>size</code>，高度，配置了TableColumn组件的<code v-pre>formatter</code>, <code v-pre>type</code>数据，监听了Table组件的<code v-pre>selection-change</code>事件。可调用Table实例的方法</p>
<comp-demo name="table-props"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/table-props.vue</p>
</comp-demo><h3 id="空格填充" tabindex="-1"><a class="header-anchor" href="#空格填充" aria-hidden="true">#</a> 空格填充</h3>
<comp-demo name="empty-cell"><div slot="description"><p>设置<code>set-empty-cell</code>为true即可让空白格填充'--'</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/empty-cell.vue</p>
</comp-demo><h3 id="自带多-单-选数值绑定" tabindex="-1"><a class="header-anchor" href="#自带多-单-选数值绑定" aria-hidden="true">#</a> 自带多(单)选数值绑定</h3>
<p>多选功能是基于<code v-pre>Table</code>组件的多选实现，单选是组件内部实现。
多选值绑定支持翻页表格，通过选择列对象的<code v-pre>reserveSelection</code>属性实现。
单选值可以通过维护分页和选择值来实现页内单选，具体见示例代码。</p>
<comp-demo name="selection-values"><div slot="description"><p>通过设置<code>selection</code>来控制单选或多选。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/selection-values.vue</p>
</comp-demo><h3 id="基础操作按钮" tabindex="-1"><a class="header-anchor" href="#基础操作按钮" aria-hidden="true">#</a> 基础操作按钮</h3>
<p>本例同时也演示了如何利用计算属性来动态设置<code v-pre>columns</code>属性</p>
<comp-demo name="action-btns"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/action-btns.vue</p>
</comp-demo><h3 id="操作按钮异步请求和表格列自定义组件渲染" tabindex="-1"><a class="header-anchor" href="#操作按钮异步请求和表格列自定义组件渲染" aria-hidden="true">#</a> 操作按钮异步请求和表格列自定义组件渲染</h3>
<comp-demo name="async-action"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/async-action.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Table组件文档参照 <element-link component="Table"></element-link></p>
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
<td style="text-align:left">columns</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">列配置项(column)的数组，具体参数见<a href="#column">column</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">set-empty-cell</td>
<td style="text-align:left">boolean /<br/> Function(result, row,column,cellValue,index)</td>
<td style="text-align:left">是否需要将空单元格设置成'--',也可以传入函数来自己决定怎么处理空单元格。<br/>第一个参数为cellValue/formatter(如果设置了)处理结果，余下的和TableColumn组件的<code v-pre>formatter</code>一致</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">selection-key</td>
<td style="text-align:left">string /<br/> Function(row)</td>
<td style="text-align:left">行数据的Key，指定选择组件绑定值。也可以使用函数。功能和<code v-pre>Table</code>组件的<code v-pre>row-key</code>类似，缺省时会尝试使用<code v-pre>row-key</code>的值。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">selection-value</td>
<td style="text-align:left">number/ string/ number[] / string[]</td>
<td style="text-align:left">多（单）选择列的同步值，支持<code v-pre>.sync</code>修饰符。多选时必须为数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了Table组件的所有方法，具体见Table文档</p>
<h3 id="column" tabindex="-1"><a class="header-anchor" href="#column" aria-hidden="true">#</a> column</h3>
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
<td style="text-align:left">key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">渲染列组件时使用的key属性, 默认使用prop属性, 如果列对象没有prop属性，会使用列在数组中的索引作为key</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">hide</td>
<td style="text-align:left">boolean/Function()</td>
<td style="text-align:left">是否隐藏（不渲染）当前列，可以为boolean类型值，也可以用函数动态控制。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">scopeSlot</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left">列的作用域插槽内渲染的组件，会传入column和scope两个props参数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">action</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">操作按钮数组，设置此值时会使用内部操作按钮组件传递给<code v-pre>scopeSlot</code>来生成按钮。操作按钮采用ActionBtns组件生成，函数参数见下文说明。组件具见<a href="./action-btns">ActionBtns</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">selection</td>
<td style="text-align:left">string</td>
<td style="text-align:left">是否使用单(多)选择列，设置此值时会使用内部组件传递给<code v-pre>scopeSlot</code>来生成选择列（而非Table自带选择列）。使用<code v-pre>selectionValue.sync</code>来同步数据。</td>
<td style="text-align:left">radio / checkbox</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">notUseScopeSlot</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否不使用作用域插槽，即使设置了<code v-pre>scopeSlot</code>。可用于在文本和作用域插槽间切换</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">column参数说明</p>
<p>参数优先级关系：<code v-pre>scopeSlot</code> &gt; <code v-pre>action</code> &gt; <code v-pre>selection</code></p>
<p>action按钮项的涉及到的函数的参数Function(row, btn, scope)，分别是当前行数据，当前点击按钮对象，当前行scope对象（包含row, column, $index等）</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">columns性能分析</p>
<p>column列对象的<code v-pre>key</code>属性可用于组件性能优化。当<code v-pre>columns</code>对象属性可能发送变化时，存在如下情形。</p>
<ul>
<li>如果所有列都是固定的也不存在显示隐藏，那么是否设置<code v-pre>key</code>或列是否有<code v-pre>prop</code>属性没有影响。</li>
<li>如果所有列都是固定的但有列会切换显示隐藏，那么不设置<code v-pre>key</code>时，是否会有影响取决于是否设置了<code v-pre>prop</code>。原因，如果没有<code v-pre>key</code>和<code v-pre>prop</code>，列组件会使用index作为key，index会因为显示隐藏发生变化。还有可能因为组件复用导致渲染出错。</li>
<li>如果列不固定且有切换显示隐藏。那么index无法保障有效的顺序。这种情况下列至少需要设置<code v-pre>prop</code>和<code v-pre>key</code>其中之一作为key。</li>
<li>最后是最少见的场景，即需要在让<code v-pre>columns</code>发生变化时所有列都强制重新渲染，这时候可以利用计算属性设置每列的<code v-pre>key</code>值为随机值。</li>
</ul>
</div>
<h3 id="table-attributes" tabindex="-1"><a class="header-anchor" href="#table-attributes" aria-hidden="true">#</a> Table Attributes</h3>
<p>仅列举原组件受影响的字段，其他字段见原组件文档。</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">能否覆盖</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">border</td>
<td style="text-align:left">是</td>
<td style="text-align:left">true</td>
<td style="text-align:left">个人感觉，有边框视觉更舒适</td>
</tr>
<tr>
<td style="text-align:left">stripe</td>
<td style="text-align:left">是</td>
<td style="text-align:left">true</td>
<td style="text-align:left">斑马纹，yes！</td>
</tr>
</tbody>
</table>
</div></template>
