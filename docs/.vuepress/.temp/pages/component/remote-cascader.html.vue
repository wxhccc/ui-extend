<template><div><h2 id="remotecascader-异步级联选择器" tabindex="-1"><a class="header-anchor" href="#remotecascader-异步级联选择器" aria-hidden="true">#</a> RemoteCascader 异步级联选择器</h2>
<p>基于Cascader组件的动态加载封装的表单域组件。简化异步请求逻辑，支持数据回填。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/remote-cascader/Base.vue</p>
</comp-demo><h3 id="数据回填" tabindex="-1"><a class="header-anchor" href="#数据回填" aria-hidden="true">#</a> 数据回填</h3>
<p>采用数据传入方式的组件回填时不会禁用组件，而resolve方式的为了避免回填时影响操作产生的数据将会暂时禁用组件</p>
<comp-demo name="set-values"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/remote-cascader/set-values.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>组件会透传Cascader组件支持的绝大部分属性和事件绑定以及插槽，但关于动态加载部分的可能无法覆盖。</p>
<p>Tree组件文档参照 <element-link component="Tree"></element-link></p>
</div>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>Element库2.8和2.9版本的Cascader组件Api不一致。2.9版本的需要设置本组件的<code v-pre>is-resolve</code>，且回填体验不佳。</p>
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
<td style="text-align:left">value/v-model</td>
<td style="text-align:left">array / any</td>
<td style="text-align:left">绑定值, 类型视版本决定。需要回填时必须为数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">load</td>
<td style="text-align:left"><code v-pre>(level, value, values, data[, node]) =&gt; Promise</code><br/>参数分别为当前数据层级，当前数据值，完整数据值数组，当前数据对象，当前节点（如果存在）</td>
<td style="text-align:left">数据动态请求函数，需要返回能resolve数据的Promise对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-first-change</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否将value的第一次变化理解为初始化，适用于数据回填。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-value</td>
<td style="text-align:left">array</td>
<td style="text-align:left">初始化数据，如不能确保value第一次变化是初始化（比如结构化数据工具获取的数据即使实际值没变也会导致change），请使用此属性</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-in-order</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否按顺序初始化数据，设置为true时耗时会大幅增加，但下一次<code v-pre>load</code>调用时能获取到上一层的数据对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">readonly</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">展示模式，不显示checkbox，仅显示选中的节点文字</td>
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
<td style="text-align:left">on-change</td>
<td style="text-align:left">value发送变化时触发。和Cascader组件上的change事件的区别是这个事件会传入value值对于的所有节点的完整数据对象，适合需要获取节点里其他属性的场景。对resolve方式无效</td>
<td style="text-align:left">(data: data[])</td>
</tr>
</tbody>
</table>
</div></template>
