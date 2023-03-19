import*as e from"../../../../core/i18n/i18n.js";import*as t from"../../../../ui/components/buttons/buttons.js";import*as a from"../../../../ui/components/helpers/helpers.js";import*as r from"../../../../ui/lit-html/lit-html.js";import*as n from"../../../../ui/components/input/input.js";import*as i from"../../../../ui/components/icon_button/icon_button.js";import*as s from"../utils/utils.js";const l=new CSSStyleSheet;l.replaceSync(':host{--client-hints-form-icon-color:var(--color-text-primary)}.root{color:var(--color-text-primary);width:100%}.tree-title{font-weight:700;display:flex;align-items:center}.rotate-icon{transform:rotate(-90deg)}.form-container{display:grid;grid-template-columns:1fr 1fr 1fr auto;align-items:center;column-gap:10px;row-gap:8px;padding:0 10px}.full-row{grid-column:1/5}.half-row{grid-column:span 2}.mobile-checkbox-container{display:flex}.device-model-input{grid-column:1/4}.input-field{color:var(--color-text-primary);padding:3px 6px;border:none;border-radius:2px;box-shadow:var(--legacy-focus-ring-inactive-shadow);background-color:var(--color-background);font-size:inherit;height:18px}.input-field:focus{box-shadow:var(--legacy-focus-ring-active-shadow);outline-width:0}.add-container{cursor:pointer;display:flex;align-items:center;gap:6px}.add-icon{margin-right:5px}.brand-row{display:flex;align-items:center;gap:10px;justify-content:space-between}.brand-row > input{width:100%}.info-link{height:14px;margin-left:5px}.hide-container{display:none}.input-field-label-container{display:flex;flex-direction:column;gap:10px}@media (forced-colors: active){:host{--client-hints-form-icon-color:fieldtext}.input-field{border:1px solid}.tree-title[aria-disabled="true"]{color:GrayText}}\n/*# sourceURL=userAgentClientHintsForm.css */\n');const o={title:"User agent client hints",useragent:"User agent (Sec-CH-UA)",fullVersionList:"Full version list (Sec-CH-UA-Full-Version-List)",brandProperties:"User agent properties",brandName:"Brand",brandNameAriaLabel:"Brand {PH1}",significantBrandVersionPlaceholder:"Significant version (e.g. 87)",brandVersionPlaceholder:"Version (e.g. 87.0.4280.88)",brandVersionAriaLabel:"Version {PH1}",addBrand:"Add Brand",deleteTooltip:"Delete",brandDeleteAriaLabel:"Delete {PH1}",fullBrowserVersion:"Full browser version (Sec-CH-UA-Full-Browser-Version)",fullBrowserVersionPlaceholder:"Full browser version (e.g. 87.0.4280.88)",platformLabel:"Platform (Sec-CH-UA-Platform / Sec-CH-UA-Platform-Version)",platformProperties:"Platform properties",platformVersion:"Platform version",platformPlaceholder:"Platform (e.g. Android)",architecture:"Architecture (Sec-CH-UA-Arch)",architecturePlaceholder:"Architecture (e.g. x86)",deviceProperties:"Device properties",deviceModel:"Device model (Sec-CH-UA-Model)",mobileCheckboxLabel:"Mobile",update:"Update",notRepresentable:"Not representable as structured headers string.",userAgentClientHintsInfo:"User agent client hints are an alternative to the user agent string that identify the browser and the device in a more structured way with better privacy accounting. Click the button to learn more.",addedBrand:"Added brand row",deletedBrand:"Deleted brand row"},d=e.i18n.registerUIStrings("panels/settings/emulation/components/UserAgentClientHintsForm.ts",o),c=e.i18n.getLocalizedString.bind(void 0,d);class h extends Event{static eventName="clienthintschange";constructor(){super(h.eventName)}}class u extends Event{static eventName="clienthintssubmit";detail;constructor(e){super(u.eventName),this.detail={value:e}}}const p={brands:[{brand:"",version:""}],fullVersionList:[{brand:"",version:""}],fullVersion:"",platform:"",platformVersion:"",architecture:"",model:"",mobile:!1};class m extends HTMLElement{static litTagName=r.literal`devtools-user-agent-client-hints-form`;#e=this.attachShadow({mode:"open"});#t=!1;#a=!1;#r=p;#n=!1;#i=!1;#s="";connectedCallback(){this.#e.adoptedStyleSheets=[n.checkboxStyles,l]}set value(e){const{metaData:t=p,showMobileCheckbox:a=!1,showSubmitButton:r=!1}=e;this.#r={...this.#r,...t},this.#n=a,this.#i=r,this.#l()}get value(){return{metaData:this.#r}}set disabled(e){this.#a=e,this.#t=!1,this.#l()}get disabled(){return this.#a}#o=e=>{"Space"!==e.code&&"Enter"!==e.code&&"ArrowLeft"!==e.code&&"ArrowRight"!==e.code||(e.stopPropagation(),this.#d(e.code))};#d=e=>{this.#a||"ArrowLeft"===e&&!this.#t||"ArrowRight"===e&&this.#t||(this.#t=!this.#t,this.#l())};#c=(e,t,a)=>{const r=this.#r.brands?.map(((r,n)=>{if(n===t){const{brand:t,version:n}=r;return"brandName"===a?{brand:e,version:n}:{brand:t,version:e}}return r}));this.#r={...this.#r,brands:r},this.dispatchEvent(new h),this.#l()};#h=(e,t,a)=>{const r=this.#r.fullVersionList?.map(((r,n)=>{if(n===t){const{brand:t,version:n}=r;return"brandName"===a?{brand:e,version:n}:{brand:t,version:e}}return r}));this.#r={...this.#r,fullVersionList:r},this.dispatchEvent(new h),this.#l()};#u=e=>{const{brands:t=[]}=this.#r;t.splice(e,1),this.#r={...this.#r,brands:t},this.dispatchEvent(new h),this.#s=c(o.deletedBrand),this.#l();let a=this.shadowRoot?.getElementById(`ua-brand-${e+1}-input`);a||(a=this.shadowRoot?.getElementById("add-brand-button")),a?.focus()};#p=e=>{const{fullVersionList:t=[]}=this.#r;t.splice(e,1),this.#r={...this.#r,fullVersionList:t},this.dispatchEvent(new h),this.#s=c(o.deletedBrand),this.#l();let a=this.shadowRoot?.getElementById(`fvl-brand-${e+1}-input`);a||(a=this.shadowRoot?.getElementById("add-fvl-brand-button")),a?.focus()};#m=()=>{const{brands:e}=this.#r;this.#r={...this.#r,brands:[...Array.isArray(e)?e:[],{brand:"",version:""}]},this.dispatchEvent(new h),this.#s=c(o.addedBrand),this.#l();const t=this.shadowRoot?.querySelectorAll(".ua-brand-name-input");if(t){const e=Array.from(t).pop();e&&e.focus()}};#b=e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),this.#m())};#f=()=>{const{fullVersionList:e}=this.#r;this.#r={...this.#r,fullVersionList:[...Array.isArray(e)?e:[],{brand:"",version:""}]},this.dispatchEvent(new h),this.#s=c(o.addedBrand),this.#l();const t=this.shadowRoot?.querySelectorAll(".fvl-brand-name-input");if(t){const e=Array.from(t).pop();e&&e.focus()}};#g=e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),this.#f())};#v=(e,t)=>{e in this.#r&&(this.#r={...this.#r,[e]:t},this.#l()),this.dispatchEvent(new h)};#$=e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),e.target.click())};#w=e=>{e.preventDefault(),this.#i&&(this.dispatchEvent(new u(this.#r)),this.#l())};#x(e,t,a,n){return r.html` <label class="full-row label input-field-label-container"> ${e} <input class="input-field" type="text" @input="${e=>{const t=e.target.value;this.#v(n,t)}}" .value="${a}" placeholder="${t}"> </label> `}#A(){const{platform:e,platformVersion:t}=this.#r;return r.html` <span class="full-row label">${c(o.platformLabel)}</span> <div class="full-row brand-row" aria-label="${c(o.platformProperties)}" role="group"> <input class="input-field half-row" type="text" @input="${e=>{const t=e.target.value;this.#v("platform",t)}}" .value="${e}" placeholder="${c(o.platformPlaceholder)}" aria-label="${c(o.platformLabel)}"> <input class="input-field half-row" type="text" @input="${e=>{const t=e.target.value;this.#v("platformVersion",t)}}" .value="${t}" placeholder="${c(o.platformVersion)}" aria-label="${c(o.platformVersion)}"> </div> `}#D(){const{model:e,mobile:t}=this.#r,a=this.#n?r.html` <label class="mobile-checkbox-container"> <input type="checkbox" @input="${e=>{const t=e.target.checked;this.#v("mobile",t)}}" .checked="${t}"> ${c(o.mobileCheckboxLabel)} </label> `:r.html``;return r.html` <span class="full-row label">${c(o.deviceModel)}</span> <div class="full-row brand-row" aria-label="${c(o.deviceProperties)}" role="group"> <input class="input-field ${this.#n?"device-model-input":"full-row"}" type="text" @input="${e=>{const t=e.target.value;this.#v("model",t)}}" .value="${e}" placeholder="${c(o.deviceModel)}"> ${a} </div> `}#y(){const{brands:e=[{brand:"",version:""}]}=this.#r,t=e.map(((e,t)=>{const{brand:a,version:n}=e,s=()=>{this.#u(t)};return r.html` <div class="full-row brand-row" aria-label="${c(o.brandProperties)}" role="group"> <input class="input-field ua-brand-name-input" type="text" @input="${e=>{const a=e.target.value;this.#c(a,t,"brandName")}}" .value="${a}" id="ua-brand-${t+1}-input" placeholder="${c(o.brandName)}" aria-label="${c(o.brandNameAriaLabel,{PH1:t+1})}"> <input class="input-field" type="text" @input="${e=>{const a=e.target.value;this.#c(a,t,"brandVersion")}}" .value="${n}" placeholder="${c(o.significantBrandVersionPlaceholder)}" aria-label="${c(o.brandVersionAriaLabel,{PH1:t+1})}"> <${i.Icon.Icon.litTagName} .data="${{color:"var(--client-hints-form-icon-color)",iconName:"trash_bin_icon",width:"10px",height:"14px"}}" title="${c(o.deleteTooltip)}" class="delete-icon" tabindex="0" role="button" @click="${s}" @keypress="${e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),s())}}" aria-label="${c(o.brandDeleteAriaLabel,{PH1:t+1})}"> </${i.Icon.Icon.litTagName}> </div> `}));return r.html` <span class="full-row label">${c(o.useragent)}</span> ${t} <div class="add-container full-row" role="button" tabindex="0" id="add-brand-button" aria-label="${c(o.addBrand)}" @click="${this.#m}" @keypress="${this.#b}"> <${i.Icon.Icon.litTagName} aria-hidden="true" .data="${{color:"var(--client-hints-form-icon-color)",iconName:"add-icon",width:"10px"}}"> </${i.Icon.Icon.litTagName}> ${c(o.addBrand)} </div> `}#V(){const{fullVersionList:e=[{brand:"",version:""}]}=this.#r,t=e.map(((e,t)=>{const{brand:a,version:n}=e,s=()=>{this.#p(t)};return r.html` <div class="full-row brand-row" aria-label="${c(o.brandProperties)}" role="group"> <input class="input-field fvl-brand-name-input" type="text" @input="${e=>{const a=e.target.value;this.#h(a,t,"brandName")}}" .value="${a}" id="fvl-brand-${t+1}-input" placeholder="${c(o.brandName)}" aria-label="${c(o.brandNameAriaLabel,{PH1:t+1})}"> <input class="input-field" type="text" @input="${e=>{const a=e.target.value;this.#h(a,t,"brandVersion")}}" .value="${n}" placeholder="${c(o.brandVersionPlaceholder)}" aria-label="${c(o.brandVersionAriaLabel,{PH1:t+1})}"> <${i.Icon.Icon.litTagName} .data="${{color:"var(--client-hints-form-icon-color)",iconName:"trash_bin_icon",width:"10px",height:"14px"}}" title="${c(o.deleteTooltip)}" class="delete-icon" tabindex="0" role="button" @click="${s}" @keypress="${e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),s())}}" aria-label="${c(o.brandDeleteAriaLabel,{PH1:t+1})}"> </${i.Icon.Icon.litTagName}> </div> `}));return r.html` <span class="full-row label">${c(o.fullVersionList)}</span> ${t} <div class="add-container full-row" role="button" tabindex="0" id="add-fvl-brand-button" aria-label="${c(o.addBrand)}" @click="${this.#f}" @keypress="${this.#g}"> <${i.Icon.Icon.litTagName} aria-hidden="true" .data="${{color:"var(--client-hints-form-icon-color)",iconName:"add-icon",width:"10px"}}"> </${i.Icon.Icon.litTagName}> ${c(o.addBrand)} </div> `}#l(){const{fullVersion:e,architecture:a}=this.#r,n=this.#y(),s=this.#V(),l=this.#x(c(o.fullBrowserVersion),c(o.fullBrowserVersionPlaceholder),e||"","fullVersion"),d=this.#A(),h=this.#x(c(o.architecture),c(o.architecturePlaceholder),a,"architecture"),u=this.#D(),p=this.#i?r.html` <${t.Button.Button.litTagName} .variant="${"secondary"}" .type="${"submit"}"> ${c(o.update)} </${t.Button.Button.litTagName}> `:r.html``,m=r.html` <section class="root"> <div class="tree-title" role="button" @click="${this.#d}" tabindex="0" @keydown="${this.#o}" aria-expanded="${this.#t}" aria-controls="form-container" @disabled="${this.#a}" aria-disabled="${this.#a}" aria-label="${c(o.title)}"> <${i.Icon.Icon.litTagName} class="${this.#t?"":"rotate-icon"}" .data="${{color:"var(--client-hints-form-icon-color)",iconName:"chromeSelect",width:"20px"}}"> </${i.Icon.Icon.litTagName}> ${c(o.title)} <x-link tabindex="0" href="https://web.dev/user-agent-client-hints/" target="_blank" class="info-link" @keypress="${this.#$}" aria-label="${c(o.userAgentClientHintsInfo)}"> <${i.Icon.Icon.litTagName} .data="${{color:"var(--client-hints-form-icon-color)",iconName:"ic_info_black_18dp",width:"14px"}}"> </${i.Icon.Icon.litTagName}> </x-link> </div> <form id="form-container" class="form-container ${this.#t?"":"hide-container"}" @submit="${this.#w}"> ${n} ${s} ${l} ${d} ${h} ${u} ${p} </form> <div aria-live="polite" aria-label="${this.#s}"></div> </section> `;r.render(m,this.#e,{host:this})}validate=()=>{for(const[e,t]of Object.entries(this.#r))if("brands"===e||"fullVersionList"===e){const e=this.#r.brands?.every((({brand:e,version:t})=>{const a=s.UserAgentMetadata.validateAsStructuredHeadersString(e,c(o.notRepresentable)),r=s.UserAgentMetadata.validateAsStructuredHeadersString(t,c(o.notRepresentable));return a.valid&&r.valid}));if(!e)return{valid:!1,errorMessage:c(o.notRepresentable)}}else{const e=s.UserAgentMetadata.validateAsStructuredHeadersString(t,c(o.notRepresentable));if(!e.valid)return e}return{valid:!0}}}a.CustomElements.defineComponent("devtools-user-agent-client-hints-form",m);var b=Object.freeze({__proto__:null,ClientHintsChangeEvent:h,ClientHintsSubmitEvent:u,UserAgentClientHintsForm:m});export{b as UserAgentClientHintsForm};