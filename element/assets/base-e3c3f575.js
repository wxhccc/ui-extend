import{h,_ as y,k as V,b as _}from"./app-59cd0345.js";import{_ as k,c as w,r as i,M as D,p as S,q as $,t as z,v as M,N}from"./framework-d784189f.js";const P=w({setup(){const e=i(!1),t=i([]),s=i({rows:[],total:0}),r=[{prop:"id",selection:"checkbox"},{prop:"id",label:"Id"},{prop:"type",label:"类型"},{prop:"title",label:"标题"},{prop:"description",label:"描述"}],c={size:"small",labelWidth:"80px",items:[h("标题","title"),y("类型","type",[{value:"文章",label:"文章"},{value:"帖子",label:"帖子"}]),V("活动时间","date","dateRange",{initValue:[]})]},d=async a=>{console.log(a);const[p,l]=await _(n(a),e);s.value=l},n=a=>new Promise(p=>{const{current:l,size:u,title:g,description:m,type:f}=a,b=Array(u||10).fill(0).map((C,v)=>{const o=Math.random();return{id:(l-1)*u+v+1,type:f||(o>.5?"文章":"帖子"),title:(g||"")+o.toString(26).substring(2),description:(m||"")+o.toString(34).substring(2)+o.toString(32)}});window.setTimeout(()=>{p({rows:b,total:200})},1500)});return{loading:e,columns:r,searchForms:c,selectionValue:t,pagedData:s,getPagedData:d}}});function B(e,t,s,r,c,d){const n=D("ue-common-list-page");return S(),$("div",null,[z(" selection value: "+M(e.selectionValue)+" ",1),N(n,{"selection-value":e.selectionValue,"onUpdate:selectionValue":t[0]||(t[0]=a=>e.selectionValue=a),loading:e.loading,"init-data":{pageSize:10},"created-auto-send":"","flex-layout":!1,columns:e.columns,"paged-data":e.pagedData,"search-forms":e.searchForms,"get-paged-data":e.getPagedData},null,8,["selection-value","loading","columns","paged-data","search-forms","get-paged-data"])])}const T=k(P,[["render",B],["__file","base.vue"]]);export{T as default};