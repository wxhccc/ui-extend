import{_,c,r,M as t,p as d,U as b,V as a,N as n}from"./framework-d784189f.js";const v=c({setup(){const e=r(),o=r({value:""});return{form:e,formData:o,btnKeys:["reset","submit"],submitHandler:()=>{console.log("submit")}}}});function y(e,o,m,u,k,D){const l=t("a-input"),s=t("a-form-item"),f=t("ue-form-btns"),i=t("a-form");return d(),b(i,{ref:"form",model:e.formData},{default:a(()=>[n(s,{label:"姓名:",required:"",prop:"value"},{default:a(()=>[n(l,{value:e.formData.value,"onUpdate:value":o[0]||(o[0]=p=>e.formData.value=p)},null,8,["value"])]),_:1}),n(s,null,{default:a(()=>[n(f,{form:e.form,"is-validate":"","btn-keys":e.btnKeys,submit:e.submitHandler},null,8,["form","btn-keys","submit"])]),_:1})]),_:1},8,["model"])}const w=_(v,[["render",y],["__file","with-form.vue"]]);export{w as default};
