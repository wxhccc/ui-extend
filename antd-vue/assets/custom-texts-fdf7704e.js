import{i as m}from"./app-0e5caad2.js";import{_ as g,c as f,r as _,b as h,S as k,M as D,p as o,U as x,V as y,Q as n,q as p,O as w,P as M,v as d}from"./framework-d784189f.js";const b=f({setup(){const t=_(!1),a=h({listData:[],total:0,tipsTexts:{dataEmpty:"no data",noMore:"我是有底线的"}}),e=async()=>{const[,s]=await m(i(),t);a.total=s.total,a.listData.push(...s.list)},i=()=>new Promise(s=>{const l=a.listData.length>10?[]:Array(8).fill(0).map(()=>({nick:Math.random().toString(33).substring(2),description:Math.random().toString(16).substring(2)}));window.setTimeout(()=>s({list:l,total:10}),2e3)});return e(),{loading:t,...k(a),getApiData:e}}}),v={class:"list",style:{margin:"0"}};function B(t,a,e,i,s,l){const u=D("ue-scroll-pane");return o(),x(u,{loading:t.loading,data:t.listData,total:t.total,load:t.getApiData,"tips-texts":t.tipsTexts,style:{height:"200px",border:"1px solid #aeaeae"}},{default:y(({data:r})=>[n("ul",v,[(o(!0),p(w,null,M(r,c=>(o(),p("li",{key:r.nick},[n("p",null,"昵称："+d(c.nick),1),n("p",null,"描述："+d(c.description),1)]))),128))])]),_:1},8,["loading","data","total","load","tips-texts"])}const $=g(b,[["render",B],["__file","custom-texts.vue"]]);export{$ as default};
