import*as e from"./handlers/handlers.js";export{e as Handlers};import*as t from"./helpers/helpers.js";export{t as Helpers};import*as r from"../../core/common/common.js";import*as a from"../../core/platform/platform.js";import*as s from"./sdk_services/sdk_services.js";export{s as SDKServices};import*as n from"./types/types.js";export{n as Types};class o extends EventTarget{#e=[];#t=new Map;#r=[];#a=0;#s;constructor(){super(),this.#s=this.#n()}#n(){return r.Worker.WorkerWrapper.fromURL(new URL("./worker/worker_entrypoint.js",import.meta.url))}#o(e){this.#s.postMessage(e)}#c(e,t){this.#o({action:"PARSE",events:e,freshRecording:t})}#i(e,r){e.traceParsedData=r,this.#a++;let s=`Trace ${this.#a}`,n=null;if(e.traceParsedData&&(n=t.Trace.extractOriginFromTrace(e.traceParsedData.Meta.mainFrameURL),n)){const e=a.MapUtilities.getWithDefault(this.#t,n,(()=>1));s=`${n} (${e})`,this.#t.set(n,e+1)}this.#r.push(s),this.dispatchEvent(new c({type:1,data:"done"}))}async parse(e,t={},r=!1){const s={traceEvents:e,metadata:t,traceParsedData:null};await new Promise((t=>{this.#c(e,r),this.#s.onmessage=e=>{const r=e.data;switch(r.message){case"PARSE_COMPLETE":this.#i(s,e.data.data),this.#e.push(s),this.dispatchEvent(new c({type:0,data:"done"})),t();break;case"PARSE_ERROR":throw r.error;case"PARSE_UPDATE":{const{data:t}=e;this.dispatchEvent(new c({type:1,data:t}));break}default:a.assertNever(r,`Unexpected event from the trace worker ${r}`)}}}))}traceParsedData(e){return this.#e[e]?this.#e[e].traceParsedData:null}metadata(e){return this.#e[e]?this.#e[e].metadata:null}traceEvents(e){return this.#e[e]?this.#e[e].traceEvents:null}size(){return this.#e.length}deleteTraceByIndex(e){this.#e.splice(e,1),this.#r.splice(e,1)}getRecordingsAvailable(){return this.#r}reset(){this.#o({action:"RESET"})}}class c extends Event{data;static eventName="modelupdate";constructor(e){super(c.eventName),this.data=e}}class i extends Event{data;static eventName="traceparse";constructor(e,t={bubbles:!0}){super(i.eventName,t),this.data=e}}var d=Object.freeze({__proto__:null,Model:o,ModelUpdateEvent:c,isModelUpdateEventDataGlobal:function(e){return 0===e.type},isModelUpdateEventDataTrace:function(e){return 1===e.type},TraceParseEvent:i});export{d as TraceModel};