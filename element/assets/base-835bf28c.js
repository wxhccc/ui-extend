import{_ as i,c as m,r as c,M as f,p as g,q as h,N as v,t as C,v as V}from"./framework-d784189f.js";const _=m({setup(){const a=c([]),n=c([]),s=(e,o,t,l)=>(console.log(e,o,t,l),u(e,o)),u=(e,o)=>new Promise(t=>{window.setTimeout(()=>{const l=Array(Math.floor(2+2*Math.random())).fill(0).map((D,r)=>({label:`${e+1}级${o?"-"+o:""}-${r}`,value:Math.pow(10,e)+r,...e<2?{children:[]}:{leaf:!0}}));t(l)},1e3)});return{values:a,data:n,onValueChange:e=>{console.log("value:",e)},fetchLevelList:s,getFullData:e=>{console.log("fullData:",e)}}}});function $(a,n,s,u,d,p){const e=f("ue-remote-cascader");return g(),h("div",null,[v(e,{modelValue:a.values,"onUpdate:modelValue":n[0]||(n[0]=o=>a.values=o),load:a.fetchLevelList,onFullValueChange:a.getFullData,onChange:a.onValueChange},null,8,["modelValue","load","onFullValueChange","onChange"]),C(" "+V(a.values),1)])}const M=i(_,[["render",$],["__file","base.vue"]]);export{M as default};
