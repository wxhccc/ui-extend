import{_ as f,c as v,r as m,M as i,p as h,q as w,N as r,V as c}from"./framework-d784189f.js";const D=v({setup(){const t=m(!1),a=m({rows:[],hasMore:!0}),p=async e=>{console.log(e),t.value=!0,a.value=await _(e),console.log(a.value),t.value=!1},_=e=>new Promise(g=>{const{current:o,size:s}=e,d=Array(s||10).fill(0).map((u,n)=>{const l=Math.random();return{id:(o-1)*s+n,title:l.toString(26).substring(2),description:l.toString(34).substring(2)+l.toString(32)}});window.setTimeout(()=>{g({rows:d,hasMore:o<5})},1500)});return{loading:t,pagedData:a,getPagedData:p}}}),M={class:"paded-list-demo-ul",style:{height:"400px"}};function y(t,a,p,_,e,g){const o=i("a-avatar"),s=i("a-list-item-meta"),d=i("a-list-item"),u=i("ue-paged-list");return h(),w("div",M,[r(u,{class:"paded-list-demo-ul","created-auto-send":"","flex-layout":"","paged-data":t.pagedData,loading:t.loading,"get-paged-data":t.getPagedData},{renderItem:c(({item:n})=>[r(d,null,{default:c(()=>[r(s,{title:n.title,description:n.description},{avatar:c(()=>[r(o,{src:"https://joeschmoe.io/api/v1/random"})]),_:2},1032,["title","description"])]),_:2},1024)]),_:1},8,["paged-data","loading","get-paged-data"])])}const k=f(D,[["render",y],["__file","no-total.vue"]]);export{k as default};
