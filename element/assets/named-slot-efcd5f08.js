import{_ as i,c,j as s,M as l,p as m,U as f,V as a,N as t,W as p}from"./framework-d784189f.js";const V={props:{icon:null},setup(){return()=>s("div",{style:{color:"red",padding:"10px 12px"}},"暂无数据")}},_=c({data(){return{inputValue:"",inputField:{component:"AInput",slots:{addonAfter:()=>s("AButton",{onClick:this.searchHandler},"搜索")}},selectValue:void 0,selectField:{component:"ASelect",props:{style:{width:"120px"}},data:[],slots:{notFoundContent:()=>s(V)}}}},methods:{searchHandler(){console.log(this.inputValue)}}});function h(e,o,C,F,g,w){const d=l("ue-common-field"),u=l("a-col"),r=l("a-row");return m(),f(r,{gutter:20},{default:a(()=>[t(u,{span:8},{default:a(()=>[t(d,p(e.inputField,{modelValue:e.inputValue,"onUpdate:modelValue":o[0]||(o[0]=n=>e.inputValue=n)}),null,16,["modelValue"])]),_:1}),t(u,{span:12,offset:4},{default:a(()=>[t(d,p(e.selectField,{modelValue:e.selectValue,"onUpdate:modelValue":o[1]||(o[1]=n=>e.selectValue=n)}),null,16,["modelValue"])]),_:1})]),_:1})}const $=i(_,[["render",h],["__file","named-slot.vue"]]);export{$ as default};
