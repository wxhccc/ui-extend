import{_ as b,c as V,b as m,S as f,M as i,p as s,q as h,Q as u,t as a,N as o,V as n,U as k,v as r}from"./framework-d784189f.js";const _=V({setup(){const e=m({checkMode:"one-way",nodeIds:[],detailValue:{},data:[{label:"一级 1",id:1,children:[{label:"二级 1-1",id:11,children:[{id:111,label:"三级 1-1-1"}]}]},{label:"一级 2",id:2,children:[{id:21,label:"二级 2-1",children:[{id:211,label:"三级 2-1-1"}]},{id:22,label:"二级 2-2",children:[{id:221,label:"三级 2-2-1"}]}]},{label:"一级 3",id:3,children:[{id:31,label:"二级 3-1",children:[{id:311,label:"三级 3-1-1"}]},{label:"二级 3-2",id:32,children:[{id:321,label:"三级 3-2-1"}]}]}]}),l=()=>{e.nodeIds=[],e.detailValue={}};return{...f(e),resetValues:l}}}),w=u("br",null,null,-1);function v(e,l,y,M,g,C){const t=i("el-radio"),c=i("el-radio-group"),p=i("ue-tree-field");return s(),h("div",null,[u("p",null,[a(" 关联模式： "),o(c,{modelValue:e.checkMode,"onUpdate:modelValue":l[0]||(l[0]=d=>e.checkMode=d),onChange:e.resetValues},{default:n(()=>[o(t,{label:"two-way"},{default:n(()=>[a("two-way(双向)")]),_:1}),o(t,{label:"one-way"},{default:n(()=>[a("one-way(单向)")]),_:1}),o(t,{label:"none"},{default:n(()=>[a("none(不关联）")]),_:1})]),_:1},8,["modelValue","onChange"])]),(s(),k(p,{modelValue:e.nodeIds,"onUpdate:modelValue":l[1]||(l[1]=d=>e.nodeIds=d),"detail-value":e.detailValue,"onUpdate:detailValue":l[2]||(l[2]=d=>e.detailValue=d),data:e.data,"check-mode":e.checkMode,key:e.checkMode},null,8,["modelValue","detail-value","data","check-mode"])),a(" modelValue: "+r(e.nodeIds)+" ",1),w,a(" detailValue: "+r(e.detailValue),1)])}const B=b(_,[["render",v],["__file","base.vue"]]);export{B as default};