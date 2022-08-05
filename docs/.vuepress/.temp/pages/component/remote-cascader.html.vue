<template><div><h2 id="remotecascader-异步级联选择器" tabindex="-1"><a class="header-anchor" href="#remotecascader-异步级联选择器" aria-hidden="true">#</a> RemoteCascader 异步级联选择器</h2>
<p>基于Cascader组件的动态加载封装的表单域组件。简化异步请求逻辑，支持数据回填。</p>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-remote-cascader</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>values<span class="token punctuation">"</span></span> <span class="token attr-name">:load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fetchLevelList<span class="token punctuation">"</span></span> <span class="token attr-name">@full-value-change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getFullData<span class="token punctuation">"</span></span> <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getValue<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-remote-cascader</span><span class="token punctuation">></span></span>
    {{values}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">values</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fetchLevelList</span> <span class="token punctuation">(</span><span class="token parameter">level<span class="token punctuation">,</span> curVal<span class="token punctuation">,</span> values<span class="token punctuation">,</span> curNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> curVal<span class="token punctuation">,</span> values<span class="token punctuation">,</span> curNode<span class="token punctuation">)</span>
      <span class="token comment">// 这里可以替换成axios等ajax库的接口返回值</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getMockData</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> curVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getMockData</span> <span class="token punctuation">(</span><span class="token parameter">level<span class="token punctuation">,</span> curVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// 数据超过2层后不添加children。对于接口无下一级数据时节点不返回children或设置标识</span>
          <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> idx</span><span class="token punctuation">)</span> <span class="token operator">=></span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>level <span class="token operator">+</span> <span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">级</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>curVal <span class="token operator">?</span> <span class="token string">'-'</span> <span class="token operator">+</span> curVal <span class="token operator">:</span> <span class="token string">''</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>idx<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> level<span class="token punctuation">)</span> <span class="token operator">+</span> idx
          <span class="token punctuation">}</span><span class="token punctuation">,</span> level <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">leaf</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getValue</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'value:'</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getFullData</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'fullData:'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><h3 id="数据回填" tabindex="-1"><a class="header-anchor" href="#数据回填" aria-hidden="true">#</a> 数据回填</h3>
<p>采用数据传入方式的组件回填时不会禁用组件，而resolve方式的为了避免回填时影响操作产生的数据将会暂时禁用组件</p>
<comp-demo name="set-values"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getSaveValues<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>获取接口数据回填<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>clearValues<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>清空数据<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>使用<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>init-first-change<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>属性来回填<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-remote-cascader</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rc1<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>values<span class="token punctuation">"</span></span> <span class="token attr-name">init-first-change</span> <span class="token attr-name">:load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fetchLevelList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-remote-cascader</span><span class="token punctuation">></span></span>
    value: {{values}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>使用<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>init-value<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>属性来回填<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-remote-cascader</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rc2<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>values1<span class="token punctuation">"</span></span> <span class="token attr-name">:init-value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initValue1<span class="token punctuation">"</span></span> <span class="token attr-name">:load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fetchLevelList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-remote-cascader</span><span class="token punctuation">></span></span>
    value: {{values1}}   init-value: {{initValue1}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>回填时使用<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>init-in-order<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>来获取上一级数据对象<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-remote-cascader</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rc3<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>values2<span class="token punctuation">"</span></span> <span class="token attr-name">init-first-change</span> <span class="token attr-name">init-in-order</span> <span class="token attr-name">:load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fetchLevelList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-remote-cascader</span><span class="token punctuation">></span></span>
    value: {{values2}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">values</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">values1</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">initValue1</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">values2</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clearValues</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>values2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>initValue1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>rc1<span class="token punctuation">.</span><span class="token function">modifyOptions</span><span class="token punctuation">(</span><span class="token parameter">options</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getSaveValues</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token function-variable function">data</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>values <span class="token operator">=</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>values2 <span class="token operator">=</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>initValue1 <span class="token operator">=</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">fetchLevelList</span> <span class="token punctuation">(</span><span class="token parameter">level<span class="token punctuation">,</span> curVal<span class="token punctuation">,</span> values<span class="token punctuation">,</span> curNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 使用init-in-order时，curNode可以获取到上一级的数据对象</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> curVal<span class="token punctuation">,</span> values<span class="token punctuation">,</span> curNode<span class="token punctuation">)</span>
      <span class="token comment">// 这里可以替换成axios等ajax库的接口返回值</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getMockData</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> curVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">getMockData</span> <span class="token punctuation">(</span><span class="token parameter">level<span class="token punctuation">,</span> curVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// 数据超过2层后不添加children。对于接口无下一级数据时节点不返回children或设置标识</span>
          <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> idx</span><span class="token punctuation">)</span> <span class="token operator">=></span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>level <span class="token operator">+</span> <span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">级</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>curVal <span class="token operator">?</span> <span class="token string">'-'</span> <span class="token operator">+</span> curVal <span class="token operator">:</span> <span class="token string">''</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>idx<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> level<span class="token punctuation">)</span> <span class="token operator">+</span> idx
          <span class="token punctuation">}</span><span class="token punctuation">,</span> level <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">leaf</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>组件会透传Cascader组件支持的绝大部分属性和事件绑定以及插槽，但关于动态加载部分的可能无法覆盖。</p>
<p>Tree组件文档参照 <element-link component="Tree"></element-link></p>
</div>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>Element库2.8和2.9版本的Cascader组件Api不一致。2.9版本的需要设置本组件的<code v-pre>is-resolve</code>，且回填体验不佳。</p>
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
<td style="text-align:left">array / any</td>
<td style="text-align:left">绑定值, 类型视版本决定。需要回填时必须为数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">load</td>
<td style="text-align:left"><code v-pre>(level, value, values, data[, node]) =&gt; Promise</code><br/>参数分别为当前数据层级，当前数据值，完整数据值数组，当前数据对象，当前节点（如果存在）</td>
<td style="text-align:left">数据动态请求函数，需要返回能resolve数据的Promise对象</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-first-change</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否将value的第一次变化理解为初始化，适用于数据回填。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-value</td>
<td style="text-align:left">array</td>
<td style="text-align:left">初始化数据，如不能确保value第一次变化是初始化（比如结构化数据工具获取的数据即使实际值没变也会导致change），请使用此属性</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">init-in-order</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否按顺序初始化数据，设置为true时耗时会大幅增加，但下一次<code v-pre>load</code>调用时能获取到上一层的数据对象。</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">readonly</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">展示模式，不显示checkbox，仅显示选中的节点文字</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
</tbody>
</table>
<h3 id="events" tabindex="-1"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h3>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
<th style="text-align:left">回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">on-change</td>
<td style="text-align:left">value发送变化时触发。和Cascader组件上的change事件的区别是这个事件会传入value值对于的所有节点的完整数据对象，适合需要获取节点里其他属性的场景。对resolve方式无效</td>
<td style="text-align:left">(data: data[])</td>
</tr>
</tbody>
</table>
</div></template>
