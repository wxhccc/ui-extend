import{e as f,Z as u}from"./app-0e5caad2.js";import{_ as p,c as _,r as l,M as o,p as V,U as g,V as r,Q as C,N as n,t as N,W as b}from"./framework-d784189f.js";const k=_({setup(){const e=l(),a=l({age:""}),t=f(u("年龄",[{type:"number",message:"请输入有效数字"}]),"age",{isNumber:!0,placeholder:"请输入年龄"});return{fieldItem:e,formData:a,inputItem:t,clearFieldValidate:()=>{e.value.clearValidate()}}}});function D(e,a,t,s,I,$){const m=o("a-button"),d=o("ue-form-field-item"),c=o("a-form");return V(),g(c,{model:e.formData},{default:r(()=>[C("p",null,[n(m,{onClick:e.clearFieldValidate},{default:r(()=>[N("清除验证状态")]),_:1},8,["onClick"])]),n(d,b({ref:"fieldItem"},e.inputItem,{modelValue:e.formData.age,"onUpdate:modelValue":a[0]||(a[0]=i=>e.formData.age=i)}),null,16,["modelValue"])]),_:1},8,["model"])}const B=p(k,[["render",D],["__file","call-method.vue"]]);export{B as default};
