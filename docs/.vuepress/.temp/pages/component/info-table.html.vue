<template><div><h2 id="infotable-信息表格" tabindex="-1"><a class="header-anchor" href="#infotable-信息表格" aria-hidden="true">#</a> InfoTable 信息表格</h2>
<p>组件是使用<code v-pre>Row</code>组件和<code v-pre>Col</code>组件生成的类表格组件。用于展示label-value格式的信息。</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>因为使用了<code v-pre>Row</code>的flex模式，请注意浏览器兼容性。</p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>只需要<code v-pre>cells</code>就可以渲染出表格，传入<code v-pre>data</code>即可显示数据。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/info-table/Base.vue</p>
</comp-demo><h3 id="响应式单元格和设置固定值" tabindex="-1"><a class="header-anchor" href="#响应式单元格和设置固定值" aria-hidden="true">#</a> 响应式单元格和设置固定值</h3>
<p>响应式是通过<code v-pre>Col</code>组件实现的，具体见文档</p>
<comp-demo name="table-props"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/info-table/table-props.vue</p>
</comp-demo><h3 id="空格填充" tabindex="-1"><a class="header-anchor" href="#空格填充" aria-hidden="true">#</a> 空格填充</h3>
<p>当单元格没有有效值(最终值为假值但不包括数字0)用于填充时，组件会默认使用'--'填充。也可以通过函数自行决定如何填充。</p>
<comp-demo name="empty-cell"><div slot="description"><p>设置<code>set-empty-cell</code>为false可以关闭填充。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/data-table/empty-cell.vue</p>
</comp-demo><h3 id="编辑模式" tabindex="-1"><a class="header-anchor" href="#编辑模式" aria-hidden="true">#</a> 编辑模式</h3>
<p>信息表格可以开启编辑模式，因为编辑组件使用了<a href="./form-field-item">FormFieldItem组件</a>，故编辑模式的表格必须放置于<code v-pre>Form</code>组件中。</p>
<comp-demo name="edit-table"><div slot="description"><p>通过设置cell对象的<code>fieldProps</code>参数来配置编辑项，设置<code>canEdit</code>来控制单元格在编辑模式下是否可编辑。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/info-table/edit-table.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Layout组件文档参照 <element-link component="Layout"></element-link></p>
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
<td style="text-align:left">cells</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">表格单元格配置对象数组。具体结构见<a href="#cell">cell</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">object</td>
<td style="text-align:left">用于表格显示的数据对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">set-empty-cell</td>
<td style="text-align:left">boolean /<br/> Function(data, allData)</td>
<td style="text-align:left">是否需要将空单元格设置成'--'，也可以传入函数来自己决定怎么处理空单元格。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">is-edit</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">表格是否处于编辑状态。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">value/v-model</td>
<td style="text-align:left">object</td>
<td style="text-align:left">编辑状态表格表单的绑定值。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">extra-data</td>
<td style="text-align:left">object</td>
<td style="text-align:left">额外的数据对象。会合并<code v-pre>data</code>生成完整的数据对象。适用于存放不需要参数编辑的数据。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="cell" tabindex="-1"><a class="header-anchor" href="#cell" aria-hidden="true">#</a> cell</h3>
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
<td style="text-align:left">hide</td>
<td style="text-align:left">boolean/function</td>
<td style="text-align:left">单元格是否隐藏（不渲染）。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">props</td>
<td style="text-align:left">object/function</td>
<td style="text-align:left"><code v-pre>Col</code>组绑定参数对象或返回对象的函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">prop</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">单元格显示内容在<code v-pre>data</code>中对应的键名，或表单项绑定值在<code v-pre>value</code>中对应的键名。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">key</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">组件的<code v-pre>key</code>，缺省时使用<code v-pre>prop</code>属性。如果<code v-pre>prop</code>缺省时会使用数组索引，为了性能<code v-pre>prop</code>缺省时请设置<code v-pre>key</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">label</td>
<td style="text-align:left">string/boolean</td>
<td style="text-align:left">单元格label区域显示内容，传入false可不显示label</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">label</td>
<td style="text-align:left">string</td>
<td style="text-align:left">单元格label区域显示内容，传入空值可不显示label</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">icon</td>
<td style="text-align:left">string</td>
<td style="text-align:left">单元格label区域图标，在文字左侧。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">formatter</td>
<td style="text-align:left">Function(value, allData)</td>
<td style="text-align:left">单元格内容区域显示内容的格式化函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">labelComponent</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left">单元格label自定义组件。组件会传入cell对象和allData数据，下同。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">valueComponent</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left">单元格内容区域自定义组件。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">canEdit</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">当前单元格是否可编辑。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">fieldProps</td>
<td style="text-align:left">object</td>
<td style="text-align:left">单元格表单项组件的参数绑定对象，具体见<a href="./form-field-item">FormFieldItem</a>。默认会合入单元格的<code v-pre>prop</code>作为表单项组件的<code v-pre>prop</code>属性，可覆盖。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
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
<td style="text-align:left">change</td>
<td style="text-align:left">表格表单数据发生变化时触发</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
