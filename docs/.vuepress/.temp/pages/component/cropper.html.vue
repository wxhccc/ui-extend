<template><div><h2 id="cropper-图片裁剪" tabindex="-1"><a class="header-anchor" href="#cropper-图片裁剪" aria-hidden="true">#</a> Cropper 图片裁剪</h2>
<p>对传入图片进行裁剪，可生成新的文件用于展示或保存。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>本示例裁剪后将在新窗口打开裁剪后的图片</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/cropper/Base.vue</p>
</comp-demo><h3 id="带预览框的头像裁剪" tabindex="-1"><a class="header-anchor" href="#带预览框的头像裁剪" aria-hidden="true">#</a> 带预览框的头像裁剪</h3>
<comp-demo name="view-avatar"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/cropper/view-avatar.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>此组件是基于<a href="https://www.npmjs.com/package/cropperjs" target="_blank" rel="noopener noreferrer">cropperjs<ExternalLinkIcon/></a>的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅<a href="https://fengyuanchen.github.io/cropperjs/" target="_blank" rel="noopener noreferrer">docs<ExternalLinkIcon/></a>. 在此感谢原作者。</p>
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
<td style="text-align:left">图片地址</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">type</td>
<td style="text-align:left">string</td>
<td style="text-align:left">裁剪类型，每种类型会设定一些默认值</td>
<td style="text-align:left">avatar</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-tip</td>
<td style="text-align:left">string</td>
<td style="text-align:left">插件初始化时的提示文字</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'cropper is initializing...'</td>
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
<h3 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h3>
<p>组件会代理插件<code v-pre>options</code>中的各种事件，在调用传入的事件函数的同时，向外发送事件通知。</p>
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
<td style="text-align:left">ready</td>
<td style="text-align:left">插件准备就绪时触发</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cropstart</td>
<td style="text-align:left">裁剪框开始时触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">cropmove</td>
<td style="text-align:left">裁剪框移动时触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">cropend</td>
<td style="text-align:left">裁剪框停止变化时触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">crop</td>
<td style="text-align:left">裁剪框停止变化后触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">zoom</td>
<td style="text-align:left">裁剪框缩放时触发</td>
<td style="text-align:left">(event: Event)</td>
</tr>
</tbody>
</table>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<table>
<thead>
<tr>
<th style="text-align:left">方法名</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">参数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">resetCropper</td>
<td style="text-align:left">重置组件内插件，使其恢复初始状态</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">getCroppedFile</td>
<td style="text-align:left">获取裁剪内容，并输出为文件对象。方法返回一个Promise对象。</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">callCropperFn</td>
<td style="text-align:left">调用插件实例上的方法，可传递参数</td>
<td style="text-align:left">(fnName:String, ...args[])</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>组件的实例上的$cropper属性为插件的实例，可以调用插件的方法或获取插件的属性。$cropper在有src属性且图片加载完后才能正常访问。</p>
</div>
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
<td style="text-align:left">init</td>
<td style="text-align:left">此插槽可定制插件初始化时的等待界面</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
