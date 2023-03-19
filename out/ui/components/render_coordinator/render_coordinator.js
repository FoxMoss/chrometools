class e extends Event{static eventName="renderqueueempty";constructor(){super(e.eventName)}}class r extends Event{static eventName="newframe";constructor(){super(r.eventName)}}let t;globalThis.__getRenderCoordinatorPendingFrames=function(){return n.pendingFramesCount()};class n extends EventTarget{static instance({forceNew:e=!1}={}){return t&&!e||(t=new n),t}static pendingFramesCount(){if(!t)throw new Error("No render coordinator instance found.");return t.pendingFramesCount()}observe=!1;recordStorageLimit=100;observeOnlyNamed=!0;#e=[];#r=[];#t=new WeakMap;#n=new WeakMap;#s=new WeakMap;#o=0;pendingFramesCount(){return this.#r.length}done(){return 0===this.#r.length?(this.#a("[Queue empty]"),Promise.resolve()):new Promise((e=>this.addEventListener("renderqueueempty",(()=>e()),{once:!0})))}async read(e,r){if("string"==typeof e){if(!r)throw new Error("Read called with label but no callback");return this.#i(r,"read",e)}return this.#i(e,"read","Unnamed read")}async write(e,r){if("string"==typeof e){if(!r)throw new Error("Write called with label but no callback");return this.#i(r,"write",e)}return this.#i(e,"write","Unnamed write")}takeRecords(){const e=[...this.#e];return this.#e.length=0,e}async scroll(e,r){if("string"==typeof e){if(!r)throw new Error("Scroll called with label but no callback");return this.#i(r,"read",e)}return this.#i(e,"read","Unnamed scroll")}#i(e,r,t=""){this.#s.set(e,`${"read"===r?"[Read]":"[Write]"}: ${t}`),0===this.#r.length&&this.#r.push({readers:[],writers:[]});const n=this.#r[0];if(!n)throw new Error("No frame available");switch(r){case"read":n.readers.push(e);break;case"write":n.writers.push(e);break;default:throw new Error(`Unknown action: ${r}`)}const s=new Promise(((r,t)=>{this.#t.set(e,r),this.#n.set(e,t)}));return this.#l(),s}async#d(e){const r=this.#t.get(e),t=this.#n.get(e);if(this.#t.delete(e),this.#n.delete(e),!r||!t)throw new Error("Unable to locate resolver or rejector");let n;try{n=await e.call(void 0)}catch(e){t.call(void 0,e)}r.call(void 0,n)}#l(){0!==this.#o||(this.#o=requestAnimationFrame((async()=>{if(!(this.#r.length>0))return this.dispatchEvent(new e),window.dispatchEvent(new e),this.#a("[Queue empty]"),void(this.#o=0);this.dispatchEvent(new r),this.#a("[New frame]");const t=this.#r.shift();if(!t)return;const n=[];for(const e of t.readers)this.#a(this.#s.get(e)),n.push(this.#d(e));try{await Promise.race([Promise.all(n),new Promise(((e,r)=>{window.setTimeout((()=>r(new Error("Readers took over 1500ms. Possible deadlock?"))),1500)}))])}catch(e){this.rejectAll(t.readers,e)}const s=[];for(const e of t.writers)this.#a(this.#s.get(e)),s.push(this.#d(e));try{await Promise.race([Promise.all(s),new Promise(((e,r)=>{window.setTimeout((()=>r(new Error("Writers took over 1500ms. Possible deadlock?"))),1500)}))])}catch(e){this.rejectAll(t.writers,e)}this.#o=0,this.#l()})))}rejectAll(e,r){for(const t of e){const e=this.#n.get(t);e&&(e.call(void 0,r),this.#t.delete(t),this.#n.delete(t))}}#a(e){if(!this.observe||!e)return;if(!(e.endsWith("Unnamed read")||e.endsWith("Unnamed write")||e.endsWith("Unnamed scroll"))||!this.observeOnlyNamed)for(this.#e.push({time:performance.now(),value:e});this.#e.length>this.recordStorageLimit;)this.#e.shift()}}var s=Object.freeze({__proto__:null,RenderCoordinatorQueueEmptyEvent:e,RenderCoordinatorNewFrameEvent:r,RenderCoordinator:n});export{s as RenderCoordinator};
