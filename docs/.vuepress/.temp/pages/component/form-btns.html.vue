<template><div><h2 id="formbtns-表单操作按钮" tabindex="-1"><a class="header-anchor" href="#formbtns-表单操作按钮" aria-hidden="true">#</a> FormBtns 表单操作按钮</h2>
<p>常见场景下的表单按钮的封装，包含<strong>提交</strong>、<strong>重置</strong>/<strong>取消</strong>按钮。内置表单验证和提交确认操作。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-btns/Base.vue</p>
</comp-demo><h3 id="有form组件的场景和修改按钮顺序" tabindex="-1"><a class="header-anchor" href="#有form组件的场景和修改按钮顺序" aria-hidden="true">#</a> 有Form组件的场景和修改按钮顺序</h3>
<comp-demo name="with-form"><div slot="description"><p>FromBtns组件可以放在ElFormItem组件内，也可以不放。放置在ElFormItem组件内会继承Form的部分属性，具体见文档</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-btns/with-form.vue</p>
</comp-demo><h3 id="提交前确认和定制文本内容" tabindex="-1"><a class="header-anchor" href="#提交前确认和定制文本内容" aria-hidden="true">#</a> 提交前确认和定制文本内容</h3>
<comp-demo name="confirm-custom"><div slot="description"><p>组件未放置在Form里，因此可以放在在页面的fixed容器中方便操作。</p>
</div><p>&lt;&lt;&lt; @/docs/.vuepress/demo/form-btns/confirm-custom.vue</p>
</comp-demo><div class="custom-container tip"><p class="custom-container-title">相关文档</p>
<p>Form组件文档参照 <element-link component="Form"></element-link></p>
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
<td style="text-align:left">sending</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">提交按钮是否loading中</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">parent-refs</td>
<td style="text-align:left">object</td>
<td style="text-align:left">包含Form组件ref值的$refs对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">ref-key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">需要进行校验的Form组件的ref名称</td>
<td style="text-align:left">--</td>
<td style="text-align:left">form</td>
</tr>
<tr>
<td style="text-align:left">is-cancel</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否显示取消按钮而不是重置按钮</td>
<td style="text-align:left">--</td>
<td style="text-align:left">false</td>
</tr>
<tr>
<td style="text-align:left">submit-only</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否仅显示提交按钮</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">submit</td>
<td style="text-align:left">function</td>
<td style="text-align:left">点击提交按钮后的处理方法，如果需要验证和确认则在通过后调用</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cancel</td>
<td style="text-align:left">function</td>
<td style="text-align:left">点击取消按钮后的处理方法</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">btn-keys</td>
<td style="text-align:left">string[]</td>
<td style="text-align:left">需要显示按钮的key数组，默认情况下组件会按照传入参数逻辑处理按钮显示，并且提交按钮在左。你可以通过这个属性设定要显示的按钮和顺序，设置后内部逻辑无效。</td>
<td style="text-align:left">submit/cancel/reset</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">is-validate</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否需要检验表单，需要校验时parent-refs和ref-key必须正确传入</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">submit-confirm</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">提交前是否需要用户确认操作，设置为<code v-pre>true</code>时会默认先进行表单验证</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">btn-props</td>
<td style="text-align:left">object / function(key)</td>
<td style="text-align:left">按钮绑定的属性对象，为object是对所有按钮生效，可以用函数来针对每个按钮绑定不同属性，函数参数是按钮的key。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">texts</td>
<td style="text-align:left">object</td>
<td style="text-align:left">组件内各按钮及状态提示文本对象</td>
<td style="text-align:left">见 <a href="#texts">文本详情</a></td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="texts" tabindex="-1"><a class="header-anchor" href="#texts" aria-hidden="true">#</a> texts</h3>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>列表里参数是texts对象的键名，会合并到默认值对象。不能使用短横线写法</p>
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
<td style="text-align:left">sureBtn</td>
<td style="text-align:left">string</td>
<td style="text-align:left">提交按钮文字</td>
<td style="text-align:left">'提交'</td>
</tr>
<tr>
<td style="text-align:left">cancelBtn</td>
<td style="text-align:left">string</td>
<td style="text-align:left">提交按钮是否loading中</td>
<td style="text-align:left">'取消'</td>
</tr>
<tr>
<td style="text-align:left">resetBtn</td>
<td style="text-align:left">string</td>
<td style="text-align:left">提交按钮是否loading中</td>
<td style="text-align:left">'重置'</td>
</tr>
<tr>
<td style="text-align:left">sending</td>
<td style="text-align:left">string</td>
<td style="text-align:left">提交按钮是否loading中</td>
<td style="text-align:left">'提交中...'</td>
</tr>
<tr>
<td style="text-align:left">confirmWord</td>
<td style="text-align:left">string</td>
<td style="text-align:left">提交按钮是否loading中</td>
<td style="text-align:left">'确认提交?'</td>
</tr>
</tbody>
</table>
</div></template>
