<template><div><h2 id="pagedlist-分页列表" tabindex="-1"><a class="header-anchor" href="#pagedlist-分页列表" aria-hidden="true">#</a> PagedList 分页列表</h2>
<p>分页组件和列表数据插槽的高阶封装，集成分页请求，数据处理，自动发送等功能，用于简化分页场景需求。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Pagination组件文档参照 <element-link component="Pagination"></element-link></p>
</div>
<h3 id="无序列表-ul" tabindex="-1"><a class="header-anchor" href="#无序列表-ul" aria-hidden="true">#</a> 无序列表（ul）</h3>
<comp-demo name="Ul"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/paged-list/Ul.vue</p>
</comp-demo><h3 id="分页表格-table" tabindex="-1"><a class="header-anchor" href="#分页表格-table" aria-hidden="true">#</a> 分页表格（table）</h3>
<comp-demo name="Table"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/paged-list/Table.vue</p>
</comp-demo><h3 id="分页列表恢复" tabindex="-1"><a class="header-anchor" href="#分页列表恢复" aria-hidden="true">#</a> 分页列表恢复</h3>
<p>本例会用两个会销毁的tab容器模拟页面间的切换，数据恢复只有本组件创建时才会生效，如果同页面内希望恢复，可以通过修改组件的key让组件重新渲染。</p>
<p>此外本来也展示了如何进行请求时序控制</p>
<comp-demo name="Restore"><div slot="description"><p>恢复必须要设置<code>created-auto-send</code>为true，才会在组件创建时将记录数据传递给请求接口</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/paged-list/Restore.vue</p>
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
<td style="text-align:left">paged-data</td>
<td style="text-align:left">object</td>
<td style="text-align:left">分页数据源，必须包含总条数和数据数组，例如<code v-pre>{total: 200, rows: [...]}</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">extra-form</td>
<td style="text-align:left">object</td>
<td style="text-align:left">额外的请求附带数据，传入响应式对象，传入对象引用改变或对象属性改变可自动触发请求且会重置页码</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">get-paged-data</td>
<td style="text-align:left">Function(params, accessKey)</td>
<td style="text-align:left">请求回调函数，会接受分页数据和<code v-pre>extra-form</code>传入的数据合并成params数据, 以及用于进行<a href="#time-control">时序请求</a>需要的key</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">loading</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">数据是否在请求中</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">created-auto-send</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否在组件创建后自动发送请求</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-data</td>
<td style="text-align:left">object</td>
<td style="text-align:left">初始化分页数据，可以初始化<code v-pre>curPage</code>(当前页)和<code v-pre>pageSize</code>(每页条数)</td>
<td style="text-align:left">--</td>
<td style="text-align:left">{ curPage: 1, pageSize: 20 }</td>
</tr>
<tr>
<td style="text-align:left">prop-keys</td>
<td style="text-align:left">object</td>
<td style="text-align:left">组件内属性字段配置</td>
<td style="text-align:left">--</td>
<td style="text-align:left">详见<a href="#prop-keys">prop-keys</a></td>
</tr>
<tr>
<td style="text-align:left">pagination-props</td>
<td style="text-align:left">object</td>
<td style="text-align:left">Pagination组件属性对象，支持绝大部分参数，不支持配置的参数见<a href="#prop-keys">prop-keys</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">pagination-events</td>
<td style="text-align:left">object</td>
<td style="text-align:left">Pagination组件上绑定的监听事件对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">loading-props</td>
<td style="text-align:left">string / object</td>
<td style="text-align:left">Loading组件属性对象</td>
<td style="text-align:left">见<a href="./loading">Loading</a></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">refresh</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否重新发送请求，必须用.sync修饰符，值为true时重新发送请求，然后设置值为false。也可以用方法重新发起请求</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">fetch-access-key</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">传入的请求时序控制值，只能为基础类型的值，组件内会默认使用当前时间戳，如果因为并发原因时间戳无法满足可手动传入值</td>
<td style="text-align:left">--</td>
<td style="text-align:left">Date.now()</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">以下属性为可选的高级功能，使用时可能需要多理解</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">need-store</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否需要在每次请求时在SessionStorage中保存分页数据和请求的params</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">restore</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否需要恢复之前保存的值，适用于页面跳转后返回时恢复页面数据</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">store-key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">组件保存数据时使用的命名空间，不设置则数据保存时会覆盖之前的值。建议使用当前路由name + 页面内组件用途的关键字</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'data'</td>
</tr>
</tbody>
</table>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>组件初始化时如果设置`restore`为true且之前有存储的数据，那么组件创建后会用之前存储的数据作为参数传递给请求回调函数。</p>
<p>在请求回调函数执行之前组件不会响应`extra-form`属性的变化，并且分页组件也不会显示。</p>
<p>如果希望在异步回调函数有结果返回之前都不响应变化（比如希望手动恢复`extra-form`的展示值），可以在回调函数里返回一个Promise对象</p>
</div>
<h3 id="prop-keys" tabindex="-1"><a class="header-anchor" href="#prop-keys" aria-hidden="true">#</a> prop-keys</h3>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>配置参数是<code v-pre>prop-keys</code>对象的键名，会合并到默认值对象。不能使用短横线写法</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">total</td>
<td style="text-align:left">string</td>
<td style="text-align:left">数据源中总数对于字段</td>
<td style="text-align:left">'total'</td>
</tr>
<tr>
<td style="text-align:left">rows</td>
<td style="text-align:left">string</td>
<td style="text-align:left">数据源中数据数组对于字段</td>
<td style="text-align:left">'rows'</td>
</tr>
<tr>
<td style="text-align:left">pageSize</td>
<td style="text-align:left">string</td>
<td style="text-align:left">params中每页记录条数字段，不影响<code v-pre>init-data</code>中字段，下同</td>
<td style="text-align:left">'size'</td>
</tr>
<tr>
<td style="text-align:left">curPage</td>
<td style="text-align:left">string</td>
<td style="text-align:left">params中当前页码字段</td>
<td style="text-align:left">'page'</td>
</tr>
</tbody>
</table>
<h3 id="limited-pagination-attributes" tabindex="-1"><a class="header-anchor" href="#limited-pagination-attributes" aria-hidden="true">#</a> limited Pagination Attributes</h3>
<p>下列Pagination组件的参数因为封装组件内维护了，故无法通过<code v-pre>pagination-props</code>来配置。</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">page-size</td>
<td style="text-align:left">每页条数</td>
</tr>
<tr>
<td style="text-align:left">current-page</td>
<td style="text-align:left">当前页码，如需手动修改请使用组件提供的方法</td>
</tr>
<tr>
<td style="text-align:left">total</td>
<td style="text-align:left">总记录条数</td>
</tr>
<tr>
<td style="text-align:left">curPage</td>
<td style="text-align:left">params中当前页码字段</td>
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
<td style="text-align:left">extra-form-change</td>
<td style="text-align:left"><code v-pre>extra-form</code>发生变化时触发</td>
<td style="text-align:left">(newVal: any, oldValJson: string)</td>
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
<td style="text-align:left">getStoreData</td>
<td style="text-align:left">获取组件内存储的数据，结构为 <code v-pre>{ pagination: {...}, params: {...} }</code></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">sendRequest</td>
<td style="text-align:left">用当前params参数发送请求，用于重新发送请求。和<code v-pre>refresh</code>功能一致</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">clearStoreData</td>
<td style="text-align:left">清除组件内存储的数据</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
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
<td style="text-align:left">--</td>
<td style="text-align:left">默认插槽，内容会放置于表单项后，<code v-pre>Form</code>组件中。</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">button</td>
<td style="text-align:left">自定义按钮，传入用于触发数据改变的函数。</td>
<td style="text-align:left">{ onSearch: Function() }</td>
</tr>
</tbody>
</table>
<h3 id="time-control" tabindex="-1"><a class="header-anchor" href="#time-control" aria-hidden="true">#</a> Time Control</h3>
<div class="custom-container tip"><p class="custom-container-title">时序请求</p>
<p>在很多需要短时高频ajax请求，由不能对请求做等待限制的场景下，例如匹配搜索。
因为接口是异步的，并且每次请求的返回顺序是不确定的。会导致先请求的数据后返回的情况，这种场合下一般需要抛弃之前请求的回调处理逻辑，仅处理最后一次发送请求的回调。</p>
<p>常见做法是定义一个变量，用来保存每次请求时的时间戳，而每次请求时会当时的时间戳传入接口请求函数，在接口回调里判断传入的时间戳和保存的值是否一致，不一致则放弃后续处理逻辑。</p>
<p>原理是变量值在每次发起请求时都会更新，而传入函数的时间戳会定格在请求发起时，只有最后一次请求函数内传入的时间戳会和保存的值一致。</p>
</div>
</div></template>
