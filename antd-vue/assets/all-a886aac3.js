import{_ as m,c as h,r as _,b,h as g,M as i,p as c,q as k,N as r,U as v,R as E,Q as s}from"./framework-d784189f.js";const V=h({setup(){const n=_(!0),t=b({isEdit:!1,value:""}),a=g(()=>[{text:"view",click:(e,o)=>{console.log(e,o)}},{btype:"primary",loadingKey:"infoSend",text:e=>e.isEdit?"save":"edit",loadingText:"saveing...",click:d},{props:{size:"small"},btype:"danger",text:"delete",hide:()=>!n.value,isConfirm:!0,confirmMsg:()=>"删除后无法恢复，确定要删除",click(){}}]),d=(e,o)=>{console.log(e),e.isEdit?(e.infoSend=!0,window.setTimeout(()=>{e.infoSend=!1,e.isEdit=!e.isEdit},2e3)):e.isEdit=!e.isEdit};return{hasRight:n,data:t,btns:a}}}),w=s("br",null,null,-1),y=s("br",null,null,-1),B=s("br",null,null,-1),C=s("br",null,null,-1);function N(n,t,a,d,e,o){const u=i("a-switch"),p=i("a-input"),f=i("ue-action-btns");return c(),k("div",null,[r(u,{checked:n.hasRight,"onUpdate:checked":t[0]||(t[0]=l=>n.hasRight=l),"checked-children":"不隐藏","un-checked-children":"隐藏按钮"},null,8,["checked"]),w,y,n.data.isEdit?(c(),v(p,{key:0,modelValue:n.data.value,"onUpdate:modelValue":t[1]||(t[1]=l=>n.data.value=l)},null,8,["modelValue"])):E("v-if",!0),B,C,r(f,{data:n.data,btns:n.btns,"loading-flags":n.data},null,8,["data","btns","loading-flags"])])}const $=m(V,[["render",N],["__file","all.vue"]]);export{$ as default};
