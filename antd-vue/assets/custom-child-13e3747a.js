import{_ as F,c as f,j as u,r as p,M as t,p as g,U as C,V as n,N as a,Q as c,v as m,W as V}from"./framework-d784189f.js";import{E as N}from"./app-0e5caad2.js";const S=f({props:{label:String,value:[String,Number],index:Number},setup(e){return()=>u(N,e,{default:()=>u("span",{style:{color:"red"}},e.label+e.index)})}}),E=f({setup(){const e=p(""),l=p(1);return{selectValue:e,radioValue:l,selectField:{component:"ElSelect",data:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],childComponent:S},radioField:{component:"ElRadioGroup",data:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"}],dataItemRenader(s,r){return u("span",{style:{color:"red"}},[s.label+r])}}}}});function $(e,l,b,v,s,r){const d=t("ue-common-field"),i=t("el-col"),_=t("el-row");return g(),C(_,{gutter:20},{default:n(()=>[a(i,{span:12},{default:n(()=>[c("p",null,"Select-----value: "+m(e.selectValue),1),a(d,V(e.selectField,{modelValue:e.selectValue,"onUpdate:modelValue":l[0]||(l[0]=o=>e.selectValue=o)}),null,16,["modelValue"])]),_:1}),a(i,{span:12},{default:n(()=>[c("p",null,"RadioGroup-----value: "+m(e.radioValue),1),a(d,V(e.radioField,{modelValue:e.radioValue,"onUpdate:modelValue":l[1]||(l[1]=o=>e.radioValue=o)}),null,16,["modelValue"])]),_:1})]),_:1})}const B=F(E,[["render",$],["__file","custom-child.vue"]]);export{B as default};
