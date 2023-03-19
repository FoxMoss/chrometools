import*as e from"../../../../core/i18n/i18n.js";import"../../../../core/sdk/sdk.js";import*as t from"../../../../ui/components/helpers/helpers.js";import*as i from"../../../../ui/components/render_coordinator/render_coordinator.js";import*as r from"../../../../ui/components/report_view/report_view.js";import*as a from"../../../../ui/lit-html/lit-html.js";import*as o from"../../../../ui/components/data_grid/data_grid.js";const s=new CSSStyleSheet;s.replaceSync(".preloading-noselected{position:absolute;display:flex;justify-content:center;align-items:center;overflow:auto;width:100%;background-color:var(--color-background);color:var(--color-text-secondary);font-size:13px}.preloading-noselected > div{display:block;width:100%;text-align:center}.preloading-noselected > div > p{white-space:pre-line}\n/*# sourceURL=preloadingDetailsReportView.css */\n");const l={selectAnElementForMoreDetails:"Select an element for more details",statusPrerendering:"Prerendering",statusActivated:"Activated",statusDiscarded:"Discarded",detailsBasicInformation:"Basic information",detailsStartedAt:"Started at",detailsTrigger:"Trigger",detailsStatus:"Status"},n=e.i18n.registerUIStrings("panels/application/preloading/components/PreloadingDetailsReportView.ts",l),d=e.i18n.getLocalizedString.bind(void 0,n);class c{static trigger(t){switch(t.trigger.kind){case"PrerenderingTriggerSpecRules":return e.i18n.lockedString("Speculation Rules");case"PrerenderingTriggerDUI":return e.i18n.lockedString("Direct User Input");case"PrerenderingTriggerDSE":return e.i18n.lockedString("Default Search Engine");case"PrerenderingTriggerOpaque":return e.i18n.lockedString("Opaque")}}static status(e){switch(e.status){case"Prerendering":return d(l.statusPrerendering);case"Activated":return d(l.statusActivated);case"Discarded":return d(l.statusDiscarded)}}}const p=i.RenderCoordinator.RenderCoordinator.instance();class g extends HTMLElement{static litTagName=a.literal`devtools-resources-preloading-details-report-view`;#e=this.attachShadow({mode:"open"});#t=null;connectedCallback(){this.#e.adoptedStyleSheets=[s]}set data(e){this.#t=e,this.#i()}async#i(){await p.write("PreloadingDetailsReportView render",(()=>{if(null===this.#t)return void a.render(a.html` <div class="preloading-noselected"> <div> <p>${d(l.selectAnElementForMoreDetails)}</p> </div> </div> `,this.#e,{host:this});const t=new Date(this.#t.startedAt).toLocaleString(),i=c.trigger(this.#t),o=c.status(this.#t);a.render(a.html` <${r.ReportView.Report.litTagName} .data="${{reportTitle:"Prerendering Attempt"}}"> <${r.ReportView.ReportSectionHeader.litTagName}>${d(l.detailsBasicInformation)}</${r.ReportView.ReportSectionHeader.litTagName}> <${r.ReportView.ReportKey.litTagName}>${e.i18n.lockedString("URL")}</${r.ReportView.ReportKey.litTagName}> <${r.ReportView.ReportValue.litTagName}> <div class="text-ellipsis" title="${this.#t.url}">${this.#t.url}</div> </${r.ReportView.ReportValue.litTagName}> <${r.ReportView.ReportKey.litTagName}>${d(l.detailsStartedAt)}</${r.ReportView.ReportKey.litTagName}> <${r.ReportView.ReportValue.litTagName}> <div class="text-ellipsis"> ${t} </div> </${r.ReportView.ReportValue.litTagName}> <${r.ReportView.ReportKey.litTagName}>${d(l.detailsTrigger)}</${r.ReportView.ReportKey.litTagName}> <${r.ReportView.ReportValue.litTagName}> <div class="text-ellipsis"> ${i} </div> </${r.ReportView.ReportValue.litTagName}> <${r.ReportView.ReportKey.litTagName}>${d(l.detailsStatus)}</${r.ReportView.ReportKey.litTagName}> <${r.ReportView.ReportValue.litTagName}> ${o} </${r.ReportView.ReportValue.litTagName}> ${this.#r()} </${r.ReportView.Report.litTagName}> `,this.#e,{host:this})}))}#r(){return this.#t?null===this.#t.discardedReason||void 0===this.#t.discardedReason?a.nothing:a.html` <${r.ReportView.ReportKey.litTagName}>${e.i18n.lockedString("Discarded reason")}</${r.ReportView.ReportKey.litTagName}> <${r.ReportView.ReportValue.litTagName}> ${this.#t.discardedReason} </${r.ReportView.ReportValue.litTagName}> `:a.nothing}}t.CustomElements.defineComponent("devtools-resources-preloading-details-report-view",g);var u=Object.freeze({__proto__:null,PreloadingDetailsReportView:g});const h=new CSSStyleSheet;h.replaceSync(":host{overflow:auto;height:100%}.preloading-container{height:100%;display:flex;flex-direction:column}.preloading-header{font-size:15px;background-color:var(--color-background-elevation-1);padding:1px 4px}.preloading-placeholder{flex-grow:1;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--color-text-secondary)}devtools-data-grid-controller{border:1px solid var(--color-details-hairline)}.inline-icon{vertical-align:text-bottom}\n/*# sourceURL=preloadingGrid.css */\n");const m={startedAt:"Started at",type:"Type",trigger:"Trigger",status:"Status"},R=e.i18n.registerUIStrings("panels/application/preloading/components/PreloadingGrid.ts",m),w=e.i18n.getLocalizedString.bind(void 0,R),{render:v,html:S}=a;class $ extends HTMLElement{static litTagName=a.literal`devtools-resources-preloading-grid`;#e=this.attachShadow({mode:"open"});#a=[];connectedCallback(){this.#e.adoptedStyleSheets=[h],this.#i()}update(e){this.#a=e,this.#i()}#i(){const t={columns:[{id:"startedAt",title:w(m.startedAt),widthWeighting:20,hideable:!1,visible:!0},{id:"type",title:w(m.type),widthWeighting:10,hideable:!1,visible:!0},{id:"trigger",title:w(m.trigger),widthWeighting:10,hideable:!1,visible:!0},{id:"url",title:e.i18n.lockedString("URL"),widthWeighting:40,hideable:!1,visible:!0},{id:"status",title:w(m.status),widthWeighting:20,hideable:!1,visible:!0}],rows:this.#o()};v(S` <div class="preloading-container"> <${o.DataGridController.DataGridController.litTagName} .data="${t}"> </${o.DataGridController.DataGridController.litTagName}> </div> `,this.#e,{host:this})}#o(){return this.#a.map((e=>({cells:[{columnId:"id",value:e.id},{columnId:"type",value:e.type},{columnId:"startedAt",value:e.startedAt},{columnId:"trigger",value:e.trigger},{columnId:"url",value:e.url},{columnId:"status",value:e.status}]})))}}t.CustomElements.defineComponent("devtools-resources-preloading-grid",$);var T=Object.freeze({__proto__:null,i18nString:w,PreloadingGrid:$});export{u as PreloadingDetailsReportView,T as PreloadingGrid};