<template><div><h2 id="searchinput-搜索输入框" tabindex="-1"><a class="header-anchor" href="#searchinput-搜索输入框" aria-hidden="true">#</a> SearchInput 搜索输入框</h2>
<p>定制的Input组件，通过点击按钮或按回车键触发v-model绑定值的改变。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/search-input/Base.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Input组件文档参照 <element-link component="Input"></element-link></p>
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
<td style="text-align:left">string/number</td>
<td style="text-align:left">绑定值</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">btn-props</td>
<td style="text-align:left">object</td>
<td style="text-align:left">搜索按钮的绑定属性对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">loading</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">搜索按钮是否加载中， 也可以通过btnProps传入</td>
<td style="text-align:left">--</td>
<td style="text-align:left">false</td>
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
<td style="text-align:left">input</td>
<td style="text-align:left">点击搜索按钮或按回车键时触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
</tbody>
</table>
</div></template>
