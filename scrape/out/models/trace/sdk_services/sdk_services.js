import*as e from"../../../core/sdk/sdk.js";const t=new Map,n=new Map;async function r(n,r){const a=t.get(n)?.get(r);if(void 0!==a)return a;const o=e.TargetManager.TargetManager.instance().mainFrameTarget()?.model(e.DOMModel.DOMModel);if(!o)return null;const c=(await o.pushNodesByBackendIdsToFrontend(new Set([r])))?.get(r)||null,s=t.get(n)||new Map;return s.set(r,c),t.set(n,s),c}var a=Object.freeze({__proto__:null,_TEST_clearCache:function(){t.clear(),n.clear()},forNodeId:r,forMultipleNodeIds:async function(t,r){const a=n.get(t)?.get(r);if(a)return a;const o=e.TargetManager.TargetManager.instance().mainFrameTarget()?.model(e.DOMModel.DOMModel);if(!o)return new Map;const c=await o.pushNodesByBackendIdsToFrontend(r)||new Map,s=n.get(t)||new Map;return s.set(r,c),n.set(t,s),c}});const o=new Map,c=new Map;var s=Object.freeze({__proto__:null,_TEST_clearCache:function(){o.clear(),c.clear()},sourcesForLayoutShift:async function(e,t){const n=o.get(e)?.get(t);if(n)return n;const a=t.args.data?.impacted_nodes;if(!a)return[];const c=[];await Promise.all(a.map((async t=>{const n=await r(e,t.node_id);n&&c.push({previousRect:new DOMRect(t.old_rect[0],t.old_rect[1],t.old_rect[2],t.old_rect[3]),currentRect:new DOMRect(t.new_rect[0],t.new_rect[1],t.new_rect[2],t.new_rect[3]),node:n})})));const s=o.get(e)||new Map;return s.set(t,c),o.set(e,s),c},normalizedImpactedNodesForLayoutShift:async function(t,n){const r=c.get(t)?.get(n);if(r)return r;const a=n.args?.data?.impacted_nodes;if(!a)return[];let o=null;const s=e.TargetManager.TargetManager.instance().mainFrameTarget(),l=await(s?.runtimeAgent().invoke_evaluate({expression:"window.devicePixelRatio"}));if("number"===l?.result.type&&(o=l?.result.value??null),!o)return a;const i=[];for(const e of a){const t={...e};for(let n=0;n<e.old_rect.length;n++)t.old_rect[n]/=o;for(let n=0;n<e.new_rect.length;n++)t.new_rect[n]/=o;i.push(t)}const d=c.get(t)||new Map;return d.set(n,i),c.set(t,d),i}});export{a as DOMNodeLookup,s as LayoutShifts};