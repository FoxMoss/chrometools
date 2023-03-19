import*as o from"../../lit-html/lit-html.js";import*as t from"../helpers/helpers.js";import*as r from"../icon_button/icon_button.js";const e=new CSSStyleSheet;e.replaceSync("*{margin:0;padding:0;box-sizing:border-box}*:focus,\n*:focus-visible,\n:host(:focus),\n:host(:focus-visible){outline:none}:host{display:inline-flex;flex-direction:row}button{--button-has-right-border-radius:calc(1 - var(--override-button-no-right-border-radius, 0));align-items:center;border-radius:4px calc(var(--button-has-right-border-radius) * 4px) calc(var(--button-has-right-border-radius) * 4px) 4px;display:inline-flex;font-family:inherit;font-size:12px;font-weight:500;height:24px;line-height:14px;padding:5px 12px;justify-content:center;width:100%;white-space:nowrap}button.small{height:18px;border-radius:2px calc(var(--button-has-right-border-radius) * 2px) calc(var(--button-has-right-border-radius) * 2px) 2px}button:focus-visible{box-shadow:0 0 0 2px var(--color-button-outline-focus)}button.toolbar,\nbutton.round{background:transparent;border-radius:2px calc(var(--button-has-right-border-radius) * 2px) calc(var(--button-has-right-border-radius) * 2px) 2px;border:none;height:24px;width:24px;overflow:hidden;padding:0;white-space:nowrap}button.round{border-radius:100%;height:30px;width:30px}button.toolbar.small{height:18px;width:18px}button.round.small{height:24px;width:24px}button.round.tiny{height:18px;width:18px}button.primary{border:1px solid var(--color-primary);background:var(--color-primary);color:var(--color-background)}button.primary:hover{background:var(--color-button-primary-background-hovering);border:1px solid var(--color-button-primary-background-hovering)}button.primary.active,\nbutton.primary:active{background:var(--color-button-primary-background-pressed);border:1px solid var(--color-button-primary-background-pressed)}button.primary:disabled,\nbutton.primary:disabled:hover{border:1px solid transparent;background:var(--color-background-elevation-1);color:var(--color-text-disabled);cursor:not-allowed}button.secondary{border:1px solid var(--color-details-hairline);background:var(--color-background);color:var(--color-primary)}button.secondary:hover{background:var(--color-button-secondary-background-hovering)}button.secondary.active,\nbutton.secondary:active{background:var(--color-button-secondary-background-pressed);border:1px solid var(--color-button-secondary-background-pressed)}button.secondary:focus-visible{border:1px solid var(--color-background)}button.secondary:disabled,\nbutton.secondary:disabled:hover{border:1px solid var(--color-background-elevation-1);background:var(--color-background);color:var(--color-text-disabled);cursor:not-allowed}button.secondary.active:focus-visible,\nbutton.secondary:active:focus-visible{border:1px solid var(--color-button-secondary-background-pressed)}button.toolbar:hover,\nbutton.round:hover{background-color:var(--color-iconbutton-hover)}button.toolbar.active,\nbutton.toolbar:active,\nbutton.round.active,\nbutton.round:active{background-color:var(--color-iconbutton-pressed)}button.toolbar:focus-visible,\nbutton.round:focus-visible{background-color:var(--color-background-elevation-2)}button.toolbar:disabled,\nbutton.toolbar:disabled:hover,\nbutton.round:disabled,\nbutton.round:disabled:hover{background:var(--color-background);color:var(--color-text-disabled);cursor:not-allowed}button.text-with-icon{padding:0 12px 0 4px}button.small.text-with-icon{padding:0 9px 0 3px}button.only-icon{padding:0}button devtools-icon{width:19px;height:19px}button.toolbar devtools-icon,\nbutton.round devtools-icon{width:24px;height:24px;--icon-color:var(--color-text-secondary)}button.primary devtools-icon{--icon-color:var(--color-background)}button.secondary devtools-icon{--icon-color:var(--color-primary)}button.small devtools-icon{width:14px;height:14px}button.explicit-size devtools-icon{width:unset;height:unset}button.toolbar.small devtools-icon,\nbutton.round.small devtools-icon{width:18px;height:18px}button.round.tiny devtools-icon{width:14px;height:14px}button.toolbar.explicit-size devtools-icon,\nbutton.round.explicit-size devtools-icon{width:unset;height:unset}button.toolbar.active devtools-icon,\nbutton.toolbar:active devtools-icon{--icon-color:var(--color-primary)}button.toolbar:hover devtools-icon{--icon-color:var(--color-text-primary)}button.toolbar:disabled devtools-icon,\nbutton.round:disabled devtools-icon{--icon-color:var(--color-text-disabled)}button.primary:disabled devtools-icon{--icon-color:var(--color-text-disabled)}button.secondary:disabled devtools-icon{--icon-color:var(--color-text-disabled)}.spinner-component.secondary{border:2px solid var(--color-primary);border-right-color:transparent}.spinner-component.disabled{border:2px solid var(--color-text-disabled);border-right-color:transparent}.spinner-component{display:block;width:12px;height:12px;border-radius:6px;border:2px solid var(--color-background);animation:spinner-animation 1s linear infinite;border-right-color:transparent;margin-right:6px}@keyframes spinner-animation{from{transform:rotate(0)}to{transform:rotate(360deg)}}\n/*# sourceURL=button.css */\n");class i extends HTMLElement{static formAssociated=!0;static litTagName=o.literal`devtools-button`;#o=this.attachShadow({mode:"open",delegatesFocus:!0});#t=this.#r.bind(this);#e=this.#i.bind(this);#n={size:"MEDIUM",disabled:!1,active:!1,spinner:!1,type:"button"};#s=!0;#d=this.attachInternals();constructor(){super(),this.setAttribute("role","presentation"),this.addEventListener("click",this.#e,!0)}set data(o){this.#n.variant=o.variant,this.#n.iconUrl=o.iconUrl,this.#n.size="MEDIUM","size"in o&&o.size&&(this.#n.size=o.size),"iconWidth"in o&&o.iconWidth&&(this.#n.iconWidth=o.iconWidth),"iconHeight"in o&&o.iconHeight&&(this.#n.iconHeight=o.iconHeight),this.#n.active=Boolean(o.active),this.#n.spinner=Boolean("spinner"in o&&o.spinner),this.#n.type="button","type"in o&&o.type&&(this.#n.type=o.type),this.#a(o.disabled||!1),this.#n.title=o.title,t.ScheduledRender.scheduleRender(this,this.#t)}set iconUrl(o){this.#n.iconUrl=o,t.ScheduledRender.scheduleRender(this,this.#t)}set variant(o){this.#n.variant=o,t.ScheduledRender.scheduleRender(this,this.#t)}set size(o){this.#n.size=o,t.ScheduledRender.scheduleRender(this,this.#t)}set iconWidth(o){this.#n.iconWidth=o,t.ScheduledRender.scheduleRender(this,this.#t)}set iconHeight(o){this.#n.iconHeight=o,t.ScheduledRender.scheduleRender(this,this.#t)}set type(o){this.#n.type=o,t.ScheduledRender.scheduleRender(this,this.#t)}set title(o){this.#n.title=o,t.ScheduledRender.scheduleRender(this,this.#t)}set disabled(o){this.#a(o),t.ScheduledRender.scheduleRender(this,this.#t)}set active(o){this.#n.active=o,t.ScheduledRender.scheduleRender(this,this.#t)}set spinner(o){this.#n.spinner=o,t.ScheduledRender.scheduleRender(this,this.#t)}#a(o){this.#n.disabled=o,this.toggleAttribute("disabled",o)}focus(){this.#o.querySelector("button")?.focus()}connectedCallback(){this.#o.adoptedStyleSheets=[e],t.ScheduledRender.scheduleRender(this,this.#t)}#i(o){if(this.#n.disabled)return o.stopPropagation(),void o.preventDefault();this.form&&"submit"===this.#n.type&&(o.preventDefault(),this.form.dispatchEvent(new SubmitEvent("submit",{submitter:this}))),this.form&&"reset"===this.#n.type&&(o.preventDefault(),this.form.reset())}#l(o){const r=o.target?.assignedNodes();this.#s=!r||!Boolean(r.length),t.ScheduledRender.scheduleRender(this,this.#t)}#r(){if(!this.#n.variant)throw new Error("Button requires a variant to be defined");if("toolbar"===this.#n.variant){if(!this.#n.iconUrl)throw new Error("Toolbar button requires an icon");if(!this.#s)throw new Error("Tooblar button does not accept children")}if("round"===this.#n.variant){if(!this.#n.iconUrl)throw new Error("Round button requires an icon");if(!this.#s)throw new Error("Round button does not accept children")}const t={primary:"primary"===this.#n.variant,secondary:"secondary"===this.#n.variant,toolbar:"toolbar"===this.#n.variant,round:"round"===this.#n.variant,"text-with-icon":Boolean(this.#n.iconUrl)&&!this.#s,"only-icon":Boolean(this.#n.iconUrl)&&this.#s,small:Boolean("SMALL"===this.#n.size||"TINY"===this.#n.size),tiny:Boolean("TINY"===this.#n.size),active:this.#n.active,"explicit-size":Boolean(this.#n.iconHeight||this.#n.iconWidth)},e={primary:"primary"===this.#n.variant,secondary:"secondary"===this.#n.variant,disabled:Boolean(this.#n.disabled),"spinner-component":!0};o.render(o.html` <button title="${o.Directives.ifDefined(this.#n.title)}" .disabled="${this.#n.disabled}" class="${o.Directives.classMap(t)}"> ${this.#n.iconUrl?o.html`<${r.Icon.Icon.litTagName} .data="${{iconPath:this.#n.iconUrl,color:"var(--color-background)",width:this.#n.iconWidth||void 0,height:this.#n.iconHeight||void 0}}"> </${r.Icon.Icon.litTagName}>`:""} ${this.#n.spinner?o.html`<span class="${o.Directives.classMap(e)}"></span>`:""} <slot @slotchange="${this.#l}"></slot> </button> `,this.#o,{host:this})}get value(){return this.#n.value||""}set value(o){this.#n.value=o}get form(){return this.#d.form}get name(){return this.getAttribute("name")}get type(){return this.#n.type}get validity(){return this.#d.validity}get validationMessage(){return this.#d.validationMessage}get willValidate(){return this.#d.willValidate}checkValidity(){return this.#d.checkValidity()}reportValidity(){return this.#d.reportValidity()}}t.CustomElements.defineComponent("devtools-button",i);var n=Object.freeze({__proto__:null,Button:i});export{n as Button};