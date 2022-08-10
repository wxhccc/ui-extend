<template><div><h2 id="actionbtns-操作按钮组" tabindex="-1"><a class="header-anchor" href="#actionbtns-操作按钮组" aria-hidden="true">#</a> ActionBtns 操作按钮组</h2>
<p>用数据生成一组操作按钮。</p>
<div class="custom-container warning"><p class="custom-container-title">友情提示</p>
<p>此组件是为table中的操作列设计的数据生成的按钮，目的是在特定场景下排除模版的限制。组件并非完全通用的设计，如果与你的需求相去甚远，请考虑使用基础组件。</p>
</div>
<h3 id="完整用法" tabindex="-1"><a class="header-anchor" href="#完整用法" aria-hidden="true">#</a> 完整用法</h3>
<p>此示例包含各种情况下的按钮处理。</p>
<comp-demo name="All"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-switch</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hasRight<span class="token punctuation">"</span></span> <span class="token attr-name">active-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>不隐藏<span class="token punctuation">"</span></span> <span class="token attr-name">inactive-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>隐藏按钮<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-switch</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-input</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data.isEdit<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data.value<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-input</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-action-btns</span> <span class="token attr-name">:data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span> <span class="token attr-name">:btns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btns<span class="token punctuation">"</span></span> <span class="token attr-name">:loading-flags</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-action-btns</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> hasRight <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">isEdit</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">''</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> btns <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token string">'small'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'view'</span><span class="token punctuation">,</span>
          <span class="token function-variable function">click</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> btn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> btn<span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">btype</span><span class="token operator">:</span> <span class="token string">'primary'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">loadingKey</span><span class="token operator">:</span> <span class="token string">'infoSend'</span><span class="token punctuation">,</span>
          <span class="token function-variable function">text</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token operator">!</span>data<span class="token punctuation">.</span>isEdit <span class="token operator">?</span> <span class="token string">'edit'</span> <span class="token operator">:</span> <span class="token string">'save'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token literal-property property">loadingText</span><span class="token operator">:</span> <span class="token string">'saveing...'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">click</span><span class="token operator">:</span> editHandle
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token string">'small'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token literal-property property">btype</span><span class="token operator">:</span> <span class="token string">'danger'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span>
          <span class="token function-variable function">hide</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token operator">!</span>hasRight<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token literal-property property">isConfirm</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token function-variable function">confirmMsg</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token string">'删除后无法恢复，确定要删除'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token function">click</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// todo</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token function-variable function">editHandle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> btn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      <span class="token comment">// 切换到编辑模式</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>data<span class="token punctuation">.</span>isEdit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data<span class="token punctuation">.</span>isEdit <span class="token operator">=</span> <span class="token operator">!</span>data<span class="token punctuation">.</span>isEdit
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 模拟接口提交</span>
        data<span class="token punctuation">.</span>infoSend <span class="token operator">=</span> <span class="token boolean">true</span>
        window<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// send</span>
          data<span class="token punctuation">.</span>infoSend <span class="token operator">=</span> <span class="token boolean">false</span>
          data<span class="token punctuation">.</span>isEdit <span class="token operator">=</span> <span class="token operator">!</span>data<span class="token punctuation">.</span>isEdit
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> hasRight<span class="token punctuation">,</span> data<span class="token punctuation">,</span> btns <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Button组件文档参照 <ui-lib-link component="Button"></ui-lib-link></p>
</div>
<h3 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h3>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p><code v-pre>btns</code>属性为对象数组，对象内的属性并非组件属性，故键名必须和文档一致。</p>
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
<td style="text-align:left">data</td>
<td style="text-align:left">any</td>
<td style="text-align:left">按钮点击事件触以及其他所有支持函数的属性在调用时传递的数据信息。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">extra-args</td>
<td style="text-align:left">any[]</td>
<td style="text-align:left">其他需要附带传递的数据。任意类型值组成的数组，会用展开运算符按序传递给对应的函数。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">btns</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">按钮数据对象数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ props</td>
<td style="text-align:left">object / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">当前按钮上绑定的属性，可以为对象或函数，函数参数为传入数据和当前按钮对象（参数下同）</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ hide</td>
<td style="text-align:left">boolean / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">当前按钮是否隐藏（完全隐藏，按钮不会存在），适合权限控制</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ btype</td>
<td style="text-align:left">string / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">当前按钮的type属性。也可通过<code v-pre>props</code>属性控制。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ text</td>
<td style="text-align:left">string / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">当前按钮的提示文字。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ loadingText</td>
<td style="text-align:left">string / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">当前按钮在loading状态时的提示文字。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">当前按钮的唯一标示。在函数的btn参数中可用于确定按钮。也用在按钮的key属性上（缺省时会使用按钮索引值）</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ loadingKey</td>
<td style="text-align:left">string</td>
<td style="text-align:left">当前按钮的loading状态标识值在<code v-pre>loading-flags</code>对象中的键名</td>
<td style="text-align:left">--</td>
<td style="text-align:left"><code v-pre>__btn${index}loading</code></td>
</tr>
<tr>
<td style="text-align:left">└ click</td>
<td style="text-align:left">Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">按钮的点击事件函数</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ isConfirm</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">按钮点击后是否需要确认操作再执行<code v-pre>click</code>事件</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">└ confirmMsg</td>
<td style="text-align:left">string / Function(data, btn, ...extraArgs)</td>
<td style="text-align:left">确认消息框的提示文案</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'确定执行此操作?'</td>
</tr>
<tr>
<td style="text-align:left">loading-flags</td>
<td style="text-align:left">object</td>
<td style="text-align:left">按钮loading标识值对象，如果<code v-pre>data</code>数据为对象且允许修改时可设置为data</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
</div></template>
