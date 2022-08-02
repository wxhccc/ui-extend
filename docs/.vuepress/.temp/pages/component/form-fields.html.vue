<template><div><h2 id="formfields-表单项组" tabindex="-1"><a class="header-anchor" href="#formfields-表单项组" aria-hidden="true">#</a> FormFields 表单项组</h2>
<p>使用<a href="./form-field-item">FormFieldItem</a>组件或者自定义组件来生成一组表单项，(多个)表单项组可以放置于<code v-pre>Form</code>组件中来渲染出完整表单。此外带data数据的表单项组件之间还可以设置联动。</p>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>因为使用了<code v-pre>FormItem</code>组件，所以组件必须放置于<code v-pre>Form</code>组件内部。</p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>本例表单项组包含常见表单域，比如输入框，选择器，开关，单选，多选，时间选择器。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-fields/Base.vue</p>
</comp-demo><h3 id="表单项之间级联" tabindex="-1"><a class="header-anchor" href="#表单项之间级联" aria-hidden="true">#</a> 表单项之间级联</h3>
<p>级联适用于能使用data生成子选项的表单项，例如<code v-pre>Select</code>,<code v-pre>CheckboxGroup</code>,<code v-pre>RadioGroup</code>组件或其他自定义组件。
级联可以一对一，也可以多对一。</p>
<comp-demo name="cascade-items"><div slot="description"><p>多个表单项的cascadeModel可以绑定到同一个表单项上。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-fields/cascade-items.vue</p>
</comp-demo><h3 id="使用自定义组件作为表单项" tabindex="-1"><a class="header-anchor" href="#使用自定义组件作为表单项" aria-hidden="true">#</a> 使用自定义组件作为表单项</h3>
<p>自定义组件可以和使用<code v-pre>FormFieldItem</code>组件的表单项混用。自定义组件需要实现v-model/value+input数据绑定模式，传入值为数据项的props对应的值。</p>
<comp-demo name="custom-item"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-fields/custom-item.vue</p>
</comp-demo><h3 id="调用表单项组件上的方法" tabindex="-1"><a class="header-anchor" href="#调用表单项组件上的方法" aria-hidden="true">#</a> 调用表单项组件上的方法</h3>
<comp-demo name="call-method"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-fields/call-method.vue</p>
</comp-demo><h3 id="自定义组件表单项使用级联逻辑" tabindex="-1"><a class="header-anchor" href="#自定义组件表单项使用级联逻辑" aria-hidden="true">#</a> 自定义组件表单项使用级联逻辑 <Badge text="高阶" type="warn"/></h3>
<p>自定义组件作为表单项时，只要实现了change事件即可作为级联触发源。但如果需要作为被触发项，则需要通过设置<code v-pre>cascadeHandler</code>来处理。</p>
<p>下面例子演示了自定义表单项如何即作为触发项，同时也作为被触发项。</p>
<comp-demo name="custom-item-cascade"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-fields/custom-item-cascade.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">级联工作原理说明</p>
<p>组件支持对使用<code>data</code>数据生成子组件的表单项通过设置关联属性和级联数据来实现级联逻辑。</p>
<p>组件项可以分为监听项和被监听(触发源)项，同一个组件既可以是监听项又是被监听项。 </p>
<p>被监听项值发生改变时会触发<code>change</code>事件，从而调用监听项绑定的事件。</p>
<p>对于使用<code>field</code>字段来生成表单域的表单项，组件默认的处理逻辑是被监听表单项发生改变时，所有监听项会根据绑定值获取到对于级联数组，并替换到<code>field.data</code>数组中。默认从0索引开始替换。对于需要保留项的，可以设置<code>spliceStart</code>来从其他索引值开始替换。</p>
<p>此外被监听表单项发生改变时，所有监听项还会重置绑定值，默认会设置为undefined，如果需要可以通过<code>clearValue</code>设置成其他值。</p>
<p>自定义组件可以通过设置<code>cascadeHandler</code>参数作为监听项，但如果需要作为被监听项，则自定义组件内部需要在绑定值发生改变时触发<code>change</code>事件。</p>
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
<td style="text-align:left">object</td>
<td style="text-align:left">表单项组绑定值，绑定值必须是一个对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">items</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">表单项配置数据对象数组，具体结构见<a href="#item">item</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">delay-update</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否在数据更新时使用延迟赋值。用于处理瞬时多字段赋值的特殊情况，例如浏览器自动填充账号密码。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="item" tabindex="-1"><a class="header-anchor" href="#item" aria-hidden="true">#</a> item</h3>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p><strong>item</strong>对象可以默认使用<code v-pre>FormFieldItem</code>组件渲染。对象内<code v-pre>FormFieldItem</code>组件支持的prop属性会自动绑定到组件上。
也可以通过<code v-pre>component</code>字段使用自定义表单项组件，使用自定义表单项组件时，只有部分字段会被传递给组件。</p>
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
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">以下为公共参数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">hide</td>
<td style="text-align:left">boolean/function</td>
<td style="text-align:left">表单项是否隐藏（不渲染）。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">props</td>
<td style="text-align:left">object/function</td>
<td style="text-align:left">表单项组绑定参数对象或返回对象的函数。会自己绑定到组件上。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">prop</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">表单项绑定值在<code v-pre>value</code>中对应的键名。使用<code v-pre>children</code>字段时可缺省，<code v-pre>children</code>数组对象中的<code v-pre>prop</code>属性会作为键名，具体见<code v-pre>FormFieldItem</code>组件。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">key</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">表单项组件的<code v-pre>key</code>，缺省时使用<code v-pre>prop</code>属性。如果<code v-pre>prop</code>缺省时会使用数组索引，为了性能<code v-pre>prop</code>缺省时请设置<code v-pre>key</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cascadeModel</td>
<td style="text-align:left">string/number</td>
<td style="text-align:left">当前表单项需要监听的表单项的<code v-pre>prop</code>属性。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cascadeData</td>
<td style="text-align:left">object</td>
<td style="text-align:left">指定结构的级联数据。具体结构说明见<a href="/wiki/data/#%E6%95%B0%E6%8D%AE%E7%BA%A7%E8%81%94" target="_blank" rel="noopener noreferrer">级联数据结构<ExternalLinkIcon/></a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cascadeHandler</td>
<td style="text-align:left">Function(changeValue, prop, modelData, item)</td>
<td style="text-align:left">自定义级联处理逻辑。参数分别为被监听项改变后的值，当前表单项的prop，匹配到的级联数据数组，当前表单项原始数据对象。<strong>函数会绑定组件上下文允许</strong>。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">spliceStart</td>
<td style="text-align:left">number</td>
<td style="text-align:left"><code v-pre>field.data</code>字段在更新时，开始替换的索引值</td>
<td style="text-align:left">--</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">clearValue</td>
<td style="text-align:left">object</td>
<td style="text-align:left">被监听项发生变化时，监听项绑定值会被重置的值。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">undefined</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">使用<code v-pre>FormFieldItem</code>组件渲染支持组件所有props参数，具体见文档。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
<td style="text-align:left">使用自定义组件时支持的参数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">component</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left">自定义组件对象或组件名字符串。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">fieldEvents</td>
<td style="text-align:left">object</td>
<td style="text-align:left">自定义组件内表单域绑定的事件监听对象，会合并上级联的<code v-pre>change</code>的事件(如果有)后绑定到自定义组件上。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
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
<td style="text-align:left">callItemMethod</td>
<td style="text-align:left">调用表单项实例上的方法，可传递参数</td>
<td style="text-align:left">(prop:String,fnName:String, ...args[])</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>可以通过组件的实例上的$refs获取到各表单项的实例。注意获取到的是数组（因为循环的原因）。可以使用实例调用组件上的方法。</p>
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
<td style="text-align:left">--</td>
<td style="text-align:left">放置于表单项组后面的内容</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
