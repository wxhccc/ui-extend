<template><div><h2 id="commonfield-通用表单域组件" tabindex="-1"><a class="header-anchor" href="#commonfield-通用表单域组件" aria-hidden="true">#</a> CommonField 通用表单域组件</h2>
<p>组件的目的是用标准格式的数据来生成表单域，最终来实现更高阶的表单组件。</p>
<p>组件支持所有实现了v-model/value+input的组件，所以可以用于生成自定义表单域。对于引用类型的value值（例如Array, Object）,组件会进行深拷贝传入表单域组件，故使用组件时请严格遵循单向数据流方式修改数据。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<p>组件对<code v-pre>ElRadioGroup</code>, <code v-pre>ElCheckboxGroup</code>组件内的子组件的参数进行了修正，使其<strong>value</strong>，<strong>label</strong>的表现与<code v-pre>Select</code>一致。</p>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/Base.vue</p>
</comp-demo><h3 id="绑定值转number类型" tabindex="-1"><a class="header-anchor" href="#绑定值转number类型" aria-hidden="true">#</a> 绑定值转Number类型</h3>
<p>通过设置<code v-pre>field.isNumber</code>为true可以修改绑定值为数字，表现类似于<code v-pre>.number</code>修饰符，对于无法转换的内容会返回原内容。</p>
<comp-demo name="number-value"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/number-value.vue</p>
</comp-demo><h3 id="使用组件或渲染函数来渲染数据项组件内容" tabindex="-1"><a class="header-anchor" href="#使用组件或渲染函数来渲染数据项组件内容" aria-hidden="true">#</a> 使用组件或渲染函数来渲染数据项组件内容</h3>
<p>示例用组件渲染了<code v-pre>Options</code>组件插槽内容，用渲染函数自定义了<code v-pre>Radio</code>组件插槽内容。</p>
<p>ps: codepen可能不支持这部分的代码。</p>
<comp-demo name="custom-child"><div slot="description"><p>通过设置<code>field</code>对象的<code>dataItemContent</code>值为组件对象或VNode渲染函数来定制数据项组件的默认插槽内容</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/custom-child.vue</p>
</comp-demo><h3 id="自定义表单域组件数据项组件内容内容" tabindex="-1"><a class="header-anchor" href="#自定义表单域组件数据项组件内容内容" aria-hidden="true">#</a> 自定义表单域组件数据项组件内容内容</h3>
<p>示例用组件渲染了<code v-pre>Options</code>组件插槽内容，用渲染函数自定义了<code v-pre>Radio</code>组件插槽内容。</p>
<p>ps: codepen可能不支持这部分的代码。</p>
<comp-demo name="custom-child"><div slot="description"><p>通过设置<code>field</code>对象的<code>dataItemContent</code>值为组件对象或VNode渲染函数来定制数据项组件的默认插槽内容</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/custom-child.vue</p>
</comp-demo><h3 id="使用表单域组件具名插槽" tabindex="-1"><a class="header-anchor" href="#使用表单域组件具名插槽" aria-hidden="true">#</a> 使用表单域组件具名插槽</h3>
<p>示例使用渲染函数生成了<code v-pre>Input</code>组件的append插槽内容，用组件传入了<code v-pre>Select</code>组件的empty插槽内容。</p>
<comp-demo name="named-slot"><div slot="description"><p>设置<code>slots</code>值为组件对象或VNode渲染函数来定制数据项组件的默认插槽内容</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/named-slot.vue</p>
</comp-demo><div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>传递了<code v-pre>data</code>参数的表单域组件会使用默认插槽渲染子组件列表。你仍可以通过<code v-pre>slots</code>传入默认作用域插槽，但会有两部分内容。</p>
</div>
<h3 id="调用表单域组件示例上的方法" tabindex="-1"><a class="header-anchor" href="#调用表单域组件示例上的方法" aria-hidden="true">#</a> 调用表单域组件示例上的方法</h3>
<comp-demo name="call-method"><div slot="description"><p>示例方法必须在组件渲染完后调用</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/common-field/call-method.vue</p>
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
<td style="text-align:left">value/v-model</td>
<td style="text-align:left">any</td>
<td style="text-align:left">绑定值</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">field</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表单域配置对象。具体字段见<a href="#field">field</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">lib-prefix</td>
<td style="text-align:left">string</td>
<td style="text-align:left">ui库组件前缀，例如'element-ui'前缀为'El'. 使用字符串生成带子组件的表单域组件时会用到。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'El'</td>
</tr>
</tbody>
</table>
<h3 id="field" tabindex="-1"><a class="header-anchor" href="#field" aria-hidden="true">#</a> field</h3>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>配置参数是<code v-pre>field</code>对象的键名, 不能使用短横线写法.</p>
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
<td style="text-align:left">component</td>
<td style="text-align:left">string(ComponentName)<br/>/Component</td>
<td style="text-align:left">表单域组件对象，或者字符串名称（需提前注册）。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">props</td>
<td style="text-align:left">object/function</td>
<td style="text-align:left">表单域组件绑定props参数对象，或者返回参数对象的函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">events</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表单域组件绑定事件对象。和合并覆盖通过模版写法传入组件的事件对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">表单域组件子组件数据列表。适用于<code v-pre>Select</code>等组件。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ value</td>
<td style="text-align:left">string / number</td>
<td style="text-align:left">子组件绑定数据。<code v-pre>CheckboxGroup</code>,<code v-pre>RadioGroup</code>组件中的子组件会修正label为value值。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ label</td>
<td style="text-align:left">string / number</td>
<td style="text-align:left">子组件展示文字。<code v-pre>CheckboxGroup</code>,<code v-pre>RadioGroup</code>组件中的子组件会用来填充到插槽中。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ ...</td>
<td style="text-align:left">...</td>
<td style="text-align:left">其余属性会作为props绑定到子组件上</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">isNumber</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否将绑定值转换为数字（如果可以）</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">initValue</td>
<td style="text-align:left">any</td>
<td style="text-align:left">组件绑定值初始值</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">forbidValueFixed</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否禁用对(<code v-pre>ElCheckboxGroup</code>/<code v-pre>ElRadioGroup</code>)子组件的value修正。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">childComponent</td>
<td style="text-align:left">Component</td>
<td style="text-align:left">表单域组件子组件，用于生成<code v-pre>data</code>数据列表。<br/>如果<code v-pre>component</code>使用了(<code v-pre>ElCheckboxGroup</code>/<code v-pre>ElRadioGroup</code>), 此参数可以缺省。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">dataItemContent</td>
<td style="text-align:left">Component<br/>/() =&gt; VNode</td>
<td style="text-align:left">表单域组件子组件默认插槽内容，可以使用组件或VNode渲染函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">slots</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表单域组件的具名插槽配置对象。对象key为插槽名称，值为配置对象，例如<code v-pre>{ header: {...} }</code>。如果直接写配置对象会当作默认插处理。插槽配置对象说明见<a href="#slot-object">slot</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">scopedSlots</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表单域组件的作用域域插槽配置对象。对象key为插槽名称，值为返回VNode的函数，具体见<a href="https://github.com/vuejs/jsx" target="_blank" rel="noopener noreferrer">vue-jsx<ExternalLinkIcon/></a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="slot-object" tabindex="-1"><a class="header-anchor" href="#slot-object" aria-hidden="true">#</a> slot object</h3>
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
<td style="text-align:left">component</td>
<td style="text-align:left">Component<br/>/(h, vdo, slotName) =&gt; VNode</td>
<td style="text-align:left">插槽内容，可以使用组件或VNode渲染函数。函数会传入h($createElement别名)，Vue Data Object，插槽名称。组件则会绑定VDO对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">props</td>
<td style="text-align:left">object</td>
<td style="text-align:left">插槽组件绑定props参数对象，会合并到VDO对象中。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">events</td>
<td style="text-align:left">object</td>
<td style="text-align:left">插槽组件绑定事件对象。会合并到VDO对象中。</td>
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
<td style="text-align:left">callFieldMethod</td>
<td style="text-align:left">调用原表单域实例上的方法，可传递参数</td>
<td style="text-align:left">(fnName:String, ...args[])</td>
</tr>
</tbody>
</table>
</div></template>
