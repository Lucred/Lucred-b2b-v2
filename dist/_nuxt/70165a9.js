(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{624:function(t,e,r){var content=r(657);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("5451fb11",content,!0,{sourceMap:!1})},625:function(t,e,r){"use strict";var n=r(1),o=(r(47),r(24),r(207),r(7),r(85),r(8),r(6),r(9),r(10),r(3)),l=r(80),c=r(93);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(l.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},656:function(t,e,r){"use strict";r(624)},657:function(t,e,r){var n=r(11)(!1);n.push([t.i,'#login[data-v-81515ba4]{height:50%;width:100%;position:absolute;top:0;left:0;content:"";z-index:0}',""]),t.exports=n},703:function(t,e,r){"use strict";r.r(e);var n={layout:"default",data:function(){return{loading:!1,model:{email:"",password:""}}},methods:{login:function(){var t=this;this.loading=!0;var e={emailAddress:this.model.email.toLowerCase(),password:this.model.password};this.$axios.post("hr/login",e).then((function(e){var data=e.data;if(t.loading=!1,200===(null==data?void 0:data.statusCode))localStorage.setItem("b2b_token",JSON.stringify(data.data.token)),localStorage.setItem("b2b_data",JSON.stringify(data.data)),t.$store.commit("setB2B",data.data),t.$router.push("/dashboard"),t.$store.commit("snackbar/show",{text:data.message,icon:"success"});else if("ERROR"===(null==data?void 0:data.state))return void t.$store.commit("snackbar/show",{text:data.message,icon:"error"});t.loading=!1})).catch((function(e){t.loading=!1;var r=e.response;t.$store.commit("snackbar/show",{text:r.data.message,icon:"error"})}))},handleLogout:function(){localStorage.removeItem("b2b_token"),localStorage.removeItem("b2b_data")}},mounted:function(){this.handleLogout()}},o=(r(656),r(22)),l=r(30),c=r.n(l),d=r(462),f=r(212),h=r(198),m=r(63),v=r(463),w=r(472),_=r(625),y=r(464),O=r(474),x=r(470),V=r(56),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"primary",attrs:{id:"login"}},[n("v-main",[n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"align-center":"","justify-center":""}},[n("v-flex",{attrs:{xs12:"",sm8:"",md4:"",lg4:""}},[n("v-card",{staticClass:"elevation-1 pa-3"},[n("v-card-text",[n("div",{staticClass:"layout column align-center mb-9"},[n("img",{attrs:{src:r(263),alt:"Lucred B2B",width:"200"}})]),t._v(" "),n("v-form",[n("v-text-field",{attrs:{"append-icon":"mail",name:"email",label:"Email",type:"text"},model:{value:t.model.email,callback:function(e){t.$set(t.model,"email",e)},expression:"model.email"}}),t._v(" "),n("v-text-field",{attrs:{"append-icon":"lock",name:"password",label:"Password",id:"password",type:"password"},model:{value:t.model.password,callback:function(e){t.$set(t.model,"password",e)},expression:"model.password"}})],1)],1),t._v(" "),n("v-card-actions",[n("h5",{staticClass:"font-semibold text-muted"},[t._v("\n                Don't have an account?\n                "),n("router-link",{staticClass:"font-bold text-primary",attrs:{to:"/signup"}},[t._v("Sign Up")])],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"#66AC4C",loading:t.loading},on:{click:t.login}},[t._v("Login")])],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"81515ba4",null);e.default=component.exports;c()(component,{VApp:d.a,VBtn:f.a,VCard:h.a,VCardActions:m.a,VCardText:m.b,VContainer:v.a,VFlex:w.a,VForm:_.a,VLayout:y.a,VMain:O.a,VSpacer:x.a,VTextField:V.a})}}]);