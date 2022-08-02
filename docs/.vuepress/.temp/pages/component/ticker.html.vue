<template><div><h2 id="ticker-倒计时器" tabindex="-1"><a class="header-anchor" href="#ticker-倒计时器" aria-hidden="true">#</a> Ticker 倒计时器</h2>
<p>倒计时器，用来显示倒计时并在结束时执行其他操作</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/ticker/Base.vue</p>
</comp-demo><h3 id="更多样的配置" tabindex="-1"><a class="header-anchor" href="#更多样的配置" aria-hidden="true">#</a> 更多样的配置</h3>
<comp-demo name="props-control"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/ticker/props-control.vue</p>
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
<td style="text-align:left">duration</td>
<td style="text-align:left">+number</td>
<td style="text-align:left">总时间，单位s，必须为正数</td>
<td style="text-align:left">--</td>
<td style="text-align:left">60</td>
</tr>
<tr>
<td style="text-align:left">interval</td>
<td style="text-align:left">+number</td>
<td style="text-align:left">更新间隔，单位s，必须为正数</td>
<td style="text-align:left">--</td>
<td style="text-align:left">1</td>
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
<td style="text-align:left">on-timeout</td>
<td style="text-align:left">倒计时结束时触发的事件</td>
<td style="text-align:left">(event: Event)</td>
</tr>
</tbody>
</table>
</div></template>
