<template><h2 id="viewer-图片查看器"><a class="header-anchor" href="#viewer-图片查看器">#</a> Viewer 图片查看器</h2>
<p>对通过数据或者插槽传入的图片进行查看，支持缩略图渲染，图片选中，全屏查看等。</p>
<h3 id="基础用法"><a class="header-anchor" href="#基础用法">#</a> 基础用法</h3>
<p>::: demo Base
&lt;&lt;&lt; @/docs/.vuepress/demo/viewer/Base.vue
:::</p>
<h3 id="非inline模式且使用插槽"><a class="header-anchor" href="#非inline模式且使用插槽">#</a> 非inline模式且使用插槽</h3>
<p>::: demo uninline-viewer
&lt;&lt;&lt; @/docs/.vuepress/demo/viewer/uninline-viewer.vue
:::</p>
<h3 id="动态修改配置"><a class="header-anchor" href="#动态修改配置">#</a> 动态修改配置</h3>
<p>::: demo modify-props
&lt;&lt;&lt; @/docs/.vuepress/demo/viewer/modify-props.vue
:::</p>
<div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>此组件是基于<a href="https://www.npmjs.com/package/viewerjs" target="_blank" rel="noopener noreferrer">viewerjs<OutboundLink/></a>的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅<a href="https://fengyuanchen.github.io/viewerjs/" target="_blank" rel="noopener noreferrer">docs<OutboundLink/></a>. 在此感谢原作者。</p>
</div>
<h3 id="attributes"><a class="header-anchor" href="#attributes">#</a> Attributes</h3>
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
<td style="text-align:left">imgs</td>
<td style="text-align:left">string[]</td>
<td style="text-align:left">图片地址数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">inline</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否使用行内模式。否则使用Model模式</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">init-tip</td>
<td style="text-align:left">string</td>
<td style="text-align:left">行内模式下插件初始化时的提示文字</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'viewer is initializing...'</td>
</tr>
<tr>
<td style="text-align:left">active-index</td>
<td style="text-align:left">number</td>
<td style="text-align:left">当前选中图片索引，支持<code>.sync</code>.</td>
<td style="text-align:left">--</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">thumb-src-query</td>
<td style="text-align:left">string/(src) =&gt; thumbSrc</td>
<td style="text-align:left">缩略图query字符串（适用于通过参数控制图片大小的地址，例如oss）。也可以使用函数来返回缩略图地址。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">options</td>
<td style="text-align:left">object</td>
<td style="text-align:left">插件的配置对象，可以设置所有文档支持的配置。常用参数见<a href="#options">options</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="options"><a class="header-anchor" href="#options">#</a> options</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>以下参数仅列举原插件中常用的字段，完整列表可查阅相关文档。</p>
</div>
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
<td style="text-align:left">url</td>
<td style="text-align:left">string/function</td>
<td style="text-align:left">组件获取img标签上的属性作为图片地址。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'data-original'</td>
</tr>
<tr>
<td style="text-align:left">backdrop</td>
<td style="text-align:left">string/boolean</td>
<td style="text-align:left">是否显示弹框背景遮层。设置<code>static</code>时点击遮层不会关闭弹框</td>
<td style="text-align:left">true/false/'static'</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">button</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否显示关闭按钮</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">navbar</td>
<td style="text-align:left">boolean/number</td>
<td style="text-align:left">是否显示导航栏。 更多用法参见文档</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">title</td>
<td style="text-align:left">boolean/number/function/[number,function]</td>
<td style="text-align:left">是否显示图片标题以及控制标题显示内容。 更多用法参见文档</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">toolbar</td>
<td style="text-align:left">boolean/number/function/[number,function]</td>
<td style="text-align:left">是否显示工具栏以及精确控制工具栏。 更多用法参见文档</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">toolbar</td>
<td style="text-align:left">boolean/number/object</td>
<td style="text-align:left">是否显示工具栏以及精确控制工具栏。 更多用法参见文档</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">className</td>
<td style="text-align:left">string</td>
<td style="text-align:left">插件根元素添加的类名</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">container</td>
<td style="text-align:left">Element/string</td>
<td style="text-align:left">弹框模式下弹框插入的节点。默认为body</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'body'</td>
</tr>
<tr>
<td style="text-align:left">loading</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">加载图片时是否显示loading效果</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">loop</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">查看图片时是否支持循环</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
</tbody>
</table>
<h3 id="events"><a class="header-anchor" href="#events">#</a> Events</h3>
<p>组件会代理插件<code>options</code>中的各种事件，在调用传入的事件函数的同时，向外发送事件通知。</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">限定模式</th>
<th style="text-align:left">回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">on-ready</td>
<td style="text-align:left">插件准备就绪时触发</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">on-show</td>
<td style="text-align:left">弹框显示时触发</td>
<td style="text-align:left">model</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">on-shown</td>
<td style="text-align:left">弹框显示后触发</td>
<td style="text-align:left">model</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">on-hide</td>
<td style="text-align:left">弹框隐藏时触发</td>
<td style="text-align:left">model</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">on-hidden</td>
<td style="text-align:left">弹框隐藏后触发</td>
<td style="text-align:left">model</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">on-view</td>
<td style="text-align:left">查看图片时触发</td>
<td style="text-align:left">--</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">on-zoom</td>
<td style="text-align:left">图片缩放时触发</td>
<td style="text-align:left">--</td>
<td style="text-align:left">(event: Event)</td>
</tr>
<tr>
<td style="text-align:left">on-zoomed</td>
<td style="text-align:left">图片缩放后触发</td>
<td style="text-align:left">--</td>
<td style="text-align:left">(event: Event)</td>
</tr>
</tbody>
</table>
<h3 id="methods"><a class="header-anchor" href="#methods">#</a> Methods</h3>
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
<td style="text-align:left">show</td>
<td style="text-align:left">控制弹框显示。model模式可用</td>
<td style="text-align:left">(immediate:Boolean)</td>
</tr>
<tr>
<td style="text-align:left">hide</td>
<td style="text-align:left">控制弹框隐藏。model模式可用</td>
<td style="text-align:left">(immediate:Boolean)</td>
</tr>
<tr>
<td style="text-align:left">view</td>
<td style="text-align:left">查看指定图片</td>
<td style="text-align:left">(index:Number)</td>
</tr>
<tr>
<td style="text-align:left">prev</td>
<td style="text-align:left">查看前一张图片</td>
<td style="text-align:left">(loop:Boolean)</td>
</tr>
<tr>
<td style="text-align:left">next</td>
<td style="text-align:left">查看后一张图片</td>
<td style="text-align:left">(loop:Boolean)</td>
</tr>
<tr>
<td style="text-align:left">move</td>
<td style="text-align:left">当前查看图片相对移动指定像素</td>
<td style="text-align:left">(offsetX:Number[, offsetY: Number])</td>
</tr>
<tr>
<td style="text-align:left">moveTo</td>
<td style="text-align:left">移动当前查看图片到指定坐标</td>
<td style="text-align:left">(x:Number[, y: Number])</td>
</tr>
<tr>
<td style="text-align:left">zoom</td>
<td style="text-align:left">用相对比例缩放当前图片</td>
<td style="text-align:left">(ratio:Number[, hasTooltip: Boolean])</td>
</tr>
<tr>
<td style="text-align:left">rotate</td>
<td style="text-align:left">当前图片旋转指定度数，正右负左</td>
<td style="text-align:left">(degree:Number)</td>
</tr>
<tr>
<td style="text-align:left">rotateTo</td>
<td style="text-align:left">旋转当前图片到指定度数</td>
<td style="text-align:left">(degree:Number)</td>
</tr>
<tr>
<td style="text-align:left">scale</td>
<td style="text-align:left">图片变形缩放（0-1）</td>
<td style="text-align:left">(scaleX:Number[, scaleY:Number])</td>
</tr>
<tr>
<td style="text-align:left">scaleX</td>
<td style="text-align:left">图片X轴缩放</td>
<td style="text-align:left">(scaleX:Number)</td>
</tr>
<tr>
<td style="text-align:left">scaleY</td>
<td style="text-align:left">图片Y轴缩放</td>
<td style="text-align:left">(scaleY:Number)</td>
</tr>
<tr>
<td style="text-align:left">play</td>
<td style="text-align:left">播放幻灯片</td>
<td style="text-align:left">(fullscreen:Boolean)</td>
</tr>
<tr>
<td style="text-align:left">stop</td>
<td style="text-align:left">停止播放幻灯片</td>
<td style="text-align:left">(scaleY:Number)</td>
</tr>
<tr>
<td style="text-align:left">full</td>
<td style="text-align:left">进入model模式，仅限inline模式</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">exit</td>
<td style="text-align:left">退出model模式，仅限inline模式</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">tooltip</td>
<td style="text-align:left">显示当前图片的显示大小百比例</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">toggle</td>
<td style="text-align:left">切换当前显示图片显示大小到原图大小</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">reset</td>
<td style="text-align:left">重置当前图片状态。注意是当前图片，而不是组件状态</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">update</td>
<td style="text-align:left">更新组件图片列表，适用于插槽方式动态添加图片(imgs方式会自动更新)</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>组件的实例上的$viewer属性为插件的实例，可以调用插件的方法或获取插件的属性。$cropper在组件初始化完成后才能正常访问。</p>
</div>
<h3 id="slots"><a class="header-anchor" href="#slots">#</a> Slots</h3>
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
<td style="text-align:left">--</td>
<td style="text-align:left">对于需要查看页面某个区域的图片，可以使用默认插槽方式</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init</td>
<td style="text-align:left">行内模式下，定制初始化状态提示界面</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</template>