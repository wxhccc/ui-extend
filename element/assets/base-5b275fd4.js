import{i as u}from"./app-59cd0345.js";import{_ as m,c as f,r as s,M as _,p as b,U as w}from"./framework-d784189f.js";const D=f({setup(){const t=s(!1),d=s([{dataIndex:"id",title:"Id"},{dataIndex:"title",title:"标题"},{dataIndex:"description",title:"描述"}]),o=s({rows:[],total:0}),i=async e=>{console.log(e);const[,a]=await u(r(e),t);o.value=a},r=e=>new Promise(a=>{const{current:l,size:c}=e,g=Array(c||10).fill(0).map((I,p)=>{const n=Math.random();return{id:(l-1)*c+p+1,title:n.toString(26).substring(2),description:n.toString(34).substring(2)+n.toString(32)}});window.setTimeout(()=>{a({rows:g,total:200})},1500)});return{loading:t,columns:d,pagedData:o,getPagedData:i}}});function h(t,d,o,i,r,e){const a=_("ue-paged-table");return b(),w(a,{loading:t.loading,columns:t.columns,"paged-data":t.pagedData,"get-paged-data":t.getPagedData,height:"300","init-data":{pageSize:10},"created-auto-send":""},null,8,["loading","columns","paged-data","get-paged-data"])}const k=m(D,[["render",h],["__file","base.vue"]]);export{k as default};
