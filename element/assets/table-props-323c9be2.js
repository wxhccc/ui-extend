import{_ as c,c as i,M as t,p as m,q as p,N as n,V as u,t as _,Q as o}from"./framework-d784189f.js";const h=i({data(){return{columns:[{type:"selection"},{prop:"date",label:"日期",width:"180"},{prop:"name",label:"姓名",width:"180",formatter(e,s,a,d){return a+e.id+"号"}},{prop:"address",label:"地址"}],data:[{id:1,date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{id:21,date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{id:41,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{id:43,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"},{id:23,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"},{id:43,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"},{id:14,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}},methods:{selectionChange(e){console.log("selection-change",e)},toggleSelection(){this.$refs.table.clearSelection()}}}),b=o("br",null,null,-1),f=o("br",null,null,-1);function g(e,s,a,d,C,S){const l=t("el-button"),r=t("ue-data-table");return m(),p("div",null,[n(l,{onClick:e.toggleSelection},{default:u(()=>[_("取消选择")]),_:1},8,["onClick"]),b,f,n(r,{ref:"table",height:"240",columns:e.columns,data:e.data,onSelectionChange:e.selectionChange},null,8,["columns","data","onSelectionChange"])])}const k=c(h,[["render",g],["__file","table-props.vue"]]);export{k as default};
