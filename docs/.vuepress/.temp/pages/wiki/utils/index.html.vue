<template><div><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<p>Utils文件并未包含在组件库代码中，需要单独引入，使用方法如下：</p>
<h3 id="npm方式-推荐" tabindex="-1"><a class="header-anchor" href="#npm方式-推荐" aria-hidden="true">#</a> npm方式(推荐)</h3>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>npm方式需要先安装依赖包，<a href="https://npmjs.com/package/numeral" target="_blank" rel="noopener noreferrer">numeral<ExternalLinkIcon/></a>、<a href="https://npmjs.com/package/fecha" target="_blank" rel="noopener noreferrer">fecha<ExternalLinkIcon/></a></p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入cjs文件</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Utils <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>
<span class="token comment">// or 配置了node_modules内包也会解析的情况下</span>
<span class="token comment">// import { loadjs, percent } from '@wxhccc/ui-extend/src/utils'</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> loadjs<span class="token punctuation">,</span> percent <span class="token punctuation">}</span> <span class="token operator">=</span> Utils 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cdn方式" tabindex="-1"><a class="header-anchor" href="#cdn方式" aria-hidden="true">#</a> cdn方式</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 先引入其他脚本 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/@wxhccc/ui-extend/lib/utils.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> Utils <span class="token operator">=</span> <span class="token constant">UIEXTENDS</span><span class="token punctuation">.</span>utils

Utils<span class="token punctuation">.</span><span class="token function">loadjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<h3 id="loadjs" tabindex="-1"><a class="header-anchor" href="#loadjs" aria-hidden="true">#</a> loadjs</h3>
<p>简单的动态js脚步引入函数，返回promise对象</p>
<p><strong>语法</strong>: <code v-pre>loadjs(url)</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>url</code> {String} 脚步地址。</li>
</ul>
<p><strong>返回值</strong>: promise</p>
<p><strong>示例</strong>:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> loadjs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>

<span class="token function">loadjs</span><span class="token punctuation">(</span><span class="token string">'https://www.example.com/xxxxxxxx.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里的代码可以使用动态脚步的内容</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="commanum" tabindex="-1"><a class="header-anchor" href="#commanum" aria-hidden="true">#</a> <code v-pre>commaNum</code></h3>
<p>使用<code v-pre>numeral</code>库的格式化函数将数字转换为3位逗号分割的字符串，常用于显示金额数字，可指定精度</p>
<p><strong>语法</strong>: <code v-pre>commaNum(number[, format])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>number</code> {Number/NumberString} 数字或者数字字符串</li>
<li><code v-pre>format</code> {String} 格式化字符串，默认值为：<code v-pre>0,0</code></li>
</ul>
<p><strong>返回值</strong>: string</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> commaNum <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>

<span class="token function">commaNum</span><span class="token punctuation">(</span><span class="token number">1242323</span><span class="token punctuation">)</span>
<span class="token comment">// log '1,242,323'</span>
<span class="token function">commaNum</span><span class="token punctuation">(</span><span class="token number">1242323.256</span><span class="token punctuation">,</span> <span class="token string">'$0,0.00'</span><span class="token punctuation">)</span>
<span class="token comment">// log '$1,242,323.26'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="percent" tabindex="-1"><a class="header-anchor" href="#percent" aria-hidden="true">#</a> <code v-pre>percent</code></h3>
<p>使用<code v-pre>numeral</code>库的格式化函数将数字转换为百分比，可指定精度，也可以不带百分比符号</p>
<p><strong>语法</strong>: <code v-pre>percent(number[, format, noSymbol])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>number</code> {Number/NumberString} 数字或者数字字符串</li>
<li><code v-pre>format</code> {String} 格式化字符串，默认值为：<code v-pre>0.0</code></li>
<li><code v-pre>noSymbol</code> {Boolean} 是否不带符号</li>
</ul>
<p><strong>返回值</strong>: string</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> percent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>

<span class="token function">percent</span><span class="token punctuation">(</span><span class="token number">0.1234</span><span class="token punctuation">)</span>
<span class="token comment">// log '12.3%'</span>
<span class="token function">commaNum</span><span class="token punctuation">(</span><span class="token number">1.2245</span><span class="token punctuation">,</span> <span class="token string">'0.00'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token comment">// log '122.45'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="secondstringify" tabindex="-1"><a class="header-anchor" href="#secondstringify" aria-hidden="true">#</a> <code v-pre>secondStringify</code></h3>
<p>将秒数转换为‘1小时2分钟6秒’或‘1day2hour’这种格式的字符</p>
<p><strong>语法</strong>: <code v-pre>secondStringify(seconds[, level, lang])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>seconds</code> {Number} 总秒数</li>
<li><code v-pre>level</code> {Number} 从秒开始，按秒、分、小时、天的顺序，控制不显示数据的层级。默认值为：0（显示所有）</li>
<li><code v-pre>lang</code> {String/Array} 显示单位的语言，'zh'/'en'或者传入自定义4级单位字符串数组</li>
</ul>
<p><strong>返回值</strong>: string</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> secondStringify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>

<span class="token function">secondStringify</span><span class="token punctuation">(</span><span class="token number">3631</span><span class="token punctuation">)</span>
<span class="token comment">// log '1小时31秒'</span>
<span class="token function">secondStringify</span><span class="token punctuation">(</span><span class="token number">3671</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'en'</span><span class="token punctuation">)</span>
<span class="token comment">// log '1hour1minute'</span>
<span class="token function">secondStringify</span><span class="token punctuation">(</span><span class="token number">3671</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'s'</span><span class="token punctuation">,</span> <span class="token string">'min'</span><span class="token punctuation">,</span> <span class="token string">'h'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// log '1h1min11s'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dateformat" tabindex="-1"><a class="header-anchor" href="#dateformat" aria-hidden="true">#</a> <code v-pre>dateFormat</code></h3>
<p>使用<code v-pre>fecha</code>库(时间处理库)的格式化函数格式化时间</p>
<p><strong>语法</strong>: <code v-pre>dateFormat(date[, format])</code></p>
<p><strong>参数</strong>:</p>
<ul>
<li><code v-pre>date</code> {Date/String/Number} 需要转换的时间，支持Date对象，字符串格式时间，10/13位时间戳</li>
<li><code v-pre>format</code> {String} 输出时间的格式。默认值为：'YYYY-MM-DD HH:mm:ss'，支持具体格式字符串或者格式别名，别名可以通过fecha.masks合并，具体见文档。fecha.masks已包含default: 'YYYY-MM-DD HH:mm:ss'，date: 'YYYY-MM-DD'</li>
</ul>
<p><strong>返回值</strong>: string</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> dateFormat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/utils'</span>

<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 11:12:13'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token string">'2019/08/29'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 00:00:00'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token number">1567042733116</span><span class="token punctuation">,</span> <span class="token string">'date'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29'</span>
<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token number">1567042733</span><span class="token punctuation">,</span> <span class="token string">'YYYY-MM-DD HH:mm'</span><span class="token punctuation">)</span>
<span class="token comment">// log '2019-08-29 09:38'</span>
<span class="token doc-comment comment">/** 高级功能，安装了fecha后，引入 **/</span>
<span class="token keyword">import</span> fecha <span class="token keyword">from</span> <span class="token string">'fecha'</span>
<span class="token comment">// 添加别名，也可以设置多语言</span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>fecha<span class="token punctuation">.</span>masks<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token string">'HH:mm:ss'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">dateFormat</span><span class="token punctuation">(</span><span class="token number">1567042733</span><span class="token punctuation">,</span> <span class="token string">'time'</span><span class="token punctuation">)</span>
<span class="token comment">// log '09:38:53'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
