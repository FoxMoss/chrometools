import*as t from"../../third_party/lit/lit.js";export{Decorators,Directive,Directives,LitElement,noChange,nothing,render,svg}from"../../third_party/lit/lit.js";function e(t,...e){const r=[],l=[];let i="";for(let o=0;o<e.length;o++){const s=e[o];n(s)?(i+=t[o]+s.value,r.push(!1)):(i+=t[o],l.push(i),i="",r.push(!0))}return l.push(i+t[e.length]),l.raw=[...l],{strings:l,valueMap:r}}function n(t){return"object"==typeof t&&null!==t&&"$$static$$"in t}const r=new WeakMap;function l(n,...i){const o=r.get(n);if(o){const e=i.filter(((t,e)=>!!o&&o.valueMap[e]));return t.html(o.strings,...e)}return r.set(n,e(n,...i)),l(n,...i)}var i=Object.freeze({__proto__:null,flattenTemplate:e,html:function(e,...r){return r.some((t=>n(t)))?l(e,...r):t.html(e,...r)},literal:function(t){return{value:t[0],$$static$$:!0}}});const{html:o,literal:s,flattenTemplate:a}=i;export{a as flattenTemplate,o as html,s as literal};
