<template><div><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<p>Mixins文件并未包含在组件库代码中，需要单独引入，使用方法如下</p>
<h3 id="npm方式-推荐" tabindex="-1"><a class="header-anchor" href="#npm方式-推荐" aria-hidden="true">#</a> npm方式(推荐)</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入cjs文件</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> routeWatcher <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/mixins'</span>
<span class="token comment">// or 配置了node_modules内包也会解析的情况下</span>
<span class="token comment">// import * as Mixins from '@wxhccc/ui-extend/src/mixins'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">routeWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cdn方式" tabindex="-1"><a class="header-anchor" href="#cdn方式" aria-hidden="true">#</a> cdn方式</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 先引入其他脚本 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/@wxhccc/ui-extend/lib/mixins.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> routeWatcher <span class="token operator">=</span> <span class="token constant">UIEXTENDS</span><span class="token punctuation">.</span>mixins<span class="token punctuation">.</span>routeWatcher
<span class="token keyword">const</span> Page <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">routeWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<h3 id="routewatcher" tabindex="-1"><a class="header-anchor" href="#routewatcher" aria-hidden="true">#</a> routeWatcher</h3>
<p>返回用于混入路由组件的mixin对象，会监听路由变化并自动重置数据和重新运行逻辑函数</p>
<h4 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值" aria-hidden="true">#</a> 返回值</h4>
<p>mixin对象，具体结构如下</p>
<p><strong><code v-pre>methods</code></strong></p>
<ul>
<li>
<p><code v-pre>initRouteState</code>
路由初始化处理函数，如果组件内定义了此函数，函数会在每次路由变化（包括参数变化）时调用</p>
</li>
<li>
<p><code v-pre>$_mixin_initData(initData, dynamData)</code></p>
<p>在组件data函数内调用，将返回值作为data数据</p>
<p><strong>paramsters</strong>:</p>
<ul>
<li><code v-pre>initData</code> {Object} 需要在路由变化时恢复初始值的数据，可以方便的初始化大量数据。</li>
<li><code v-pre>dynamData</code> {Object} 不需要在路由变化时恢复的数据，可以用来保存页面配置、插件引用等数据。</li>
</ul>
<p><strong>return</strong>: object</p>
<p><strong>示例</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// users-list.vue</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> routeWatcher <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend/lib/mixins'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">routeWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$_mixin_initData</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">''</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">pageSize</span><span class="token operator">:</span> <span class="token number">20</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">initRouteState</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 获取路由参数并进行响应处理</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>
