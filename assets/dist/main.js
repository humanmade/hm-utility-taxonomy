!function(e,t){for(var n in t)e[n]=t[n]}(this,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=21)}([function(e,t,n){e.exports=n(16)()},function(e,t){!function(){e.exports=this.React}()},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.apply(this,arguments)}e.exports=n},function(e,t,n){var r=n(15);e.exports=function(e,t){if(null==e)return{};var n,o,i=r(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}},function(e,t,n){var r=n(18),o=n(19),i=n(20);e.exports=function(e,t){return r(e)||o(e,t)||i()}},,function(e,t){!function(){e.exports=this.wp.data}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){!function(){e.exports=this.wp.apiFetch}()},function(e,t){!function(){e.exports=this.wp.domReady}()},function(e,t){!function(){e.exports=this.wp.plugins}()},function(e,t){!function(){e.exports=this.wp.compose}()},function(e,t){!function(){e.exports=this.wp.editPost}()},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){!function(){e.exports=this.wp.url}()},function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}},function(e,t,n){"use strict";var r=n(17);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,s){if(s!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n.n(r),i=n(1),s=n(9),a=n.n(s),c=n(10),u=n(3),f=n.n(u),l=n(0),p=n.n(l),d=n(11),y=n(6),m=n(12);var b=n(13),g=n.n(b);var h=n(4),O=n.n(h),v=n(7),x=n(8),P=n.n(x),j=n(14);function w(e){var t=e.className,n=e.defaults,r=e.isPostDirty,s=e.isPostNew,a=e.onChange,c=e.selected,u=e.term,l=e.type,p=f()(e,["className","defaults","isPostDirty","isPostNew","onChange","selected","term","type"]),d="toggle"===l?v.ToggleControl:v.CheckboxControl,y=function(){if(!u)return!1;var e=u.id,t=u.slug;return s?n.indexOf(t)>=0:c.indexOf(e)>=0},m=Object(i.useState)(y),b=O()(m,2),g=b[0],h=b[1];return Object(i.useEffect)((function(){u&&h(y)}),[u]),Object(i.useEffect)((function(){u&&s&&r&&a(g,u.id)}),[g,u,r,s]),Object(i.createElement)("div",{className:t},Object(i.createElement)(d,o()({},p,{checked:g,disabled:!u,label:u?u.name:"Loading…",onChange:function(){h(!g),u&&a(!g,u.id)}})))}w.propTypes={className:p.a.string.isRequired,isPostDirty:p.a.bool.isRequired,isPostNew:p.a.bool.isRequired,onChange:p.a.func.isRequired,selected:p.a.arrayOf(p.a.oneOfType([p.a.number,p.a.string])).isRequired,type:p.a.oneOf(["checkbox","toggle"]).isRequired};var T=function(e){function t(t){var n=t.label,r=t.taxonomy,s=t.value,a=f()(t,["label","taxonomy","value"]),c=Object(i.useState)(null),u=O()(c,2),l=u[0],p=u[1];return Object(i.useEffect)((function(){(function(e,t,n){return P()({method:"POST",path:"/wp/v2/".concat(e),data:{name:t,slug:n}})})(r,n,s).catch((function(e){return"term_exists"!==e.code?Promise.reject(e):function(e,t){return P()({path:Object(j.addQueryArgs)("/wp/v2/".concat(e),{slug:t,_fields:"id,name,slug"})})}(r,s).then((function(e){e.length&&p(e[0])}))})).then((function(e){if(e){var t=e.id,n=e.name,r=e.slug;p({id:t,name:n,slug:r})}}))}),[r,s]),Object(i.createElement)(e,o()({term:l},a))}return t.propTypes={taxonomy:p.a.string.isRequired,value:p.a.string.isRequired},t}(w);function R(e){var t=e.className,n=e.getPostTerms,r=e.id,s=e.options,a=e.title,c=e.updateTerms,u=f()(e,["className","getPostTerms","id","options","title","updateTerms"]);return Object(i.createElement)(m.PluginDocumentSettingPanel,{className:t,name:r,title:a},s.map((function(e,r){return Object(i.createElement)(T,o()({},u,e,{key:"".concat(t,"-").concat(e.value,"-").concat(r),className:"".concat(t,"__choice"),onChange:c,selected:n(),type:s.length>1?"checkbox":"toggle"}))})))}R.defaultProps={defaults:[]},R.propTypes={className:p.a.string.isRequired,defaults:p.a.arrayOf(p.a.string),id:p.a.string.isRequired,options:p.a.arrayOf(p.a.shape({label:p.a.string.isRequired,value:p.a.string.isRequired})).isRequired,taxonomy:p.a.string.isRequired,title:p.a.string.isRequired,getPostTerms:p.a.func.isRequired,hasAssignAction:p.a.bool.isRequired,isPostDirty:p.a.bool.isRequired,isPostNew:p.a.bool.isRequired,updateTerms:p.a.func.isRequired};var _=Object(d.compose)([Object(y.withSelect)((function(e,t){var n=t.taxonomy,r=e("core/editor"),o=r.getCurrentPost,i=r.getEditedPostAttribute,s=r.isEditedPostDirty,a=r.isEditedPostNew,c=o()._links;return{isPostDirty:s(),isPostNew:a(),getPostTerms:function(){return i(n)},hasAssignAction:"wp:action-assign-"+n in c,postStatus:i("status")}})),Object(y.withDispatch)((function(e,t){var n=e("core/editor").editPost,r=t.getPostTerms,o=t.taxonomy,i=r();return{updateTerms:function(e,t){var r=e?i.concat(t):i.filter((function(e){return e!==t}));n(g()({},o,r))}}}))])(R),q=hmUtilities,E=q.options,S=q.taxonomy;a()((function(){E.forEach((function(e){var t=e.id,n=e.icon,r=void 0===n?null:n,s="".concat(S,"-").concat(t),a="".concat(S,"__").concat(t);Object(c.registerPlugin)(s,{icon:r,render:function(){return Object(i.createElement)(_,o()({className:a,taxonomy:S},e))}})}))}))}]));