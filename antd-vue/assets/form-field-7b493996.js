import{_ as k,c as E,r as i,M as a,aw as w,Z as C,p as r,U as u,V as t,Q as y,N as o,t as p,v as c,q as I}from"./framework-d784189f.js";const $=E({setup(){const e=i(),l=i(!1),s=i(!0),d=i({name:"",rightIds:[]});return{form:e,loading:l,isEditing:s,formData:d,data:[{label:"一级 1",id:1,children:[{label:"二级 1-1",id:11,children:[{id:111,label:"三级 1-1-1"}]}]},{label:"一级 2",id:2,children:[{id:21,label:"二级 2-1",children:[{id:211,label:"三级 2-1-1"}]},{id:22,label:"二级 2-2",children:[{id:221,label:"三级 2-2-1"}]}]},{label:"一级 3",id:3,children:[{id:31,label:"二级 3-1",children:[{id:311,label:"三级 3-1-1"}]},{label:"二级 3-2",id:32,children:[{id:321,label:"三级 3-2-1"}]}]}],getApiData:()=>{l.value=!0,window.setTimeout(()=>{d.value={name:"管理员",rightIds:[1,11,111,2,21,211,22,221]},l.value=!1},2e3)}}}}),B={key:1};function N(e,l,s,d,b,g){const m=a("el-button"),_=a("el-input"),f=a("el-form-item"),D=a("ue-tree-field"),h=a("ue-form-btns"),v=a("el-form"),V=w("loading");return C((r(),u(v,{ref:"form",model:e.formData,"label-width":"60px","element-loading-text":"数据获取中。。。"},{default:t(()=>[y("p",null,[o(m,{onClick:e.getApiData},{default:t(()=>[p("获取回填数据")]),_:1},8,["onClick"]),o(m,{onClick:l[0]||(l[0]=n=>e.isEditing=!e.isEditing)},{default:t(()=>[p(c(e.isEditing?"只读":"编辑"),1)]),_:1})]),o(f,{label:"名称",prop:"name",required:""},{default:t(()=>[e.isEditing?(r(),u(_,{key:0,modelValue:e.formData.name,"onUpdate:modelValue":l[1]||(l[1]=n=>e.formData.name=n)},null,8,["modelValue"])):(r(),I("span",B,c(e.formData.name),1))]),_:1}),o(f,{label:"权限",prop:"rightIds",required:""},{default:t(()=>[o(D,{inline:"",modelValue:e.formData.rightIds,"onUpdate:modelValue":l[2]||(l[2]=n=>e.formData.rightIds=n),data:e.data,readonly:!e.isEditing},null,8,["modelValue","data","readonly"])]),_:1}),o(h,{form:e.form,"is-validate":""},null,8,["form"])]),_:1},8,["model"])),[[V,e.loading]])}const A=k($,[["render",N],["__file","form-field.vue"]]);export{A as default};
