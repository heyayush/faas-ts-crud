!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("aws-sdk")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("dotenv")},function(e,t,n){"use strict";n.r(t),n.d(t,"handler",(function(){return E}));var r=n(0),o=n.n(r),i=n(1),u=n.n(i);function s(e,t,n,r,o,i,u){try{var s=e[i](u),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}var a=function(){var e,t=(e=function*(e,t){var{title:n}=e.body&&JSON.parse(e.body),r={TableName:process.env.PRODUCTS_TABLE_NAME||"",Item:{id:u.a.randomBytes(16).toString("hex"),title:n}};try{return yield t.put(r).promise(),{statusCode:200,body:JSON.stringify(r.Item)}}catch(e){return{statusCode:500,body:JSON.stringify(e)}}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){s(i,r,o,u,a,"next",e)}function a(e){s(i,r,o,u,a,"throw",e)}u(void 0)}))});return function(e,n){return t.apply(this,arguments)}}();function c(e,t,n,r,o,i,u){try{var s=e[i](u),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}var d=function(){var e,t=(e=function*(e,t,n){var r=n,o={TableName:process.env.PRODUCTS_TABLE_NAME||"",Key:{id:r}};try{return yield t.delete(o).promise(),{statusCode:200,body:JSON.stringify(o.Key)}}catch(e){return{statusCode:500,body:JSON.stringify(e)}}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){c(i,r,o,u,s,"next",e)}function s(e){c(i,r,o,u,s,"throw",e)}u(void 0)}))});return function(e,n,r){return t.apply(this,arguments)}}();function f(e,t,n,r,o,i,u){try{var s=e[i](u),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}var l=function(){var e,t=(e=function*(e,t,n){var r=n,o={TableName:process.env.PRODUCTS_TABLE_NAME||"",Key:{id:r}};try{var i=yield t.get(o).promise();return{statusCode:200,body:JSON.stringify(i.Item)}}catch(e){return{statusCode:500}}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){f(i,r,o,u,s,"next",e)}function s(e){f(i,r,o,u,s,"throw",e)}u(void 0)}))});return function(e,n,r){return t.apply(this,arguments)}}();function v(e,t,n,r,o,i,u){try{var s=e[i](u),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}var y=function(){var e,t=(e=function*(e,t){var n={TableName:process.env.PRODUCTS_TABLE_NAME||""};try{var r=yield t.scan(n).promise();return{statusCode:200,body:JSON.stringify(r.Items)}}catch(e){return{statusCode:500}}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){v(i,r,o,u,s,"next",e)}function s(e){v(i,r,o,u,s,"throw",e)}u(void 0)}))});return function(e,n){return t.apply(this,arguments)}}();function p(e,t,n,r,o,i,u){try{var s=e[i](u),a=s.value}catch(e){return void n(e)}s.done?t(a):Promise.resolve(a).then(r,o)}var h=function(){var e,t=(e=function*(e,t,n){var r=n,{title:o}=e.body&&JSON.parse(e.body),i={TableName:process.env.PRODUCTS_TABLE_NAME||"",Item:{id:r,title:o}};try{return yield t.put(i).promise(),{statusCode:200,body:JSON.stringify(i.Item)}}catch(e){return{statusCode:500}}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){p(i,r,o,u,s,"next",e)}function s(e){p(i,r,o,u,s,"throw",e)}u(void 0)}))});return function(e,n,r){return t.apply(this,arguments)}}(),m=process.env.ACTIVE_ENV||"production";console.log("Using environment config: '".concat(m,"'")),n(2).config({path:".env.".concat(m)});var b=new o.a.Config;b.update({accessKeyId:process.env.AYUSH_ACCESS_KEY_ID,secretAccessKey:process.env.AYUSH_SECRET_ACCESS_KEY,region:process.env.AYUSH_REGION});var T=new o.a.DynamoDB.DocumentClient(b),g=["https://heyayush.com","https://www.heyayush.com","http://heyayush.com","http://heyayush.com"],E=(e,t,n)=>{var r,o,i,u=e.headers.origin||e.headers.host;if(o=(e=>{if(e)return e.includes("localhost:")})(r=u),i=g.indexOf(r)>-1,!o&&!i)return console.error("Origin not allowed"),void n(null,{statusCode:401,body:"Unauthorized origin",headers:{"Content-Type":"text/plain"}});var s=e.path.replace(/\.netlify\/functions\/[^/]+/,"").split("/").filter(e=>e);switch(e.httpMethod){case"GET":return 0===s.length?y(e,T):1===s.length?l(e,T,s[0]):{statusCode:500,body:"too many segments in GET request"};case"POST":return a(e,T);case"PUT":return 1===s.length?h(e,T,s[0]):{statusCode:500,body:"invalid segments in POST request, must be /.netlify/functions/api/123456"};case"DELETE":return 1===s.length?d(e,T,s[0]):{statusCode:500,body:"invalid segments in DELETE request, must be /.netlify/functions/api/123456"};default:return{statusCode:500,body:"unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE"}}}}]));