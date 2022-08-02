<template><h2 id="drawer-抽屉"><a class="header-anchor" href="#drawer-抽屉">#</a> Drawer 抽屉</h2>
<p>从屏幕边缘划出的弹框面板</p>
<h3 id="基础用法"><a class="header-anchor" href="#基础用法">#</a> 基础用法</h3>
<p>::: demo Base 点击触发按钮后从右侧滑出，点击遮罩区或关闭按钮可关闭
&lt;&lt;&lt; @/docs/.vuepress/demo/drawer/Base.vue
:::</p>
<h3 id="自定义弹出位置"><a class="header-anchor" href="#自定义弹出位置">#</a> 自定义弹出位置</h3>
<p>::: demo Placement
&lt;&lt;&lt; @/docs/.vuepress/demo/drawer/Placement.vue
:::</p>
<h3 id="抽屉表单"><a class="header-anchor" href="#抽屉表单">#</a> 抽屉表单</h3>
<p>::: demo Form 可通过<code>body-size</code>属性修改抽屉容器的宽度/高度
&lt;&lt;&lt; @/docs/.vuepress/demo/drawer/Form.vue
:::</p>
<h3 id="作为普通组件渲染"><a class="header-anchor" href="#作为普通组件渲染">#</a> 作为普通组件渲染</h3>
<p><code>container</code>为falsy值时，组件会作为普通组件被渲染，这时抽屉打开时会使用绝对定位，相对于父级中第一个使用了定位属性的容器定位。适合不想要全屏覆盖的场景。</p>
<p>::: demo Absolute
&lt;&lt;&lt; @/docs/.vuepress/demo/drawer/Absolute.vue
:::</p>
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
<td style="text-align:left">visible</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否显示抽屉，支持.sync修饰符</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">title</td>
<td style="text-align:left">string/boolean</td>
<td style="text-align:left">标题，可通过具名slot传入。也可以设置false隐藏。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">placement</td>
<td style="text-align:left">string</td>
<td style="text-align:left">抽屉滑出的位置，支持上、右、下、左四个方向</td>
<td style="text-align:left">top/right/bottom/left</td>
<td style="text-align:left">right</td>
</tr>
<tr>
<td style="text-align:left">body-size</td>
<td style="text-align:left">string</td>
<td style="text-align:left">抽屉容器的尺寸, <code>placement</code>为<em>top</em>，<em>bottom</em>时设定容器高度，为<em>left</em>，<em>right</em>时设定容器宽度。默认宽度，高度值分别为'40%'，'200px'</td>
<td style="text-align:left">--</td>
<td style="text-align:left">40%/200px</td>
</tr>
<tr>
<td style="text-align:left">show-close</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否显示关闭按钮</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">destroy-on-close</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">关闭时是否销毁组件的Dom节点(组件实例不会销毁)，适合需要每次打开时重置内容的场景</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">mask-closeable</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">点击遮罩时是否允许关闭</td>
<td style="text-align:left">--</td>
<td style="text-align:left">true</td>
</tr>
<tr>
<td style="text-align:left">container</td>
<td style="text-align:left">Selectors(string)/<br/>HTMLElement/<br/><code>() =&gt;  HTMLElement</code></td>
<td style="text-align:left">指定组件挂载的HTML节点，为falsy值时作为普通组件</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'body'</td>
</tr>
<tr>
<td style="text-align:left">before-close</td>
<td style="text-align:left">Function(done), 调用done用于关闭抽屉</td>
<td style="text-align:left">关闭前的回掉，会暂停抽屉的关闭，不调用done可取消关闭操作</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">body-style</td>
<td style="text-align:left">object</td>
<td style="text-align:left">抽屉容器的样式，可能影响组件功能，不推荐使用</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="events"><a class="header-anchor" href="#events">#</a> Events</h3>
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
<td style="text-align:left">open</td>
<td style="text-align:left">抽屉打开时触发</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">opend</td>
<td style="text-align:left">抽屉打开动画结束后时触发</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">close</td>
<td style="text-align:left">抽屉关闭时触发</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">closed</td>
<td style="text-align:left">抽屉关闭动画结束时触发</td>
<td style="text-align:left">--</td>
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
<td style="text-align:left">close</td>
<td style="text-align:left">关闭组件</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
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
<td style="text-align:left">容器内容区域</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">title</td>
<td style="text-align:left">容器标题区内容</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">footer</td>
<td style="text-align:left">容器底部区内容</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</template>