import{z as d,x as n,h as i,l as f}from"./app-59cd0345.js";import{_ as p,c as l,j as a,aA as u,M as r,p as c,U as b,V as _,Q as h,v as D,N as P}from"./framework-d784189f.js";const V=l({props:{formItemProps:Object,fieldProps:Object},setup(e,{attrs:o}){return()=>a(n,e.formItemProps,{default:()=>a(d,{...e.fieldProps,...o})})}}),w=l({data(){return{formData:{},items:[i(f("活动名称"),"name"),,{prop:"region",props:{formItemProps:{label:"活动区域",rules:[{required:!0,message:"请选择活动区域"}]},fieldProps:{checkMode:"one-way",data:[{label:"一级 1",id:1,children:[{label:"二级 1-1",id:11,children:[{id:111,label:"三级 1-1-1"}]}]},{label:"一级 2",id:2,children:[{id:21,label:"二级 2-1",children:[{id:211,label:"三级 2-1-1"}]},{id:22,label:"二级 2-2",children:[{id:221,label:"三级 2-2-1"}]}]}]}},component:u(V)}]}}});function I(e,o,k,C,$,g){const t=r("ue-form-fields"),s=r("el-form");return c(),b(s,{model:e.formData,ref:"form",style:{width:"80%"},"label-width":"80px"},{default:_(()=>[h("p",null,D(e.formData),1),P(t,{items:e.items,modelValue:e.formData,"onUpdate:modelValue":o[0]||(o[0]=m=>e.formData=m)},null,8,["items","modelValue"])]),_:1},8,["model"])}const y=p(w,[["render",I],["__file","custom-item.vue"]]);export{y as default};
