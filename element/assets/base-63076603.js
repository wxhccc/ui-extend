import{_,c as v,r as s,M as p,p as l,q as i,N as r,O as y,V as d,t as u,R as w,Q as m,v as b}from"./framework-d784189f.js";const C=v({setup(){const e=s(),t=s(!1),n=s(""),c=s("https://oss.sw.wxhice.com/adm/73d924459e72b343d636d3ba170b61d2.jpg");return{cropper:e,isReady:t,message:n,src:c,getImageData:()=>{n.value=e.value.callCropperMethod("getImageData")},viewOutput:async()=>{const a=await e.value.getCroppedFile();console.log(a);const o=window.URL.createObjectURL(a);window.open(o)}}}}),k=m("br",null,null,-1),R={style:{border:"1px solid #eaeaea"}};function D(e,t,n,c,g,f){const a=p("ue-cropper"),o=p("a-button");return l(),i("div",null,[r(a,{ref:"cropper",src:e.src,onReady:t[0]||(t[0]=h=>e.isReady=!0)},null,8,["src"]),k,e.isReady?(l(),i(y,{key:0},[r(o,{type:"primary",onClick:e.getImageData},{default:d(()=>[u("getImageData")]),_:1},8,["onClick"]),r(o,{type:"primary",onClick:e.viewOutput},{default:d(()=>[u("预览")]),_:1},8,["onClick"])],64)):w("v-if",!0),m("p",R,b(e.message),1)])}const N=_(C,[["render",D],["__file","base.vue"]]);export{N as default};
