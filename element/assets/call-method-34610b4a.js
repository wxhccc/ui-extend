import{e as u,Z as p}from"./app-59cd0345.js";import{_,c as V,r as s,M as a,p as F,U as C,V as l,Q as k,N as r,t as D}from"./framework-d784189f.js";const N=V({setup(){const e=s(),o=s({}),t=[u(p("活动名称"),"name")];return{formFields:e,formData:o,items:t,clearFieldValidate:()=>{e.value.getFormItemRefs().name.clearValidate()}}}});function $(e,o,t,n,m,v){const d=a("a-button"),f=a("ue-form-fields"),c=a("a-form");return F(),C(c,{model:e.formData},{default:l(()=>[k("p",null,[r(d,{onClick:e.clearFieldValidate},{default:l(()=>[D("清除验证状态")]),_:1},8,["onClick"])]),r(f,{ref:"formFields",items:e.items,modelValue:e.formData,"onUpdate:modelValue":o[0]||(o[0]=i=>e.formData=i)},null,8,["items","modelValue"])]),_:1},8,["model"])}const b=_(N,[["render",$],["__file","call-method.vue"]]);export{b as default};
