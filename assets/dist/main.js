!function(t,e){for(var r in e)t[r]=e[r];e.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})}(this,(()=>{var t={228:t=>{t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},858:t=>{t.exports=function(t){if(Array.isArray(t))return t}},926:t=>{function e(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}t.exports=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=t.apply(r,n);function c(t){e(a,o,i,c,u,"next",t)}function u(t){e(a,o,i,c,u,"throw",t)}c(void 0)}))}}},713:t=>{t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},154:t=>{function e(){return t.exports=e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},e.apply(this,arguments)}t.exports=e},884:t=>{t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}},521:t=>{t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},479:(t,e,r)=>{var n=r(316);t.exports=function(t,e){if(null==t)return{};var r,o,i=n(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(o=0;o<a.length;o++)r=a[o],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}},316:t=>{t.exports=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}},38:(t,e,r)=>{var n=r(858),o=r(884),i=r(379),a=r(521);t.exports=function(t,e){return n(t)||o(t,e)||i(t,e)||a()}},379:(t,e,r)=>{var n=r(228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},757:(t,e,r)=>{t.exports=r(666)},825:(t,e,r)=>{"use strict";r.r(e);var n=r(154),o=r.n(n),i=r(804),a=r(364),c=r.n(a),u=r(601),s=r(697),l=r.n(s),f=r(390),p=r(197),h=r(219),y=r(38),d=r.n(y),v=r(479),m=r.n(v),g=r(587),x=r(757),b=r.n(x),w=r(926),O=r.n(w),E=r(839),_=r.n(E),P=r(696);function j(t,e){return _()({path:(0,P.addQueryArgs)("/wp/v2/".concat(t),{slug:e,_fields:"id,name,slug"})})}function L(t){var e=t.className,r=t.onChange,n=t.selected,a=t.term,c=t.type,u=m()(t,["className","onChange","selected","term","type"]),s="toggle"===c?g.ToggleControl:g.CheckboxControl,l=(0,i.useCallback)((function(){return!!a&&n.indexOf(a.id)>=0}),[n,a]),f=(0,i.useState)(l),p=d()(f,2),h=p[0],y=p[1];return(0,i.useEffect)((function(){a&&y(l)}),[l,a]),(0,i.createElement)("div",{className:e},(0,i.createElement)(s,o()({},u,{checked:h,disabled:!a,label:a?a.name:"Loading…",onChange:function(){y(!h),a&&r(!h,a.id)}})))}L.propTypes={className:l().string.isRequired,onChange:l().func.isRequired,selected:l().arrayOf(l().oneOfType([l().number,l().string])).isRequired,type:l().oneOf(["checkbox","toggle"]).isRequired};const T=function(t){function e(e){var r=e.label,n=e.taxonomy,a=e.value,c=m()(e,["label","taxonomy","value"]),u=(0,i.useState)(null),s=d()(u,2),l=s[0],f=s[1];return(0,i.useEffect)((function(){(function(t,e,r){return _()({method:"POST",path:"/wp/v2/".concat(t),data:{name:e,slug:r}})})(n,r,a).catch(function(){var t=O()(b().mark((function t(e){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:if("term_exists"===t.sent.code){t.next=5;break}return t.abrupt("return",Promise.reject(e));case 5:return t.abrupt("return",j(n,a).then((function(t){t.length&&f(t[0])})));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){if(t){var e=t.id,r=t.name,n=t.slug;f({id:e,name:r,slug:n})}}))}),[r,n,a]),(0,i.createElement)(t,o()({term:l},c))}return e.propTypes={taxonomy:l().string.isRequired,value:l().string.isRequired},e}(L);var S=r(713),R=r.n(S);function k(t){var e=t.className,r=t.getPostTerms,n=t.id,a=t.options,c=t.taxonomy,u=t.title,s=t.updateTerms;return(0,i.createElement)(h.PluginDocumentSettingPanel,{className:e,name:n,title:u},a.map((function(t,n){return(0,i.createElement)(T,o()({},t,{key:"".concat(e,"-").concat(t.value,"-").concat(n),className:"".concat(e,"__choice"),selected:r(),taxonomy:c,type:a.length>1?"checkbox":"toggle",onChange:s}))})))}k.propTypes={className:l().string.isRequired,id:l().string.isRequired,options:l().arrayOf(l().shape({label:l().string.isRequired,value:l().string.isRequired})).isRequired,taxonomy:l().string.isRequired,title:l().string.isRequired,getPostTerms:l().func.isRequired,hasAssignAction:l().bool.isRequired,updateTerms:l().func.isRequired};const N=(0,f.compose)([(0,p.withSelect)((function(t,e){var r=e.taxonomy,n=t("core/editor"),o=n.getCurrentPost,i=n.getEditedPostAttribute,a=o()._links;return{getPostTerms:function(){return i(r)},hasAssignAction:"wp:action-assign-"+r in a,postStatus:i("status")}})),(0,p.withDispatch)((function(t,e){var r=t("core/editor").editPost,n=e.getPostTerms,o=e.taxonomy,i=n();return{updateTerms:function(t,e){var n=t?i.concat(e):i.filter((function(t){return t!==e}));r(R()({},o,n))}}}))])(k);var q=hmUtilities,A=q.options,C=q.taxonomy;c()((function(){A.forEach((function(t){var e=t.id,r=t.icon,n=void 0===r?null:r,a="".concat(C,"-").concat(e),c="".concat(C,"__").concat(e);(0,u.registerPlugin)(a,{icon:n,render:function(){return(0,i.createElement)(N,o()({className:c,taxonomy:C},t))}})}))}))},703:(t,e,r)=>{"use strict";var n=r(414);function o(){}function i(){}i.resetWarningCache=o,t.exports=function(){function t(t,e,r,o,i,a){if(a!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function e(){return t}t.isRequired=t;var r={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},697:(t,e,r)=>{t.exports=r(703)()},414:t=>{"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new T(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return R()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=P(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?y:p,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",p="suspendedYield",h="executing",y="completed",d={};function v(){}function m(){}function g(){}var x={};x[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(S([])));w&&w!==r&&n.call(w,i)&&(x=w);var O=g.prototype=v.prototype=Object.create(x);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,i,a,c){var u=l(t[o],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function P(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,P(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:R}}function R(){return{value:e,done:!0}}return m.prototype=O.constructor=g,g.constructor=m,m.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},E(_.prototype),_.prototype[a]=function(){return this},t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(O),u(O,c,"Generator"),O[i]=function(){return this},O.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}},804:t=>{t.exports=function(){return this.React}()},839:t=>{t.exports=function(){return this.wp.apiFetch}()},587:t=>{t.exports=function(){return this.wp.components}()},390:t=>{t.exports=function(){return this.wp.compose}()},197:t=>{t.exports=function(){return this.wp.data}()},364:t=>{t.exports=function(){return this.wp.domReady}()},219:t=>{t.exports=function(){return this.wp.editPost}()},601:t=>{t.exports=function(){return this.wp.plugins}()},696:t=>{t.exports=function(){return this.wp.url}()}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}return r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r(825)})());