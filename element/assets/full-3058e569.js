import{i as V}from"./app-59cd0345.js";import{_ as h,c as S,r as w,b as k,S as y,M as i,p as C,q as I,N as a,V as d,t as m,Q as _,v}from"./framework-d784189f.js";const N=S({setup(){const e=w(!1),t=k({pagedData:{},searchData:{title:"",description:""},selectionValue:[],tempData:{title:"",description:""},columns:[{dataIndex:"id",title:"Id"},{dataIndex:"title",title:"标题",sortable:"custom"},{dataIndex:"description",title:"描述"}]}),g=()=>{Object.assign(t.searchData,t.tempData)},f=async l=>{console.log(l);const[,n]=await V(D(l),e);t.pagedData=n},D=l=>new Promise(n=>{const{current:s,size:r,title:u,description:p}=l,o=Array(r||10).fill(0).map((M,b)=>{const c=Math.random();return{id:(s-1)*r+b+1,title:u+c.toString(26).substring(2),description:p+c.toString(34).substring(2)+c.toString(32)}});window.setTimeout(()=>{n({rows:o,total:200})},1500)});return{loading:e,...y(t),searchSend:g,getPagedData:f}}}),$=_("br",null,null,-1);function B(e,t,g,f,D,l){const n=i("a-input"),s=i("a-form-item"),r=i("a-button"),u=i("a-form"),p=i("ue-paged-table");return C(),I("div",null,[a(u,{layout:"inline"},{default:d(()=>[a(s,{label:"标题"},{default:d(()=>[a(n,{value:e.tempData.title,"onUpdate:value":t[0]||(t[0]=o=>e.tempData.title=o),placeholder:"请输入标题搜索"},null,8,["value"])]),_:1}),a(s,{label:"描述"},{default:d(()=>[a(n,{value:e.tempData.description,"onUpdate:value":t[1]||(t[1]=o=>e.tempData.description=o),placeholder:"请输入描述，点击按钮搜索"},null,8,["value"])]),_:1}),a(s,{label:""},{default:d(()=>[a(r,{loading:e.loading,onClick:e.searchSend},{default:d(()=>[m("搜索")]),_:1},8,["loading","onClick"])]),_:1})]),_:1}),_("p",null,[m("extra-form: "+v(e.searchData),1),$,m(" selection-value: "+v(e.selectionValue),1)]),a(p,{"selection-value":e.selectionValue,"onUpdate:selectionValue":t[2]||(t[2]=o=>e.selectionValue=o),"row-key":"id",loading:e.loading,columns:e.columns,"paged-data":e.pagedData,"extra-model":e.searchData,"get-paged-data":e.getPagedData,height:"300","init-data":{pageSize:10},"created-auto-send":""},null,8,["selection-value","loading","columns","paged-data","extra-model","get-paged-data"])])}const z=h(N,[["render",B],["__file","full.vue"]]);export{z as default};