<template><div><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<p>Optionals主要是提供了<strong>可选</strong>的便捷函数，可以更方便得使用本组件库。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createOption <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="方法列表" tabindex="-1"><a class="header-anchor" href="#方法列表" aria-hidden="true">#</a> 方法列表</h2>
<h3 id="createoption" tabindex="-1"><a class="header-anchor" href="#createoption" aria-hidden="true">#</a> createOption</h3>
<p>创建标准格式的option数据对象，通常用来生成下拉选项里的“全部”选项</p>
<p><strong>语法</strong>: <code v-pre>createOption(value[, label])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>value</code> {String/Number} 返回对象的value值，默认为: 0</li>
<li><code v-pre>label</code> {String} 返回对象的label值，默认为: '全部'</li>
</ul>
<p><strong>返回值</strong>: object</p>
<p><strong>示例</strong>:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createOption <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/optionals'</span>

<span class="token function">createOption</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span>
<span class="token comment">// log { value: '', label: '全部' }</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dateformatter" tabindex="-1"><a class="header-anchor" href="#dateformatter" aria-hidden="true">#</a> <code v-pre>dateFormatter</code></h3>
<p>返回表格列配置中formatter对应的格式化函数，用来格式化时间。</p>
<p>时间格式化使用的是Utils里的<code v-pre>dateFormat</code></p>
<p><strong>语法</strong>: <code v-pre>dateFormatter(format)</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>format</code> {String} 格式化字符串，默认值为：'YYYY-MM-DD HH:mm:ss'</li>
</ul>
<p><strong>返回值</strong>: function</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> dateFormatter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/optionals'</span>

<span class="token keyword">const</span> columns <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'日期'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prop</span><span class="token operator">:</span> <span class="token string">'time'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">formatter</span><span class="token operator">:</span> <span class="token function">dateFormatter</span><span class="token punctuation">(</span><span class="token string">'date'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="createformfielditem" tabindex="-1"><a class="header-anchor" href="#createformfielditem" aria-hidden="true">#</a> <code v-pre>createFormFieldItem</code></h3>
<p>生成<code v-pre>FormFieldItem</code>使用的配置数据对象</p>
<p><strong>语法</strong>: <code v-pre>createFormFieldItem(component, labelOrProps, prop[, fieldExtra, extraProps])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>component</code> {Component/ComponentString} 配置数据中field对象中的component属性，可以用组件字符串或传入组件对象。</li>
<li><code v-pre>labelOrProps</code> {String/Object} 表单项的label字符串，或者props参数对象</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>fieldExtra</code> {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性</li>
<li><code v-pre>extraProps</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createFormFieldItem <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/optionals'</span>

<span class="token function">createFormFieldItem</span><span class="token punctuation">(</span><span class="token string">'ElInput'</span><span class="token punctuation">,</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/** log 
<span class="token punctuation">{</span>
  props: <span class="token punctuation">{</span> label: '姓名' <span class="token punctuation">}</span>,
  prop: 'name',
  field: <span class="token punctuation">{</span>
    component: 'ElInput'
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
**/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="createffirulesprops" tabindex="-1"><a class="header-anchor" href="#createffirulesprops" aria-hidden="true">#</a> <code v-pre>createFfiRulesProps</code></h3>
<p>生成<code v-pre>FormFieldItem</code>组件的props属性对象</p>
<p><strong>语法</strong>: <code v-pre>createFfiRulesProps(label, required[, rules, others])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>label</code> {String} 表单项label内容。</li>
<li><code v-pre>required</code> {Boolean/String} 是否必填，或者设定未填时的提示文案</li>
<li><code v-pre>rules</code> {String} 表单项额外的rules数组</li>
<li><code v-pre>others</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createFfiRulesProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/optionals'</span>

<span class="token function">createFfiRulesProps</span><span class="token punctuation">(</span><span class="token string">'姓名'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/** log 
<span class="token punctuation">{</span>
  label: '姓名',
  rules: [
    <span class="token punctuation">{</span> required: true, message: '请输入姓名', trigger: 'blur'<span class="token punctuation">}</span>
  ]
<span class="token punctuation">}</span>
**/</span>
<span class="token function">createFfiRulesProps</span><span class="token punctuation">(</span><span class="token string">'年龄'</span><span class="token punctuation">,</span> <span class="token string">'请选择年龄'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">min</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'抱歉你的年龄小于10岁'</span><span class="token punctuation">,</span> <span class="token literal-property property">trigger</span><span class="token operator">:</span> <span class="token string">'change'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token string">'small'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/** log 
<span class="token punctuation">{</span>
  label: '姓名',
  rules: [
    <span class="token punctuation">{</span> required: true, message: '请选择年龄', trigger: 'blur'<span class="token punctuation">}</span>,
    <span class="token punctuation">{</span> type: number, min: 10, message: '抱歉你的年龄小于10岁', trigger: 'change' <span class="token punctuation">}</span>
  ],
  size: 'small'
<span class="token punctuation">}</span>
**/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="createinputformitem" tabindex="-1"><a class="header-anchor" href="#createinputformitem" aria-hidden="true">#</a> <code v-pre>createInputFormItem</code></h3>
<p>基于<a href="#createformfielditem">createFormFieldItem</a>函数定制，用于创建输入框表单项配置数据。</p>
<p><strong>语法</strong>: <code v-pre>createInputFormItem(labelOrProps, prop, phOrFieldProps, [, extraProps, textOrslots])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>labelOrProps</code> {String/Object} 表单项的label字符串，或者props参数对象</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>phOrFieldProps</code> {String/Object} filed对象的props参数对象，或者filed.props对象placeholder参数</li>
<li><code v-pre>extraProps</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
<li><code v-pre>textOrslots</code> {String/Object} 输入框append插槽内的文字，或者传入插槽对象（<a href="/component/common-field#field" target="_blank" rel="noopener noreferrer">详见field.slots<ExternalLinkIcon/></a>）</li>
</ul>
<p><strong>返回值</strong>: object</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createInputFormItem <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/optionals'</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">createFfiRulesProps</span><span class="token punctuation">(</span><span class="token string">'金额'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

<span class="token function">createInputFormItem</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> <span class="token string">'money'</span><span class="token punctuation">,</span> <span class="token string">'请输入金额'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">prevProp</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'people'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'元'</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/** log 
<span class="token punctuation">{</span>
  props: <span class="token punctuation">{</span>
    label: '金额',
    rules: [
      <span class="token punctuation">{</span> required: true, message: '请输入金额', trigger: 'blur'<span class="token punctuation">}</span>
    ]
  <span class="token punctuation">}</span>,
  prop: 'money',
  field: <span class="token punctuation">{</span>
    component: 'ElInput',
    props: <span class="token punctuation">{</span> placeholder: '请输入金额' <span class="token punctuation">}</span>,
    slots: <span class="token punctuation">{</span> 'append': <span class="token punctuation">{</span> component: 'div', text: '元' <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  prevProp: ['people']
<span class="token punctuation">}</span>
**/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="createradiosformitem" tabindex="-1"><a class="header-anchor" href="#createradiosformitem" aria-hidden="true">#</a> <code v-pre>createRadiosFormItem</code></h3>
<p>基于<a href="#createformfielditem">createFormFieldItem</a>函数定制，用于创建Radio表单项配置数据。</p>
<p><strong>语法</strong>: <code v-pre>createRadiosFormItem(labelOrProps, prop, data[, fieldExtra, extraProps])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>labelOrProps</code> {String/Object} 表单项的label字符串，或者props参数对象</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>data</code> {Array} filed对象的data参数对象数组</li>
<li><code v-pre>fieldExtra</code> {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性</li>
<li><code v-pre>extraProps</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
<h3 id="createselectformitem" tabindex="-1"><a class="header-anchor" href="#createselectformitem" aria-hidden="true">#</a> <code v-pre>createSelectFormItem</code></h3>
<p>基于<a href="#createformfielditem">createFormFieldItem</a>函数定制，用于创建Select表单项配置数据。</p>
<p><strong>语法</strong>: <code v-pre>createSelectFormItem(labelOrProps, prop, data[allDef, phOrFieldProps, fieldExtra, extraProps])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>labelOrProps</code> {String/Object} 表单项的label字符串，或者props参数对象</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>data</code> {Array} filed对象的data参数对象数组</li>
<li><code v-pre>allDef</code> {Boolean/String/Number} 是否在data前添加“全部”选项，或者设置全部选项的value值</li>
<li><code v-pre>phOrFieldProps</code> {String/Object} filed对象的props参数对象，或者filed.props对象placeholder参数</li>
<li><code v-pre>fieldExtra</code> {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性</li>
<li><code v-pre>extraProps</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
<h3 id="createdateformitem" tabindex="-1"><a class="header-anchor" href="#createdateformitem" aria-hidden="true">#</a> <code v-pre>createDateFormItem</code></h3>
<p>基于<a href="#createformfielditem">createFormFieldItem</a>函数定制，用于创建日期选择器表单项配置数据。</p>
<p><strong>语法</strong>: <code v-pre>createDateFormItem(labelOrProps, prop, [typeOrFieldProps, fieldExtra, extraProps])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>labelOrProps</code> {String/Object} 表单项的label字符串，或者props参数对象</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>typeOrFieldProps</code> {String/Object} 时间选择器的类型，可选值有'date'、'daterange'，也可以传入完整对象</li>
<li><code v-pre>fieldExtra</code> {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性</li>
<li><code v-pre>extraProps</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
<div class="custom-container tip"><p class="custom-container-title">type值说明</p>
<p>date：默认时间选择组件，设定绑定值为数字时间戳
daterange：日期范围选择，设定绑定值格式为日期字符串数组</p>
</div>
<h3 id="createtablecolumn" tabindex="-1"><a class="header-anchor" href="#createtablecolumn" aria-hidden="true">#</a> <code v-pre>createTableColumn</code></h3>
<p>用于创建简单表格列配置数据对象。</p>
<p><strong>语法</strong>: <code v-pre>createTableColumn(label, prop[, others])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>label</code> {String} 列配置对象label属性</li>
<li><code v-pre>prop</code> {String} 配置对象的prop属性</li>
<li><code v-pre>others</code> {Object} 配置对象中的其他属性，可覆盖已配置属性</li>
</ul>
<p><strong>返回值</strong>: object</p>
</div></template>
