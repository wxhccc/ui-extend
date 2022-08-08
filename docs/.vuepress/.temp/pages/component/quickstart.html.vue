<template><div><h2 id="引入-uiextend" tabindex="-1"><a class="header-anchor" href="#引入-uiextend" aria-hidden="true">#</a> 引入 UiExtend</h2>
<p>你可以引入整个UiExtend，或是根据需要仅引入部分组件。</p>
<h3 id="完整引入" tabindex="-1"><a class="header-anchor" href="#完整引入" aria-hidden="true">#</a> 完整引入</h3>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>完整引入需先安装前置依赖，具体见<RouterLink to="/component/">安装</RouterLink></p>
</div>
<p>在main.js中添加以下内容</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>
<span class="token keyword">import</span> UiExtend <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>UiExtend<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码便完成了UiExtend的引入</p>
<h3 id="按需引入" tabindex="-1"><a class="header-anchor" href="#按需引入" aria-hidden="true">#</a> 按需引入</h3>
<p>你可以通过以下的写法来按需加载组件或模块</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> FormBtns <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@wxhccc/ui-extend'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>
