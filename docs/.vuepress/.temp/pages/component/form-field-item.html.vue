<template><div><h2 id="formfielditem-表单项" tabindex="-1"><a class="header-anchor" href="#formfielditem-表单项" aria-hidden="true">#</a> FormFieldItem 表单项</h2>
<p>基于<code v-pre>FormItem</code>组件和<code v-pre>CommonField</code>组件封装的表单项组件。用于通过数据生成带验证功能的表单项。</p>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>因为使用了<code v-pre>FormItem</code>组件，所以组件必须放置于<code v-pre>Form</code>组件内部。</p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><div slot="description"><p>field对象的<code>isNumber</code>表现类似于v-model.number修饰符。一般对必填项且有类型判断规则有很好的类型转换作用。其他场景需要自己对数据进行处理。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-field-item/Base.vue</p>
</comp-demo><h3 id="纯文本展示" tabindex="-1"><a class="header-anchor" href="#纯文本展示" aria-hidden="true">#</a> 纯文本展示</h3>
<p>通过设置<code v-pre>text</code>参数为boolean，function，(string/number)类型可以让表单域展示/隐藏，显示函数返回内容，显示给定内容。</p>
<comp-demo name="show-text"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-field-item/show-text.vue</p>
</comp-demo><h3 id="多表单域组件" tabindex="-1"><a class="header-anchor" href="#多表单域组件" aria-hidden="true">#</a> 多表单域组件</h3>
<p>设置<code v-pre>children</code>参数为包含多个子表单项对象的数组时，可以构建出适用于特定场景的表单项。</p>
<div class="custom-container warning"><p class="custom-container-title">注意！</p>
<p>此结构仅允许一层。设置子表单项对象的<code v-pre>children</code>无效。此类场景建议自定义表单域组件然后传入本组件。</p>
</div>
<comp-demo name="mult-fields"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-field-item/mult-fields.vue</p>
</comp-demo><h3 id="使用formitem组件插槽" tabindex="-1"><a class="header-anchor" href="#使用formitem组件插槽" aria-hidden="true">#</a> 使用FormItem组件插槽</h3>
<p>组件支持设置<code v-pre>FormItem</code>组件的具名插槽和作用域插槽。具名插槽中的<code v-pre>default</code>不会覆盖表单域内容，而是作为额外内容放置于表单域区域。</p>
<comp-demo name="all-slots"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-field-item/all-slots.vue</p>
</comp-demo><h3 id="调用formitem组件上的方法" tabindex="-1"><a class="header-anchor" href="#调用formitem组件上的方法" aria-hidden="true">#</a> 调用FormItem组件上的方法</h3>
<p>组件代理了根层级的<code v-pre>FormItem</code>组件上的方法，对于子层级的<code v-pre>FormItem</code>组件，请使用<code v-pre>$refs</code>获取后调用</p>
<comp-demo name="call-method"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-field-item/call-method.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>FormItem组件文档参照 <element-link component="FormItem"></element-link></p>
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
<td style="text-align:left">any</td>
<td style="text-align:left">绑定值，如果fields是数组时，绑定值需要是一个对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">props</td>
<td style="text-align:left">object/function</td>
<td style="text-align:left">根层<code v-pre>FormItem</code>组件绑定props参数对象，或者返回参数对象的函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">prop</td>
<td style="text-align:left">string</td>
<td style="text-align:left">根层<code v-pre>FormItem</code>组件绑定prop参数。仅需当前层级prop字符串。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">prev-prop</td>
<td style="text-align:left">(string/number)[]</td>
<td style="text-align:left">当前组件绑定<code v-pre>prop</code>参数的前置部分，数组格式。会拼接上<code v-pre>prop</code>后生成完整prop属性传递给根层<code v-pre>FormItem</code>。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">text</td>
<td style="text-align:left">boolean /<br/>string / <br/>Function(prop, value)</td>
<td style="text-align:left">表单域内是否显示文本，或者设置显示的文本内容。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">field</td>
<td style="text-align:left">object</td>
<td style="text-align:left">表单域组件配置对象，传递给<code v-pre>CommonField</code>组件的<code v-pre>field</code>字段，具体见<a href="./common-field#field">CommonField#field</a></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">children</td>
<td style="text-align:left">object []</td>
<td style="text-align:left">子表单项数组，<strong>和<code v-pre>field</code>字段互斥</strong>，优先级高于<code v-pre>field</code>。用于在表单域区域生成子表单项。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ prop</td>
<td style="text-align:left">同上</td>
<td style="text-align:left">作用同上一级prop。子表单项无需设置<code v-pre>prev-prop</code>字段，会使用上一级的自动拼接。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ props</td>
<td style="text-align:left">同上</td>
<td style="text-align:left">作用同上一级<code v-pre>props</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ text</td>
<td style="text-align:left">同上</td>
<td style="text-align:left">作用同上一级<code v-pre>text</code></td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ field</td>
<td style="text-align:left">同上</td>
<td style="text-align:left">作用同上一级<code v-pre>field</code>。有扩展字段</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└└ colProps</td>
<td style="text-align:left">object</td>
<td style="text-align:left">默认情况下子表单项会平分24栅格。可以通过此字段自定义每项所占栅格数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">slots</td>
<td style="text-align:left">object</td>
<td style="text-align:left">具名插槽配置对象，具体结构见</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">scopedSlots</td>
<td style="text-align:left">object</td>
<td style="text-align:left">作用域插槽配置对象，具体结构见</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了根层级的<code v-pre>FormItem</code>组件上的方法， 具体见FormItem文档。</p>
</div></template>
