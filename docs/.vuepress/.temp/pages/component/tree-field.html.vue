<template><div><h2 id="treefield-树表单域" tabindex="-1"><a class="header-anchor" href="#treefield-树表单域" aria-hidden="true">#</a> TreeField 树表单域</h2>
<p>基于Tree组件封装的表单域组件，可通过v-model绑定值。内置单向级联逻辑</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>组件会透传Tree组件支持的绝大部分属性和事件绑定以及插槽，部分属性设置了默认值，此外还有少数属性外部无法覆盖。具体见<a href="#tree-attributes.vue">Tree Attributes</a></p>
</div>
<h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h3>
<comp-demo name="Base"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
      关联模式：
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkMode<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>two-way<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>two-way(双向)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>one-way<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>one-way(单向)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>none(不关联）<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio-group</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-tree-field</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nodeIds<span class="token punctuation">"</span></span> <span class="token attr-name">:data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span> <span class="token attr-name">:check-mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkMode<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-tree-field</span><span class="token punctuation">></span></span>
    {{nodeIds}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">checkMode</span><span class="token operator">:</span> <span class="token string">'one-way'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">nodeIds</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 1'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 1-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">111</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 1-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 2'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">211</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">221</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">31</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">311</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">321</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><h3 id="在form中使用" tabindex="-1"><a class="header-anchor" href="#在form中使用" aria-hidden="true">#</a> 在Form中使用</h3>
<p>本例演示如何作为表单域使用，包括设置初始值，只读模式等。</p>
<comp-demo name="form-field"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-form</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span> <span class="token attr-name">:model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formData<span class="token punctuation">"</span></span> <span class="token attr-name">label-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>60px<span class="token punctuation">"</span></span> <span class="token attr-name">v-loading</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>loading<span class="token punctuation">"</span></span> <span class="token attr-name">element-loading-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>数据获取中。。。<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getApiData<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>获取回填数据<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isEditing = !isEditing<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ isEditing ? '只读' : '编辑'}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-form-item</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>名称<span class="token punctuation">"</span></span> <span class="token attr-name">prop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">required</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-input</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isEditing<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formData.name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-input</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-else</span><span class="token punctuation">></span></span>{{formData.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-form-item</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-form-item</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>权限<span class="token punctuation">"</span></span> <span class="token attr-name">prop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rightIds<span class="token punctuation">"</span></span> <span class="token attr-name">required</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-tree-field</span> <span class="token attr-name">inline</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formData.rightIds<span class="token punctuation">"</span></span> <span class="token attr-name">:data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span> <span class="token attr-name">:readonly</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>!isEditing<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-tree-field</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-form-item</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-form-btns</span>
      <span class="token attr-name">:parent-refs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$refs<span class="token punctuation">"</span></span>
      <span class="token attr-name">is-validate</span>
    <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-form-btns</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">isEditing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">formData</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token literal-property property">rightIds</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 1'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 1-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">111</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 1-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 2'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">211</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">221</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">31</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">311</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">321</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">getApiData</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">true</span>
      window<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>formData <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'管理员'</span><span class="token punctuation">,</span> <span class="token literal-property property">rightIds</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">211</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">221</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><h3 id="自定义节点内容" tabindex="-1"><a class="header-anchor" href="#自定义节点内容" aria-hidden="true">#</a> 自定义节点内容</h3>
<comp-demo name="scope-slot"><div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ue-tree-field</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nodeIds<span class="token punctuation">"</span></span> <span class="token attr-name">:data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span> <span class="token attr-name">:check-mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkMode<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{ node, data }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>el-icon-view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>{{data.label}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ue-tree-field</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">checkMode</span><span class="token operator">:</span> <span class="token string">'one-way'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">nodeIds</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 1'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 1-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">111</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 1-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 2'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">211</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 2-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">221</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 2-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'一级 3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">31</span><span class="token punctuation">,</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-1'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">311</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-1-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'二级 3-2'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">321</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'三级 3-2-1'</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></comp-demo><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Tree组件文档参照 <ui-lib-link component="Tree"></ui-lib-link></p>
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
<td style="text-align:left">string[] / number[]</td>
<td style="text-align:left">绑定值, <code v-pre>node-key</code>指定属性对应值的数组</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">node-key</td>
<td style="text-align:left">string</td>
<td style="text-align:left">和Tree组件同名属性意义一致，属性对应不上时无法查找节点会报错</td>
<td style="text-align:left">--</td>
<td style="text-align:left">'id'</td>
</tr>
<tr>
<td style="text-align:left">inline</td>
<td style="text-align:left">boolean</td>
<td style="text-align:left">是否采用行内展示的形式。行内展示使用了flex布局让根节点在水平方向平铺，减少页面高度</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">object[]</td>
<td style="text-align:left">数据源</td>
<td style="text-align:left">--</td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">check-mode</td>
<td style="text-align:left">string</td>
<td style="text-align:left">树节点的关联方式，对应Tree的<code v-pre>check-strictly</code>属性并增加了扩展。<em>two-way</em>对应false，<em>none</em>对应true，<em>one-way</em>为扩展关联方式（仅单向关联，父-&gt;子）</td>
<td style="text-align:left">two-way/one-way/none</td>
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
<h3 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h3>
<p>组件代理了Tree组件的所有方法，具体见Tree文档</p>
<h3 id="tree-attributes" tabindex="-1"><a class="header-anchor" href="#tree-attributes" aria-hidden="true">#</a> Tree Attributes</h3>
<p>仅列举原组件受影响的字段，其他字段见原组件文档。</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">能否覆盖</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">default-expand-all</td>
<td style="text-align:left">是</td>
<td style="text-align:left">true</td>
<td style="text-align:left">对于表单组件，默认展开所有节点毕竟方便操作</td>
</tr>
<tr>
<td style="text-align:left">expand-on-click-node</td>
<td style="text-align:left">是</td>
<td style="text-align:left">false</td>
<td style="text-align:left">点击节点展开对于有checkbox时容易产生误操作，故默认关闭</td>
</tr>
<tr>
<td style="text-align:left">check-strictly</td>
<td style="text-align:left">否</td>
<td style="text-align:left">--</td>
<td style="text-align:left">组件内部维护了关联值，所以无法覆盖</td>
</tr>
</tbody>
</table>
</div></template>
