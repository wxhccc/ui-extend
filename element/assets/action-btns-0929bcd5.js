import{_ as r,c as p,M as n,p as u,q as m,N as s,Q as o}from"./framework-d784189f.js";const b=p({data(){return{editable:!0,tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}},computed:{columns(){const e=[{props:{size:"small"},text:"view",click(t,a,l){console.log(t,a,l)}}].concat(this.editable?[{btype:"primary",text:t=>t.isEdit?"save":"edit",click:this.editHandle}]:[]);return[{prop:"date",label:"日期",width:"180"},{prop:"name",label:"姓名"},...this.editable?[{prop:"address",label:"地址"}]:[],{action:e,columnKey:"action",minWidth:"100",label:"操作",align:"center"}]}},methods:{editHandle(e,t){this.$set(e,"isEdit",!e.isEdit)}}}),_=o("br",null,null,-1),h=o("br",null,null,-1);function f(e,t,a,l,v,V){const d=n("el-switch"),i=n("ue-data-table");return u(),m("div",null,[s(d,{modelValue:e.editable,"onUpdate:modelValue":t[0]||(t[0]=c=>e.editable=c),"active-text":"有修改权限","inactive-text":"无修改权限"},null,8,["modelValue"]),_,h,s(i,{columns:e.columns,"set-empty-cell":"",data:e.tableData},null,8,["columns","data"])])}const k=r(b,[["render",f],["__file","action-btns.vue"]]);export{k as default};
