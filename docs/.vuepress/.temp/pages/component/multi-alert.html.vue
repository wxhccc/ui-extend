<template><div><h2 id="multialert-多模块警告" tabindex="-1"><a class="header-anchor" href="#multialert-多模块警告" aria-hidden="true">#</a> MultiAlert 多模块警告</h2>
<p>Alert组件扩展，以支持组件内多组信息的显示。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/multi-alert/Base.vue</p>
</comp-demo><h3 id="透传属性和事件绑定给原始组件" tabindex="-1"><a class="header-anchor" href="#透传属性和事件绑定给原始组件" aria-hidden="true">#</a> 透传属性和事件绑定给原始组件</h3>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>请勿透传title和description属性</p>
</div>
<comp-demo name="alert-props"><div slot="description"><p>显示图标属性虽然能生效，但不太适合多模块场景</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/multi-alert/alert-props.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Alert组件文档参照 <element-link component="Alert"></element-link></p>
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
<td style="text-align:left">data</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">数据对象数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ title</td>
<td style="text-align:left">string</td>
<td style="text-align:left">标题</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ description</td>
<td style="text-align:left">string / string[]</td>
<td style="text-align:left">描述内容字符串或列表内容数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
