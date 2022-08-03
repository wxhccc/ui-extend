<template><div><h2 id="前置准备" tabindex="-1"><a class="header-anchor" href="#前置准备" aria-hidden="true">#</a> 前置准备</h2>
<p>本组件库是基于多个npm库封装的，并且这些npm库可能在你的项目里是本身就已经安装了或者您期望自行安装的。</p>
<p>基于这方面考虑，本组件库默认提供的是不包含这些第三方npm库的代码，同时以<a href="https://docs.npmjs.com/files/package.json#peerdependencies" target="_blank" rel="noopener noreferrer">Peer dependencies<ExternalLinkIcon/></a>的形式将这些第三库列举出来。</p>
<p>如果你按需引入时需要使用特定组件，可按以下列表对应关系安装npm库。</p>
<p><strong>ps: npm方式全局引入时都是必须安装的。cdn方式引入文件包含除element-ui均已包含</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">npm库</th>
<th style="text-align:left">按需引入时是否必需</th>
<th style="text-align:left">安装指令</th>
<th style="text-align:left">相关组件</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">element-ui</td>
<td style="text-align:left">是</td>
<td style="text-align:left"><code v-pre>npm i element-ui -S</code></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">lodash</td>
<td style="text-align:left">是</td>
<td style="text-align:left"><code v-pre>npm i lodash -S</code></td>
<td style="text-align:left">--</td>
</tr>
<tr>
<td style="text-align:left">cropperjs</td>
<td style="text-align:left">否</td>
<td style="text-align:left"><code v-pre>npm i cropperjs -S</code></td>
<td style="text-align:left"><code v-pre>Cropper</code></td>
</tr>
<tr>
<td style="text-align:left">video.js</td>
<td style="text-align:left">否</td>
<td style="text-align:left"><code v-pre>npm i video.js -S</code></td>
<td style="text-align:left"><code v-pre>VideoPlayer</code></td>
</tr>
<tr>
<td style="text-align:left">viewerjs</td>
<td style="text-align:left">否</td>
<td style="text-align:left"><code v-pre>npm i viewerjs -S</code></td>
<td style="text-align:left"><code v-pre>Viewer</code></td>
</tr>
</tbody>
</table>
<h2 id="npm-安装" tabindex="-1"><a class="header-anchor" href="#npm-安装" aria-hidden="true">#</a> npm 安装</h2>
<p>推荐使用 npm 的方式安装，它能更好地和<a href="https://webpack.js.org" target="_blank" rel="noopener noreferrer">webpack<ExternalLinkIcon/></a>打包工具配合使用。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i @wxhccc/ui-extend -S
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cdn" tabindex="-1"><a class="header-anchor" href="#cdn" aria-hidden="true">#</a> CDN</h2>
<p>可以通过推<a href="https://unpkg.com/@wxhccc/ui-extend" target="_blank" rel="noopener noreferrer">unpkg.com/@wxhccc/ui-extend<ExternalLinkIcon/></a>获取到cdn资源，在页面上引入即可开始使用。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 必须先引入element-ui组件库 --></span>
<span class="token comment">&lt;!-- 引入组件库 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/@wxhccc/ui-extend/lib/index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">友情提示</p>
<p>建议用cdn引入方式时在链接地址上锁定版本，以避免组件库升级时带来的兼容性方面的影响。锁定版本的方法见<a href="https://unpkg.com.vue" target="_blank" rel="noopener noreferrer">unpkg.com<ExternalLinkIcon/></a></p>
</div>
</div></template>
