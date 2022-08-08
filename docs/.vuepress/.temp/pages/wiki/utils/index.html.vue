<template><div><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 引入cjs文件</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loadjs<span class="token punctuation">,</span> vwp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<h3 id="loadjs" tabindex="-1"><a class="header-anchor" href="#loadjs" aria-hidden="true">#</a> loadjs</h3>
<p>简单的动态js脚步引入函数，返回promise对象</p>
<p><strong>语法</strong>: <code v-pre>loadjs(url: string)</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>url</code> {string} 脚步地址。</li>
</ul>
<p><strong>返回值</strong>: promise</p>
<p><strong>示例</strong>:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> loadjs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

<span class="token function">loadjs</span><span class="token punctuation">(</span><span class="token string">'https://www.example.com/xxxxxxxx.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里的代码可以使用动态脚步的内容</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vwp" tabindex="-1"><a class="header-anchor" href="#vwp" aria-hidden="true">#</a> <code v-pre>vwp</code></h3>
<p><code v-pre>@wxhccc/es-util</code>库的<code v-pre>wp</code> 函数的vue封装，提供ref的支持</p>
<p><strong>语法</strong>: <code v-pre>vwp&lt;T&gt;(promise: Promise&lt;T&gt;, lock?: WpOptions['lock'] | Ref&lt;boolean&gt;)</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>promise</code> {Promise} promise对象</li>
<li><code v-pre>lock</code> { WpOptions['lock'] | Ref&lt;boolean&gt; } 格式化字符串，默认值为：<code v-pre>0,0</code></li>
</ul>
<p><strong>返回值</strong>:</p>
<p><strong>示例</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> vwp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

<span class="token keyword">const</span> loading <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token function-variable function">getApiData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 函数调用时会设置loading为true</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>err<span class="token punctuation">,</span> data<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">vwm</span><span class="token generic class-name"><span class="token operator">&lt;</span>Data<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://xxxxxx.xx.xx'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loading<span class="token punctuation">)</span>
  <span class="token comment">// promise结束后loading会为false</span>
  <span class="token comment">// 如果promise报错，err是错误对象，否则data是返回数据</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="resolvefunctional" tabindex="-1"><a class="header-anchor" href="#resolvefunctional" aria-hidden="true">#</a> <code v-pre>resolveFunctional</code></h3>
<p>解析可能是函数化返回的变量</p>
<p><strong>语法</strong>:
<code v-pre>resolveFunctional&lt;R&gt;(value: R | AnyFunction&lt;R&gt;, ...args: Parameters&lt;AnyFunction&lt;R&gt;&gt;): R</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>value</code> {any | AnyFunction&lt;any&gt;} 特定值，或者返回特定值的函数</li>
<li><code v-pre>...args</code> {any[]} 传递给函数的参数序列</li>
</ul>
<p><strong>返回值</strong>: any</p>
<p><strong>示例</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> resolveFunctional <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

<span class="token doc-comment comment">/** 组件的props对象类型 */</span>
<span class="token keyword">type</span> <span class="token class-name">InputProps</span> <span class="token operator">=</span> xxx

<span class="token doc-comment comment">/** 在另外一个组件里 */</span>
<span class="token keyword">interface</span> <span class="token class-name">CustomInputProps</span> <span class="token punctuation">{</span>
  inputProps<span class="token operator">:</span> InputProps <span class="token operator">|</span> <span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token string">'text'</span> <span class="token operator">|</span> <span class="token string">'password'</span><span class="token punctuation">)</span> <span class="token operator">=></span> InputProps
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/** 组建内部可以直接用来获取获取值 */</span>
<span class="token keyword">const</span> trueInputProps <span class="token operator">=</span> <span class="token function">resolveFunctional</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>inputProps<span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dateformat" tabindex="-1"><a class="header-anchor" href="#dateformat" aria-hidden="true">#</a> <code v-pre>dateFormat</code></h3>
<p>使用<code v-pre>dayjs</code>库(时间处理库)的格式化函数格式化时间</p>
<p><strong>语法</strong>: <code v-pre>dateFormat(date: string | number | Date | Dayjs, format: FormatShort | string = 'default'</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>date</code> {string | number | Date | Dayjs} 需要转换的时间，支持Date对象，字符串格式时间，10/13位时间戳，dayjs对象</li>
<li><code v-pre>format</code> {string} 输出时间的格式。默认值为：'YYYY-MM-DD HH:mm:ss'，支持具体格式字符串或者格式别名。default: 'YYYY-MM-DD HH:mm:ss'，date: 'YYYY-MM-DD'</li>
</ul>
<p><strong>返回值</strong>: string</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> dateFormat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 11:12:13'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token string">'2019/08/29'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 00:00:00'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token number">1567042733116</span><span class="token punctuation">,</span> <span class="token string">'date'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token number">1567042733</span><span class="token punctuation">,</span> <span class="token string">'YYYY-MM-DD HH:mm'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 09:38'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
