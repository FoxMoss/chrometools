import*as t from"../../../core/platform/platform.js";import*as e from"../types/types.js";import*as i from"../../../core/common/common.js";const r=t=>e.Timing.MicroSeconds(1e3*t),n=t=>e.Timing.MilliSeconds(1e3*t);function s(t){if(t<1e3)return 0;const e=t/1e3;if(e<1e3)return 1;return e/1e3<60?2:3}const o={style:"unit",unit:"millisecond",unitDisplay:"narrow"},a=t=>JSON.stringify(t),l=t=>new Intl.NumberFormat(navigator.language,t?JSON.parse(t):{}),c=new Map;t.MapUtilities.getWithDefault(c,a({style:"decimal"}),l),t.MapUtilities.getWithDefault(c,a(o),l),t.MapUtilities.getWithDefault(c,a({...o,unit:"second"}),l),t.MapUtilities.getWithDefault(c,a({...o,unit:"minute"}),l);var u=Object.freeze({__proto__:null,millisecondsToMicroseconds:r,secondsToMilliseconds:n,secondsToMicroseconds:t=>r(n(t)),detectBestTimeUnit:s,formatMicrosecondsTime:function(e,i={}){i.format||(i.format=s(e));const r=e/1e3,n=r/1e3,u={...o,...i};switch(i.format){case 0:return`${t.MapUtilities.getWithDefault(c,a({style:"decimal"}),l).format(e)}μs`;case 1:return t.MapUtilities.getWithDefault(c,a(u),l).format(r);case 2:return t.MapUtilities.getWithDefault(c,a({...u,unit:"second"}),l).format(n);default:{const e=t.MapUtilities.getWithDefault(c,a({...u,unit:"minute"}),l),i=t.MapUtilities.getWithDefault(c,a({...u,unit:"second"}),l),r=n/60,[s,o,f]=e.formatToParts(r);let m=0;return o&&f&&(m=Math.round(60*Number(`0.${f.value}`))),`${e.format(Number(s.value))} ${i.format(m)}`}}}});var f=Object.freeze({__proto__:null,extractOriginFromTrace:function(t){const e=i.ParsedURL.ParsedURL.fromString(t);return e?e.host.startsWith("www.")?e.host.slice(4):e.host:null},addEventToProcessThread:function(t,e){const{tid:i,pid:r}=t;let n=e.get(r);n||(n=new Map);let s=n.get(i);s||(s=[]),s.push(t),n.set(t.tid,s),e.set(t.pid,n)},sortTraceEventsInPlace:function(t){t.sort(((t,e)=>{const i=t.ts,r=e.ts;if(i<r)return-1;if(i>r)return 1;const n=i+(t.dur??0),s=r+(e.dur??0);return n>s?-1:n<s?1:0}))},getNavigationForTraceEvent:function(e,i,r){const n=r.get(i);if(!n||""===i)return null;const s=t.ArrayUtilities.nearestIndexFromEnd(n,(t=>t.ts<=e.ts));return null===s?null:n[s]}});export{u as Timing,f as Trace};
