<template><div><h2 id="loading-加载组件" tabindex="-1"><a class="header-anchor" href="#loading-加载组件" aria-hidden="true">#</a> Loading 加载组件</h2>
<p>加载组件，渲染时会在父组件内生成一个显示加载中状态的遮层，也可选择生成全屏遮层。</p>
<div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>目前组件是Element的Loading指令的服务封装，支持服务的大部分配置项。Loading文档参照 <element-link component="Loading"></element-link></p>
<p>封装的目的是本项目后期多UI库的兼容。用户项目内建议遵循对应UI库文档</p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/loading/Base.vue</p>
</comp-demo><h3 id="更多样的配置" tabindex="-1"><a class="header-anchor" href="#更多样的配置" aria-hidden="true">#</a> 更多样的配置</h3>
<p>可以自定义加载文案，图标和背景色，也可以控制是否全屏</p>
<comp-demo name="props-control"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/loading/props-control.vue</p>
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
<td style="text-align:left">body</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否将遮层添加到body</td>
<td style="text-align:left">--</td>
<td style="text-align:left">false</td>
</tr>
<tr>
<td style="text-align:left">lock</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left"><code v-pre>body</code>为true时，是否锁住body的滚动</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">text</td>
<td style="text-align:left">string</td>
<td style="text-align:left">显示在加载图标下方的加载文案</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">spinner</td>
<td style="text-align:left">string</td>
<td style="text-align:left">自定义加载图标类名</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">background</td>
<td style="text-align:left">string</td>
<td style="text-align:left">遮层背景色</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
