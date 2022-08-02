<template><div><h2 id="videoplayer-视频播放器" tabindex="-1"><a class="header-anchor" href="#videoplayer-视频播放器" aria-hidden="true">#</a> VideoPlayer 视频播放器</h2>
<p>简单的视频播放器，基于video.js的vue版本基础封装。后续会进行更精细得组件化。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>本示例裁剪后将在新窗口打开裁剪后的图片</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/video-player/Base.vue</p>
</comp-demo><!-- ### 使用视频指定帧作为预览图

::: demo frame-poster
<<< @/docs/.vuepress/demo/video-player/frame-poster.vue
::: -->
<div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>此组件是基于<a href="https://www.npmjs.com/package/video.js" target="_blank" rel="noopener noreferrer">video.js<ExternalLinkIcon/></a>的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅<a href="https://docs.videojs.com/" target="_blank" rel="noopener noreferrer">docs<ExternalLinkIcon/></a>. 在此感谢原作者。</p>
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
<td style="text-align:left">src</td>
<td style="text-align:left">string</td>
<td style="text-align:left">视频地址，也可以通过options设置多种类型资源地址</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">poster</td>
<td style="text-align:left">string</td>
<td style="text-align:left">视频封面图</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">options</td>
<td style="text-align:left">object</td>
<td style="text-align:left">插件的配置对象，可以设置所有文档支持的配置，且可以组件覆盖默认配置</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>组件的实例上的$player属性为插件的实例，可以调用插件的方法或获取插件的属性。$player在播放器插件初始化完成后才能正常访问。</p>
</div>
</div></template>
