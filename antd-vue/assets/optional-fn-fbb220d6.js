import{e as i,Z as p,t as b,a as V,n as v,o as D}from"./app-0e5caad2.js";import{_ as I,c as g,r as y,M as d,p as U,U as k,V as N,Q as $,v as B,N as t,W as m}from"./framework-d784189f.js";const C=g({setup(){const e=y({age:"",sex:"",food:"",interest:[],birthday:""}),a=i(p("年龄",[{type:"number",message:"请输入有效数字"}]),"age",{isNumber:!0,placeholder:"请输入年龄"}),n=b("性别","sex",[{value:"man",label:"男"},{value:"women",label:"女"}]),r=V("喜欢的食物","good",[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],"请选择"),s=v("兴趣爱好","interest",[{value:"game",label:"游戏"},{value:"movie",label:"电影"},{value:"paint",label:"绘画"}]),u=D("生日","birthday");return{formData:e,inputItem:a,radioItem:n,selectItem:r,checkboxItem:s,dateItem:u}}});function w(e,a,n,r,s,u){const l=d("ue-form-field-item"),f=d("a-form");return U(),k(f,{model:e.formData,"label-col":{span:3}},{default:N(()=>[$("p",null,B(e.formData),1),t(l,m(e.inputItem,{modelValue:e.formData.age,"onUpdate:modelValue":a[0]||(a[0]=o=>e.formData.age=o)}),null,16,["modelValue"]),t(l,m(e.radioItem,{modelValue:e.formData.sex,"onUpdate:modelValue":a[1]||(a[1]=o=>e.formData.sex=o)}),null,16,["modelValue"]),t(l,m(e.selectItem,{modelValue:e.formData.food,"onUpdate:modelValue":a[2]||(a[2]=o=>e.formData.food=o)}),null,16,["modelValue"]),t(l,m(e.checkboxItem,{modelValue:e.formData.interest,"onUpdate:modelValue":a[3]||(a[3]=o=>e.formData.interest=o)}),null,16,["modelValue"]),t(l,m(e.dateItem,{modelValue:e.formData.birthday,"onUpdate:modelValue":a[4]||(a[4]=o=>e.formData.birthday=o)}),null,16,["modelValue"])]),_:1},8,["model"])}const M=I(C,[["render",w],["__file","optional-fn.vue"]]);export{M as default};