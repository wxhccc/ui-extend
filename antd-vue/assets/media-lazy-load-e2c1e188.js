import{X as u}from"./app-0e5caad2.js";import{_ as p,c as f,r as o,o as z,M as m,p as v,q as h,N as l,Q as _,V as g}from"./framework-d784189f.js";const b=f({setup(){const e=o(),a=o(),r=o("dynamic"),n=o({}),d=o("https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg"),c=u(e,r),s=i=>{const t=i.target;n.value={width:t.naturalWidth,height:t.naturalHeight}};return z(()=>{c.lazyObserve(a.value)}),{contianer:e,el:a,src:d,mediaSize:n,setMediaSize:s}}}),y={ref:"contianer",class:"demo-media-container-box3"},L=["data-src"];function M(e,a,r,n,d,c){const s=m("a-alert"),i=m("ue-media-container");return v(),h("div",null,[l(s,{message:"滚动到底部触发懒加载"}),_("div",y,[l(i,{class:"demo-media-container","container-force-render":"","media-size":e.mediaSize},{default:g(()=>[_("img",{ref:"el","data-src":e.src,onLoad:a[0]||(a[0]=(...t)=>e.setMediaSize&&e.setMediaSize(...t))},null,40,L)]),_:1},8,["media-size"])],512)])}const $=p(b,[["render",M],["__file","media-lazy-load.vue"]]);export{$ as default};
