import{c as i,r as d,_ as m,M as r,p as t,q as c,Q as s,t as v,N as p,U as _,W as f}from"./framework-d784189f.js";const k=i({setup(){return{props:d({duration:10,interval:.01})}}}),$={style:{}},B=s("span",null,"间隔时间(s): ",-1);function F(e,o,b,y,N,g){const a=r("a-input-number"),l=r("a-slider"),u=r("ue-ticker");return t(),c("div",null,[s("p",null,[v("总时间(s): "),p(a,{value:e.props.duration,"onUpdate:value":o[0]||(o[0]=n=>e.props.duration=n),valueModifiers:{number:!0},min:0},null,8,["value"])]),s("p",$,[B,p(l,{style:{display:"inline-block","margin-left":"20px",width:"80%","vertical-align":"middle"},min:0,step:.01,max:e.props.duration/10,value:e.props.interval,"onUpdate:value":o[1]||(o[1]=n=>e.props.interval=n)},null,8,["step","max","value"])]),(t(),_(u,f(e.props,{key:`${e.props.duration}-${e.props.interval}`}),null,16))])}const U=m(k,[["render",F],["__file","props-control.vue"]]);export{U as default};
