import{h as n,_ as r,k as l}from"./app-0e5caad2.js";import{c as p,r as i,_ as m,M as u,p as c,q as f,Q as d,v as _,N as b}from"./framework-d784189f.js";const h=p({setup(){const e=i({}),o={searchBtnProps:{shape:"success"},btnText:"搜索"},t=[n("活动名称","name"),r("活动区域","region",[{value:"shanghai",label:"区域一"},{value:"beijing",label:"区域二"}],"请选择活动区域"),l("活动时间","date","dateRange",{initValue:[]})];return{formData:e,buttonOptions:o,items:t}}});function v(e,o,t,V,g,D){const a=u("ue-search-form");return c(),f("div",null,[d("p",null,_(e.formData),1),b(a,{"label-width":"auto",items:e.items,"button-options":e.buttonOptions,modelValue:e.formData,"onUpdate:modelValue":o[0]||(o[0]=s=>e.formData=s)},null,8,["items","button-options","modelValue"])])}const $=m(h,[["render",v],["__file","more-props.vue"]]);export{$ as default};
