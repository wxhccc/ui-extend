import{_ as n,c as p,M as r,p as u,U as d,V as f,Q as i,v as c,N as t,W as s}from"./framework-d784189f.js";const g=p({data(){return{formData:{sex:"",age:""},inputItem:{prop:"age",props:{label:"年龄",rules:[{required:!0,message:"请输入年龄"},{type:"number",message:"请输入有效数字"}]},field:{isNumber:!0,component:"ElInput",props:{placeholder:"请输入年龄"}}},selectItem:{props:{label:"性别",rules:[{required:!0,message:"请选择年龄"}]},prop:"sex",field:{component:"ElSelect",props:{placeholder:"请选择性别"},data:[{value:"man",label:"男"},{value:"women",label:"女"}]}}}}});function V(e,a,b,D,_,v){const l=r("ue-form-field-item"),m=r("el-form");return u(),d(m,{model:e.formData,inline:""},{default:f(()=>[i("p",null,c(e.formData),1),t(l,s(e.selectItem,{modelValue:e.formData.sex,"onUpdate:modelValue":a[0]||(a[0]=o=>e.formData.sex=o)}),null,16,["modelValue"]),t(l,s(e.inputItem,{modelValue:e.formData.age,"onUpdate:modelValue":a[1]||(a[1]=o=>e.formData.age=o)}),null,16,["modelValue"])]),_:1},8,["model"])}const N=n(g,[["render",V],["__file","base.vue"]]);export{N as default};