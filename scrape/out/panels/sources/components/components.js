import*as e from"../../../core/host/host.js";import*as t from"../../../core/i18n/i18n.js";import*as n from"../../../core/platform/platform.js";import{assertNotNullOrUndefined as o}from"../../../core/platform/platform.js";import*as i from"../../../ui/components/helpers/helpers.js";import*as a from"../../../ui/components/icon_button/icon_button.js";import*as r from"../../../ui/components/render_coordinator/render_coordinator.js";import*as s from"../../../ui/legacy/legacy.js";import*as d from"../../../ui/lit-html/lit-html.js";import*as c from"../../../models/persistence/persistence.js";import*as l from"../../../models/workspace/workspace.js";import*as h from"../../../ui/components/buttons/buttons.js";const p=new CSSStyleSheet;p.replaceSync(':host{flex:auto;display:flex;flex-direction:column}.code-snippet{width:100%;font-family:var(--source-code-font-family);font-size:var(--source-code-font-size);color:var(--color-text-secondary);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;flex-shrink:100;cursor:pointer}.code-snippet:hover{color:var(--color-text-primary);text-decoration:underline}input{height:12px;width:12px;flex-shrink:0;margin:3px 0}details{border-top:1px solid var(--color-details-hairline)}details:not(.active){background-color:var(--color-background-elevation-1);opacity:30%}details > summary{height:18px;list-style:none;display:flex;padding:0 8px 0 6px;align-items:center}details > summary:hover{background-color:var(--color-background-elevation-1)}details > summary::before{display:block;user-select:none;-webkit-mask-image:var(--image-file-treeoutlineTriangles);-webkit-mask-size:32px 24px;-webkit-mask-position:0 0;background-color:var(--color-text-secondary);content:"";height:12px;min-width:10px;max-width:10px;overflow:hidden}details[open] > summary::before{-webkit-mask-position:-16px 0}.group-header{display:inline-flex;align-items:center;width:100%;padding-right:8px;overflow:hidden}.group-icon-or-disable{justify-content:center;display:flex;width:16px;margin-left:2px}.group-header-title{margin-left:4px;font-weight:500;font-size:var(--source-code-font-size);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.group-hover-actions{display:flex;align-items:center;justify-content:right;font-size:10px;font-weight:500}.breakpoint-item-location-or-actions{min-width:20px;flex:0 0 auto;display:flex;padding-left:8px;justify-content:right}button{cursor:pointer;width:13px;height:13px;border:none;background-color:transparent;display:none;align-items:center;justify-content:center}button + span{padding-left:6px}button + button{padding-left:11px}summary:hover button{display:flex}button:hover devtools-icon{--icon-color:var(--color-text-primary)}.type-indicator{--override-color-conditional-breakpoint:#f29900;--override-color-logpoint:#f439a0;border-right:4px solid;border-radius:0 2px 2px 0;border-color:transparent;height:16px}.breakpoint-item{display:flex;align-items:center;line-height:13px;height:20px;padding-right:8px}.breakpoint-item:hover{background-color:var(--color-background-elevation-1)}.breakpoint-item.hit{--override-breakpoint-hit-background:rgb(255 255 194);background-color:var(--override-breakpoint-hit-background)}.breakpoint-item.hit:focus{background-color:var(--legacy-focus-bg-color)}:host-context(.-theme-with-dark-background) .breakpoint-item.hit{background-color:hsl(46deg 98% 22%);color:var(--color-text-primary)}.-theme-with-dark-background .type-indicator,\n:host-context(.-theme-with-dark-background) .type-indicator{--override-color-conditional-breakpoint:#e9a33a;--override-color-logpoint:#e54d9b}.breakpoint-item.logpoint > label > .type-indicator{border-color:var(--override-color-logpoint)}.breakpoint-item.conditional-breakpoint > label > .type-indicator{border-color:var(--override-color-conditional-breakpoint)}.checkbox-label{display:flex;align-items:center}.checkbox-label > input{margin-left:16px;margin-right:6px}summary:hover .file-icon{display:none}.group-checkbox{margin:0;display:none}summary:hover .group-checkbox{display:flex}.location{line-height:14px;text-overflow:ellipsis;overflow:hidden}.breakpoint-item:hover button{display:flex}.pause-on-uncaught-exceptions{margin-top:3px}.pause-on-caught-exceptions{margin-bottom:3px}input:disabled + span{color:var(--color-text-disabled)}.pause-on-caught-exceptions > .checkbox-label > input,\n.pause-on-uncaught-exceptions > .checkbox-label > input{margin-left:6px}.pause-on-uncaught-exceptions,\n.pause-on-caught-exceptions{display:flex;align-items:center;line-height:13px;height:18px;padding-right:8px}details > summary:focus,\n.breakpoint-item:focus,\n.pause-on-uncaught-exceptions:focus,\n.pause-on-caught-exceptions:focus{background-color:var(--legacy-focus-bg-color);outline-width:0}\n/*# sourceURL=breakpointsView.css */\n');const u=e=>null!==e.getAttribute("data-first-pause")||null!==e.getAttribute("data-last-pause"),m=e=>!(e=>"treeitem"===e.getAttribute("role"))(e),g=e=>null!==e.getAttribute("open"),b=e=>e.querySelector("[data-first-breakpoint]"),v=e=>{const t=x(e);return t&&t instanceof HTMLDetailsElement?t?.querySelector("summary"):null},k=e=>e.querySelector("summary"),x=e=>{const t=e.nextElementSibling;return t&&t instanceof HTMLDetailsElement?t:null};async function f(e,t,n){if(u(e))return function(e,t){console.assert(u(e));let n=null;switch(t){case"ArrowUp":{const t=e.previousElementSibling;t instanceof HTMLElement&&(n=t,console.assert(u(n)));break}case"ArrowDown":{const t=e.nextElementSibling;if(t instanceof HTMLElement)if("tree"===t.getAttribute("role")){const e=t.querySelector("[data-first-group]");e&&(n=k(e))}else n=t,console.assert(u(n));break}}return n}(e,t);const o=e.parentElement;if(!(o&&o instanceof HTMLDetailsElement))throw new Error("The selected nodes should be direct children of an HTMLDetails element.");let i=null;switch(t){case"ArrowLeft":if(!m(e))return k(o);g(o)&&await n(o,!1);break;case"ArrowRight":if(m(e)){if(g(o))return b(o);await n(o,!0)}break;case"ArrowDown":if(m(e))i=g(o)?b(o):v(o);else{const t=e.nextElementSibling;i=t&&t instanceof HTMLDivElement?t:v(o)}break;case"ArrowUp":if(m(e)){const e=(e=>{const t=e.previousElementSibling;return t&&t instanceof HTMLDetailsElement?t:null})(o);if(e)i=g(e)?(e=>e.querySelector("[data-last-breakpoint]"))(e):k(e);else{const e=o.parentElement?.previousElementSibling;e instanceof HTMLElement&&(i=e)}}else{const t=e.previousElementSibling;t instanceof HTMLElement&&(i=t)}}return i}const w={pauseOnUncaughtExceptions:"Pause on uncaught exceptions",pauseOnCaughtExceptions:"Pause on caught exceptions",checked:"checked",unchecked:"unchecked",indeterminate:"mixed",breakpointHit:"{PH1} breakpoint hit",removeAllBreakpointsInFile:"Remove all breakpoints in file",disableAllBreakpointsInFile:"Disable all breakpoints in file",enableAllBreakpointsInFile:"Enable all breakpoints in file",editCondition:"Edit condition",editLogpoint:"Edit logpoint",removeBreakpoint:"Remove breakpoint",removeAllBreakpoints:"Remove all breakpoints",removeOtherBreakpoints:"Remove other breakpoints",revealLocation:"Reveal location",conditionCode:"Condition: {PH1}",logpointCode:"Logpoint: {PH1}"},y=t.i18n.registerUIStrings("panels/sources/components/BreakpointsView.ts",w),E=t.i18n.getLocalizedString.bind(void 0,y),C=r.RenderCoordinator.RenderCoordinator.instance();class S extends Event{static eventName="checkboxtoggled";data;constructor(e,t){super(S.eventName),this.data={breakpointItem:e,checked:t}}}class $ extends Event{static eventName="pauseonuncaughtexceptionsstatechanged";data;constructor(e){super($.eventName),this.data={checked:e}}}class I extends Event{static eventName="pauseoncaughtexceptionsstatechanged";data;constructor(e){super(I.eventName),this.data={checked:e}}}class T extends Event{static eventName="expandedstatechanged";data;constructor(e,t){super(T.eventName),this.data={url:e,expanded:t}}}class B extends Event{static eventName="breakpointselected";data;constructor(e){super(B.eventName),this.data={breakpointItem:e}}}class N extends Event{static eventName="breakpointedited";data;constructor(e){super(N.eventName),this.data={breakpointItem:e}}}class O extends Event{static eventName="breakpointsremoved";data;constructor(e){super(O.eventName),this.data={breakpointItems:e}}}class A extends HTMLElement{static litTagName=d.literal`devtools-breakpoint-view`;#e=this.attachShadow({mode:"open"});#t=!1;#n=!1;#o=!1;#i=!0;#a=[];#r=!1;#s=!1;set data(e){this.#t=e.pauseOnUncaughtExceptions,this.#n=e.pauseOnCaughtExceptions,this.#o=e.independentPauseToggles,this.#i=e.breakpointsActive,this.#a=e.groups,this.#d()}connectedCallback(){this.#e.adoptedStyleSheets=[p]}async#d(){if(!this.#r)return this.#r=!0,await C.write("BreakpointsView render",(()=>{const e=async e=>{const t=e.currentTarget;await this.#c(t),e.consume()},t=(this.#o||this.#t)&&this.#n,n=!this.#o&&!this.#t,o=d.html` <div class="pause-on-uncaught-exceptions" tabindex="0" @click="${e}" @keydown="${this.#l}" data-first-pause> <label class="checkbox-label"> <input type="checkbox" tabindex="-1" ?checked="${this.#t}" @change="${this.#h.bind(this)}"> <span>${E(w.pauseOnUncaughtExceptions)}</span> </label> </div> <div class="pause-on-caught-exceptions" tabindex="-1" @click="${e}" @keydown="${this.#l}" data-last-pause> <label class="checkbox-label"> <input data-pause-on-caught-checkbox type="checkbox" tabindex="-1" ?checked="${t}" ?disabled="${n}" @change="${this.#p.bind(this)}"> <span>${E(w.pauseOnCaughtExceptions)}</span> </label> </div> <div role="tree"> ${d.Directives.repeat(this.#a,(e=>e.url),((e,t)=>d.html`${this.#u(e,t)}`))} </div>`;d.render(o,this.#e,{host:this})})),await C.write("make pause-on-exceptions focusable",(()=>{if(null===this.#e.querySelector('[tabindex="0"]')){this.#e.querySelector("[data-first-pause]")?.setAttribute("tabindex","0")}})),this.#r=!1,this.#s?(this.#s=!1,this.#d()):void 0;this.#s=!0}async#l(e){if(e.target&&e.target instanceof HTMLElement)return"Home"===e.key||"End"===e.key?(e.consume(!0),this.#m(e.key)):n.KeyboardUtilities.keyIsArrowKey(e.key)?(e.consume(!0),this.#g(e.key,e.target)):void 0}async#c(e){e&&C.write("focus on selected element",(()=>{this.#e.querySelector('[tabindex="0"]')?.setAttribute("tabindex","-1"),e.setAttribute("tabindex","0"),e.focus()}))}async#g(e,t){const n=await f(t,e,((e,t)=>t?C.write("expand",(()=>{e.setAttribute("open","")})):C.write("expand",(()=>{e.removeAttribute("open")}))));return this.#c(n)}async#m(e){if("Home"===e){const e=this.#e.querySelector("[data-first-pause]");return this.#c(e)}if("End"===e){const e=this.#a.length;if(0===e){const e=this.#e.querySelector("[data-last-pause]");return this.#c(e)}const t=e-1;if(this.#a[t].expanded){const e=this.#e.querySelector("[data-last-group] > [data-last-breakpoint]");return this.#c(e)}const n=this.#e.querySelector("[data-last-group] > summary");return this.#c(n)}}#b(t){const n="LOGPOINT"===t.type?E(w.editLogpoint):E(w.editCondition);return d.html` <button data-edit-breakpoint @click="${n=>{e.userMetrics.breakpointEditDialogRevealedFrom(1),this.dispatchEvent(new N(t)),n.consume()}}" title="${n}"> <${a.Icon.Icon.litTagName} .data="${{iconName:"edit-icon",width:"14px",color:"var(--color-text-secondary)"}}" }> </${a.Icon.Icon.litTagName}> </button> `}#v(t,n){return d.html` <button data-remove-breakpoint @click="${n=>{e.userMetrics.actionTaken(e.UserMetrics.Action.BreakpointRemovedFromRemoveButton),this.dispatchEvent(new O(t)),n.consume()}}" title="${n}"> <${a.Icon.Icon.litTagName} .data="${{iconName:"close-icon",width:"10px",color:"var(--color-text-secondary)"}}" }> </${a.Icon.Icon.litTagName}> </button> `}#k(e,t){const{breakpointItems:n}=t,o=new s.ContextMenu.ContextMenu(e);o.defaultSection().appendItem(E(w.removeAllBreakpointsInFile),(()=>{this.dispatchEvent(new O(n))}));const i=n.filter((e=>"DISABLED"!==e.status));o.defaultSection().appendItem(E(w.disableAllBreakpointsInFile),(()=>{for(const e of i)this.dispatchEvent(new S(e,!1))}),0===i.length);const a=n.filter((e=>"ENABLED"!==e.status));o.defaultSection().appendItem(E(w.enableAllBreakpointsInFile),(()=>{for(const e of a)this.dispatchEvent(new S(e,!0))}),0===a.length),o.defaultSection().appendItem(E(w.removeAllBreakpoints),(()=>{const e=this.#a.map((({breakpointItems:e})=>e)).flat();this.dispatchEvent(new O(e))}));const r=this.#a.filter((e=>e!==t));o.defaultSection().appendItem(E(w.removeOtherBreakpoints),(()=>{const e=r.map((({breakpointItems:e})=>e)).flat();this.dispatchEvent(new O(e))}),0===r.length),o.show()}#u(t,n){const o={active:this.#i};return d.html` <details class="${d.Directives.classMap(o)}" ?data-first-group="${0===n}" ?data-last-group="${n===this.#a.length-1}" role="group" aria-label="${t.name}" aria-description="${t.url}" ?open="${d.Directives.live(t.expanded)}" @toggle="${e=>{const n=e.target;t.expanded=n.open,this.dispatchEvent(new T(t.url,t.expanded))}}"> <summary @contextmenu="${e=>{this.#k(e,t),e.consume()}}" tabindex="-1" @keydown="${this.#l}" @click="${async t=>{const n=t.currentTarget;await this.#c(n),e.userMetrics.actionTaken(e.UserMetrics.Action.BreakpointGroupExpandedStateChanged),t.consume()}}"> <span class="group-header" aria-hidden="true"><span class="group-icon-or-disable">${this.#x()}${this.#f(t)}</span><span class="group-header-title" title="${t.url}">${t.name}</span></span> <span class="group-hover-actions"> ${this.#v(t.breakpointItems,E(w.removeAllBreakpointsInFile))} </span> </summary> ${d.Directives.repeat(t.breakpointItems,(e=>e.id),((e,o)=>this.#w(e,t.editable,n,o)))} </details> `}#f(e){const t=e.breakpointItems.some((e=>"ENABLED"===e.status));return d.html` <input class="group-checkbox" type="checkbox" aria-label="" .checked="${t}" @change="${t=>{const n=t.target,o=n.checked?"ENABLED":"DISABLED";e.breakpointItems.filter((e=>e.status!==o)).forEach((e=>{this.dispatchEvent(new S(e,n.checked))})),t.consume()}}" tabindex="-1"> `}#x(){return d.html` <${a.Icon.Icon.litTagName} class="file-icon" .data="${{iconName:"ic_file_script",color:"var(--color-ic-file-script)",width:"16px",height:"16px"}}"></${a.Icon.Icon.litTagName}> `}#y(t,n,o){const i=new s.ContextMenu.ContextMenu(t),a="LOGPOINT"===n.type?E(w.editLogpoint):E(w.editCondition);i.defaultSection().appendItem(E(w.removeBreakpoint),(()=>{this.dispatchEvent(new O([n]))})),i.defaultSection().appendItem(a,(()=>{e.userMetrics.breakpointEditDialogRevealedFrom(0),this.dispatchEvent(new N(n))}),!o),i.defaultSection().appendItem(E(w.revealLocation),(()=>{this.dispatchEvent(new B(n))})),i.defaultSection().appendItem(E(w.removeAllBreakpoints),(()=>{const e=this.#a.map((({breakpointItems:e})=>e)).flat();this.dispatchEvent(new O(e))}));const r=this.#a.map((({breakpointItems:e})=>e)).flat().filter((e=>e!==n));i.defaultSection().appendItem(E(w.removeOtherBreakpoints),(()=>{this.dispatchEvent(new O(r))}),0===r.length),i.show()}#w(e,t,o,i){const a={"breakpoint-item":!0,hit:e.isHit,"conditional-breakpoint":"CONDITIONAL_BREAKPOINT"===e.type,logpoint:"LOGPOINT"===e.type},r=this.#E(e),s=n.StringUtilities.trimEndWithMaxLength(e.codeSnippet,200),c=this.#C(e.type,e.hoverText),l=this.#a[o].breakpointItems;return d.html` <div class="${d.Directives.classMap(a)}" ?data-first-breakpoint="${0===i}" ?data-last-breakpoint="${i===l.length-1}" aria-label="${r}" role="treeitem" tabindex="-1" @contextmenu="${n=>{this.#y(n,e,t),n.consume()}}" @click="${async e=>{const t=e.currentTarget;await this.#c(t),e.consume()}}" @keydown="${this.#l}"> <label class="checkbox-label"> <span class="type-indicator"></span> <input type="checkbox" aria-label="${e.location}" ?indeterminate="${"INDETERMINATE"===e.status}" .checked="${"ENABLED"===e.status}" @change="${t=>this.#S(t,e)}" tabindex="-1"> </label> <span class="code-snippet" @click="${t=>{this.dispatchEvent(new B(e)),t.consume()}}" title="${c}">${s}</span> <span class="breakpoint-item-location-or-actions"> ${t?this.#b(e):d.nothing} ${this.#v([e],E(w.removeBreakpoint))} <span class="location">${e.location}</span> </span> </div> `}#C(e,t){switch(e){case"REGULAR_BREAKPOINT":return;case"CONDITIONAL_BREAKPOINT":return o(t),E(w.conditionCode,{PH1:t});case"LOGPOINT":return o(t),E(w.logpointCode,{PH1:t})}}#E(e){let t;switch(e.status){case"ENABLED":t=E(w.checked);break;case"DISABLED":t=E(w.unchecked);break;case"INDETERMINATE":t=E(w.indeterminate)}return e.isHit?E(w.breakpointHit,{PH1:t}):t}#S(e,t){const n=e.target;this.dispatchEvent(new S(t,n.checked))}#p(e){const{checked:t}=e.target;this.dispatchEvent(new I(t))}#h(e){const{checked:t}=e.target;if(!this.#o){const e=this.#e.querySelector("[data-pause-on-caught-checkbox]");o(e),!t&&e.checked&&e.click(),C.write("update pause-on-uncaught-exception",(()=>{e.disabled=!t}))}this.dispatchEvent(new $(t))}}i.CustomElements.defineComponent("devtools-breakpoint-view",A);var H=Object.freeze({__proto__:null,CheckboxToggledEvent:S,PauseOnUncaughtExceptionsStateChangedEvent:$,PauseOnCaughtExceptionsStateChangedEvent:I,ExpandedStateChangedEvent:T,BreakpointSelectedEvent:B,BreakpointEditedEvent:N,BreakpointsRemovedEvent:O,BreakpointsView:A});const L=new CSSStyleSheet;L.replaceSync(":host{flex-grow:1;padding:6px}.row{display:flex;flex-direction:row;color:var(--color-syntax-1);font-family:var(--monospace-font-family);font-size:var(--monospace-font-size);align-items:center;line-height:24px}.row devtools-button{line-height:1;margin-left:0.1em}.row devtools-button:nth-of-type(1){margin-left:0.8em}.padded{margin-left:2em}.separator{margin-right:0.5em;color:var(--color-text-primary)}.editable{cursor:text;color:var(--color-text-primary);overflow-wrap:break-word;min-height:18px;line-height:18px;min-width:0.5em;background:transparent;border:none;outline:none;display:inline-block}.editable.red{color:var(--color-syntax-1)}.editable:hover,\n.editable:focus{box-shadow:0 0 0 1px var(--color-details-hairline);border-radius:2px}.row .inline-button{opacity:0%;visibility:hidden;transition:opacity 200ms}.row:focus-within .inline-button,\n.row:hover .inline-button{opacity:100%;visibility:visible}.center-wrapper{height:100%;display:flex;justify-content:center;align-items:center}.centered{margin:1em;max-width:300px;text-align:center}.error-header{font-weight:bold;margin-bottom:1em}.error-body{line-height:1.5em;color:var(--color-text-secondary)}.add-block{margin-top:3px}.header-name,\n.header-value{min-width:min-content}\n/*# sourceURL=HeadersView.css */\n");const R={addHeader:"Add a header",removeHeader:"Remove this header",removeBlock:"Remove this '`ApplyTo`'-section",errorWhenParsing:"Error when parsing ''{PH1}''.",parsingErrorExplainer:"This is most likely due to a syntax error in ''{PH1}''. Try opening this file in an external editor to fix the error or delete the file and re-create the override.",addOverrideRule:"Add override rule"},D=t.i18n.registerUIStrings("panels/sources/components/HeadersView.ts",R),M=t.i18n.getLocalizedString.bind(void 0,D),P=new URL("../../../Images/plus_icon.svg",import.meta.url).toString(),U=new URL("../../../Images/trash_bin_material_icon.svg",import.meta.url).toString();class G extends s.View.SimpleView{#$=new q;#I;constructor(e){super(t.i18n.lockedString("HeadersView")),this.#I=e,this.#I.addEventListener(l.UISourceCode.Events.WorkingCopyChanged,this.#T,this),this.#I.addEventListener(l.UISourceCode.Events.WorkingCopyCommitted,this.#B,this),this.element.appendChild(this.#$),this.#N()}async#N(){const e=await this.#I.requestContent();this.#O(e.content||"")}#O(e){let t=!1,n=[];e=e||"[]";try{if(n=JSON.parse(e),!n.every(c.NetworkPersistenceManager.isHeaderOverride))throw"Type mismatch after parsing"}catch(e){console.error("Failed to parse",this.#I.url(),"for locally overriding headers."),t=!0}this.#$.data={headerOverrides:n,uiSourceCode:this.#I,parsingError:t}}commitEditing(){this.#I.commitWorkingCopy()}#T(){this.#O(this.#I.workingCopy())}#B(){this.#O(this.#I.workingCopy())}getComponent(){return this.#$}dispose(){this.#I.removeEventListener(l.UISourceCode.Events.WorkingCopyChanged,this.#T,this),this.#I.removeEventListener(l.UISourceCode.Events.WorkingCopyCommitted,this.#B,this)}}class q extends HTMLElement{static litTagName=d.literal`devtools-sources-headers-view`;#e=this.attachShadow({mode:"open"});#A=this.#d.bind(this);#H=[];#I=null;#L=!1;#R=null;#D="";constructor(){super(),this.#e.addEventListener("focusin",this.#M.bind(this)),this.#e.addEventListener("focusout",this.#P.bind(this)),this.#e.addEventListener("click",this.#U.bind(this)),this.#e.addEventListener("input",this.#G.bind(this)),this.#e.addEventListener("keydown",this.#q.bind(this)),this.#e.addEventListener("paste",this.#_.bind(this))}connectedCallback(){this.#e.adoptedStyleSheets=[L]}set data(e){this.#H=e.headerOverrides,this.#I=e.uiSourceCode,this.#L=e.parsingError,i.ScheduledRender.scheduleRender(this,this.#A)}#q(e){const t=e.target;if(!t.matches(".editable"))return;const n=e;!t.matches(".header-name")||""!==t.innerText||"Enter"!==n.key&&"Tab"!==n.key?"Enter"===n.key?(e.preventDefault(),t.blur(),this.#F(t)):"Escape"===n.key&&(e.consume(),t.innerText=this.#D,t.blur(),this.#j(t)):(e.preventDefault(),t.blur())}#F(e){const t=Array.from(this.#e.querySelectorAll(".editable")),n=t.indexOf(e);-1!==n&&n+1<t.length&&t[n+1].focus()}#V(e){const t=window.getSelection(),n=document.createRange();n.selectNodeContents(e),t?.removeAllRanges(),t?.addRange(n)}#M(e){const t=e.target;t.matches(".editable")&&(this.#V(t),this.#D=t.innerText)}#P(e){const t=e.target;if(""===t.innerText){const e=t.closest(".row"),n=Number(e.dataset.blockIndex),o=Number(e.dataset.headerIndex);t.matches(".apply-to")?(t.innerText="*",this.#H[n].applyTo="*",this.#W()):t.matches(".header-name")&&this.#z(n,o)}window.getSelection()?.removeAllRanges()}#K(e){const t=new Set(e.map((e=>e.name)));let n=1;for(;t.has("header-name-"+n);)n++;return"header-name-"+n}#U(e){const t=e.target,n=t.closest(".row"),o=Number(n?.dataset.blockIndex||0),i=Number(n?.dataset.headerIndex||0);t.matches(".add-header")?(this.#H[o].headers.splice(i+1,0,{name:this.#K(this.#H[o].headers),value:"header value"}),this.#R={blockIndex:o,headerIndex:i+1},this.#W()):t.matches(".remove-header")?this.#z(o,i):t.matches(".add-block")?(this.#H.push({applyTo:"*",headers:[{name:"header-name-1",value:"header value"}]}),this.#R={blockIndex:this.#H.length-1},this.#W()):t.matches(".remove-block")&&(this.#H.splice(o,1),this.#W())}#z(e,t){this.#H[e].headers.splice(t,1),0===this.#H[e].headers.length&&this.#H[e].headers.push({name:this.#K(this.#H[e].headers),value:"header value"}),this.#W()}#G(e){this.#j(e.target)}#j(e){const t=e.closest(".row"),n=Number(t.dataset.blockIndex),o=Number(t.dataset.headerIndex);e.matches(".header-name")&&(this.#H[n].headers[o].name=e.innerText,this.#W()),e.matches(".header-value")&&(this.#H[n].headers[o].value=e.innerText,this.#W()),e.matches(".apply-to")&&(this.#H[n].applyTo=e.innerText,this.#W())}#W(){this.#I?.setWorkingCopy(JSON.stringify(this.#H,null,2))}#_(e){const t=e;if(e.preventDefault(),t.clipboardData){const n=t.clipboardData.getData("text/plain"),o=this.#e.getSelection()?.getRangeAt(0);if(!o)return;o.deleteContents();const i=document.createTextNode(n);o.insertNode(i),o.selectNodeContents(i),o.collapse(!1);const a=window.getSelection();a?.removeAllRanges(),a?.addRange(o),this.#j(e.target)}}#d(){if(!i.ScheduledRender.isScheduledRender(this))throw new Error("HeadersView render was not scheduled");if(this.#L){const e=this.#I?.name()||".headers";d.render(d.html` <div class="center-wrapper"> <div class="centered"> <div class="error-header">${M(R.errorWhenParsing,{PH1:e})}</div> <div class="error-body">${M(R.parsingErrorExplainer,{PH1:e})}</div> </div> </div> `,this.#e,{host:this})}else if(d.render(d.html` ${this.#H.map(((e,t)=>d.html` ${this.#J(e.applyTo,t)} ${e.headers.map(((e,n)=>d.html` ${this.#Q(e,t,n)} `))} `))} <${h.Button.Button.litTagName} .variant="${"secondary"}" class="add-block"> ${M(R.addOverrideRule)} </${h.Button.Button.litTagName}> `,this.#e,{host:this}),this.#R){let e=null;e=this.#R.headerIndex?this.#e.querySelector(`[data-block-index="${this.#R.blockIndex}"][data-header-index="${this.#R.headerIndex}"] .header-name`):this.#e.querySelector(`[data-block-index="${this.#R.blockIndex}"] .apply-to`),e&&e.focus(),this.#R=null}}#J(e,n){return d.html` <div class="row" data-block-index="${n}"> <div>${t.i18n.lockedString("Apply to")}</div> <div class="separator">:</div> ${this.#X(e,"apply-to")} <${h.Button.Button.litTagName} title="${M(R.removeBlock)}" .size="${"SMALL"}" .iconUrl="${U}" .iconWidth="${"14px"}" .iconHeight="${"14px"}" .variant="${"round"}" class="remove-block inline-button"></${h.Button.Button.litTagName}> </div> `}#Q(e,t,n){return d.html` <div class="row padded" data-block-index="${t}" data-header-index="${n}"> ${this.#X(e.name,"header-name red")} <div class="separator">:</div> ${this.#X(e.value,"header-value")} <${h.Button.Button.litTagName} title="${M(R.addHeader)}" .size="${"SMALL"}" .iconUrl="${P}" .iconWidth="${"16px"}" .iconHeight="${"16px"}" .variant="${"round"}" class="add-header inline-button"></${h.Button.Button.litTagName}> <${h.Button.Button.litTagName} title="${M(R.removeHeader)}" .size="${"SMALL"}" .iconUrl="${U}" .iconWidth="${"14px"}" .iconHeight="${"14px"}" .variant="${"round"}" class="remove-header inline-button"></${h.Button.Button.litTagName}> </div> `}#X(e,t){return d.html`<span contenteditable="true" class="editable ${t}" tabindex="0" .innerText="${d.Directives.live(e)}"></span>`}}i.CustomElements.defineComponent("devtools-sources-headers-view",q);var _=Object.freeze({__proto__:null,HeadersView:G,HeadersViewComponent:q});export{H as BreakpointsView,_ as HeadersView};
