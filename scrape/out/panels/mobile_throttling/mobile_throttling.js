import*as t from"../../core/i18n/i18n.js";import*as e from"../../core/sdk/sdk.js";import*as n from"../../core/common/common.js";import*as i from"../../core/host/host.js";import*as o from"../../ui/legacy/legacy.js";const r={noThrottling:"No throttling",noInternetConnectivity:"No internet connectivity",lowendMobile:"Low-end mobile",slowGXCpuSlowdown:"Slow 3G & 6x CPU slowdown",midtierMobile:"Mid-tier mobile",fastGXCpuSlowdown:"Fast 3G & 4x CPU slowdown",custom:"Custom",checkNetworkAndPerformancePanels:"Check Network and Performance panels"},s=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingPresets.ts",r),a=t.i18n.getLocalizedString.bind(void 0,s);class l{static getNoThrottlingConditions(){return{title:"function"==typeof e.NetworkManager.NoThrottlingConditions.title?e.NetworkManager.NoThrottlingConditions.title():e.NetworkManager.NoThrottlingConditions.title,description:a(r.noThrottling),network:e.NetworkManager.NoThrottlingConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling}}static getOfflineConditions(){return{title:"function"==typeof e.NetworkManager.OfflineConditions.title?e.NetworkManager.OfflineConditions.title():e.NetworkManager.OfflineConditions.title,description:a(r.noInternetConnectivity),network:e.NetworkManager.OfflineConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling}}static getLowEndMobileConditions(){return{title:a(r.lowendMobile),description:a(r.slowGXCpuSlowdown),network:e.NetworkManager.Slow3GConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.LowEndMobile}}static getMidTierMobileConditions(){return{title:a(r.midtierMobile),description:a(r.fastGXCpuSlowdown),network:e.NetworkManager.Fast3GConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.MidTierMobile}}static getCustomConditions(){return{title:a(r.custom),description:a(r.checkNetworkAndPerformancePanels)}}static getMobilePresets(){return[l.getMidTierMobileConditions(),l.getLowEndMobileConditions(),l.getCustomConditions()]}static getAdvancedMobilePresets(){return[l.getOfflineConditions()]}static networkPresets=[e.NetworkManager.Fast3GConditions,e.NetworkManager.Slow3GConditions,e.NetworkManager.OfflineConditions];static cpuThrottlingPresets=[e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling,e.CPUThrottlingManager.CPUThrottlingRates.MidTierMobile,e.CPUThrottlingManager.CPUThrottlingRates.LowEndMobile]}globalThis.MobileThrottling=globalThis.MobileThrottling||{},globalThis.MobileThrottling.networkPresets=l.networkPresets;var c=Object.freeze({__proto__:null,ThrottlingPresets:l});const d={disabled:"Disabled",presets:"Presets",custom:"Custom"},g=t.i18n.registerUIStrings("panels/mobile_throttling/NetworkThrottlingSelector.ts",d),h=t.i18n.getLocalizedString.bind(void 0,g);class u{populateCallback;selectCallback;customNetworkConditionsSetting;options;constructor(t,n,i){this.populateCallback=t,this.selectCallback=n,this.customNetworkConditionsSetting=i,this.customNetworkConditionsSetting.addChangeListener(this.populateOptions,this),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(()=>{this.networkConditionsChanged()}),this),this.populateOptions()}revealAndUpdate(){n.Revealer.reveal(this.customNetworkConditionsSetting),this.networkConditionsChanged()}optionSelected(t){e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(t)}populateOptions(){const t={title:h(d.disabled),items:[e.NetworkManager.NoThrottlingConditions]},n={title:h(d.presets),items:l.networkPresets},i={title:h(d.custom),items:this.customNetworkConditionsSetting.get()};if(this.options=this.populateCallback([t,n,i]),!this.networkConditionsChanged())for(let t=this.options.length-1;t>=0;t--)if(this.options[t]){this.optionSelected(this.options[t]);break}}networkConditionsChanged(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions();for(let n=0;n<this.options.length;++n){const i=this.options[n];if(i&&e.NetworkManager.networkConditionsEqual(t,i))return this.selectCallback(n),!0}return!1}}var w=Object.freeze({__proto__:null,NetworkThrottlingSelector:u});const p={sS:"{PH1}: {PH2}",add:"Add…",addS:"Add {PH1}",offline:"Offline",forceDisconnectedFromNetwork:"Force disconnected from network",throttling:"Throttling",cpuThrottlingIsEnabled:"CPU throttling is enabled",cpuThrottling:"CPU throttling",noThrottling:"No throttling",dSlowdown:"{PH1}× slowdown",excessConcurrency:"Exceeding the default value may degrade system performance.",resetConcurrency:"Reset to the default value",hardwareConcurrency:"Hardware concurrency",hardwareConcurrencyValue:"Value of navigator.hardwareConcurrency",hardwareConcurrencyIsEnabled:"Hardware concurrency override is enabled"},C=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingManager.ts",p),k=t.i18n.getLocalizedString.bind(void 0,C);let m,M;class b{cpuThrottlingControls;cpuThrottlingRates;customNetworkConditionsSetting;currentNetworkThrottlingConditionsSetting;lastNetworkThrottlingConditions;cpuThrottlingManager;#t=!1;get hardwareConcurrencyOverrideEnabled(){return this.#t}constructor(){this.cpuThrottlingManager=e.CPUThrottlingManager.CPUThrottlingManager.instance(),this.cpuThrottlingControls=new Set,this.cpuThrottlingRates=l.cpuThrottlingPresets,this.customNetworkConditionsSetting=n.Settings.Settings.instance().moduleSetting("customNetworkConditions"),this.currentNetworkThrottlingConditionsSetting=n.Settings.Settings.instance().createSetting("preferredNetworkCondition",e.NetworkManager.NoThrottlingConditions),this.currentNetworkThrottlingConditionsSetting.setSerializer(new e.NetworkManager.ConditionsSerializer),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(()=>{this.lastNetworkThrottlingConditions=this.currentNetworkThrottlingConditionsSetting.get(),this.currentNetworkThrottlingConditionsSetting.set(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions())})),this.isDirty()&&e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(this.currentNetworkThrottlingConditionsSetting.get())}static instance(t={forceNew:null}){const{forceNew:e}=t;return m&&!e||(m=new b),m}decorateSelectWithNetworkThrottling(t){let e=[];const n=new u((function(n){t.removeChildren(),e=[];for(let i=0;i<n.length;++i){const r=n[i],s=t.createChild("optgroup");s.label=r.title;for(const t of r.items){const n="function"==typeof t.title?t.title():t.title,i=new Option(n,n);o.ARIAUtils.setAccessibleName(i,k(p.sS,{PH1:r.title,PH2:n})),s.appendChild(i),e.push(t)}if(i===n.length-1){const t=new Option(k(p.add),k(p.add));o.ARIAUtils.setAccessibleName(t,k(p.addS,{PH1:r.title})),s.appendChild(t),e.push(null)}}return e}),(function(e){t.selectedIndex!==e&&(t.selectedIndex=e)}),this.customNetworkConditionsSetting);return t.addEventListener("change",(function(){if(t.selectedIndex===t.options.length-1)n.revealAndUpdate();else{const i=e[t.selectedIndex];i&&n.optionSelected(i)}}),!1),n}createOfflineToolbarCheckbox(){const t=new o.Toolbar.ToolbarCheckbox(k(p.offline),k(p.forceDisconnectedFromNetwork),function(){t.checked()?e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.OfflineConditions):e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(this.lastNetworkThrottlingConditions)}.bind(this));return e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(function(){t.setChecked(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions()===e.NetworkManager.OfflineConditions)})),t.setChecked(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions()===e.NetworkManager.OfflineConditions),t}createMobileThrottlingButton(){const t=new o.Toolbar.ToolbarMenuButton((function(t){for(let o=0;o<e.length;++o){const r=e[o];r&&(r.title===l.getCustomConditions().title&&r.description===l.getCustomConditions().description||t.defaultSection().appendCheckboxItem(r.title,i.optionSelected.bind(i,r),n===o))}}));t.setTitle(k(p.throttling)),t.setGlyph(""),t.turnIntoSelect(),t.setDarkText();let e=[],n=-1;const i=new P((function(t){e=[];for(const n of t){for(const t of n.items)e.push(t);e.push(null)}return e}),(function(i){n=i;const o=e[i];o&&(t.setText(o.title),t.setTitle(o.description))}));return t}updatePanelIcon(){const t=this.cpuThrottlingManager.cpuThrottlingRate();if(t===e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling&&!this.hardwareConcurrencyOverrideEnabled)return void o.InspectorView.InspectorView.instance().setPanelIcon("timeline",null);const n=o.Icon.Icon.create("smallicon-warning"),i=[];t!==e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling&&i.push(k(p.cpuThrottlingIsEnabled)),this.hardwareConcurrencyOverrideEnabled&&i.push(k(p.hardwareConcurrencyIsEnabled)),n.title=i.join("\n"),o.InspectorView.InspectorView.instance().setPanelIcon("timeline",n)}setCPUThrottlingRate(t){this.cpuThrottlingManager.setCPUThrottlingRate(t),t!==e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling&&i.userMetrics.actionTaken(i.UserMetrics.Action.CpuThrottlingEnabled);const n=this.cpuThrottlingRates.indexOf(t);for(const t of this.cpuThrottlingControls)t.setSelectedIndex(n);this.updatePanelIcon()}createCPUThrottlingSelector(){const t=new o.Toolbar.ToolbarComboBox((t=>this.setCPUThrottlingRate(this.cpuThrottlingRates[t.target.selectedIndex])),k(p.cpuThrottling));this.cpuThrottlingControls.add(t);const e=this.cpuThrottlingManager.cpuThrottlingRate();for(let n=0;n<this.cpuThrottlingRates.length;++n){const i=this.cpuThrottlingRates[n],o=1===i?k(p.noThrottling):k(p.dSlowdown,{PH1:i}),r=t.createOption(o);t.addOption(r),e===i&&t.setSelectedIndex(n)}return t}createHardwareConcurrencySelector(){const t=new o.Toolbar.ToolbarItem(o.UIUtils.createInput("devtools-text-input","number"));t.setTitle(k(p.hardwareConcurrencyValue));const e=t.element;e.min="1",t.setEnabled(!1);const n=new o.Toolbar.ToolbarCheckbox(k(p.hardwareConcurrency)),i=new o.Toolbar.ToolbarButton("Reset concurrency","largeicon-undo");i.setTitle(k(p.resetConcurrency));const r=new o.Toolbar.ToolbarItem(o.Icon.Icon.create("smallicon-warning"));return r.setTitle(k(p.excessConcurrency)),n.inputElement.disabled=!0,i.element.classList.add("timeline-concurrency-hidden"),r.element.classList.add("timeline-concurrency-hidden"),this.cpuThrottlingManager.getHardwareConcurrency().then((s=>{if(void 0===s)return;const a=t=>{t>=1&&this.cpuThrottlingManager.setHardwareConcurrency(t),t>s?r.element.classList.remove("timeline-concurrency-hidden"):r.element.classList.add("timeline-concurrency-hidden"),t===s?i.element.classList.add("timeline-concurrency-hidden"):i.element.classList.remove("timeline-concurrency-hidden")};e.value=`${s}`,e.oninput=()=>a(Number(e.value)),n.inputElement.disabled=!1,n.inputElement.addEventListener("change",(()=>{this.#t=n.checked(),this.updatePanelIcon(),t.setEnabled(this.hardwareConcurrencyOverrideEnabled),a(this.hardwareConcurrencyOverrideEnabled?Number(e.value):s)})),i.addEventListener(o.Toolbar.ToolbarButton.Events.Click,(()=>{e.value=`${s}`,a(s)}))})),{input:t,reset:i,warning:r,toggle:n}}setHardwareConcurrency(t){this.cpuThrottlingManager.setHardwareConcurrency(t)}isDirty(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),n=this.currentNetworkThrottlingConditionsSetting.get();return!e.NetworkManager.networkConditionsEqual(t,n)}}class T{static instance(t={forceNew:null}){const{forceNew:e}=t;return M&&!e||(M=new T),M}handleAction(t,n){return"network-conditions.network-online"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.NoThrottlingConditions),!0):"network-conditions.network-low-end-mobile"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.Slow3GConditions),!0):"network-conditions.network-mid-tier-mobile"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.Fast3GConditions),!0):"network-conditions.network-offline"===n&&(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.OfflineConditions),!0)}}function N(){return b.instance()}var f=Object.freeze({__proto__:null,ThrottlingManager:b,ActionDelegate:T,throttlingManager:N});const v={disabled:"Disabled",presets:"Presets",advanced:"Advanced"},S=t.i18n.registerUIStrings("panels/mobile_throttling/MobileThrottlingSelector.ts",v),x=t.i18n.getLocalizedString.bind(void 0,S);class P{populateCallback;selectCallback;options;constructor(t,n){this.populateCallback=t,this.selectCallback=n,e.CPUThrottlingManager.CPUThrottlingManager.instance().addEventListener(e.CPUThrottlingManager.Events.RateChanged,this.conditionsChanged,this),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,this.conditionsChanged,this),this.options=this.populateOptions(),this.conditionsChanged()}optionSelected(t){e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(t.network),N().setCPUThrottlingRate(t.cpuThrottlingRate)}populateOptions(){const t={title:x(v.disabled),items:[l.getNoThrottlingConditions()]},e={title:x(v.presets),items:l.getMobilePresets()},n={title:x(v.advanced),items:l.getAdvancedMobilePresets()};return this.populateCallback([t,e,n])}conditionsChanged(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),n=e.CPUThrottlingManager.CPUThrottlingManager.instance().cpuThrottlingRate();for(let e=0;e<this.options.length;++e){const i=this.options[e];if(i&&"network"in i&&i.network===t&&i.cpuThrottlingRate===n)return void this.selectCallback(e)}const i=l.getCustomConditions();for(let t=0;t<this.options.length;++t){const e=this.options[t];if(e&&e.title===i.title&&e.description===i.description)return void this.selectCallback(t)}}}var I=Object.freeze({__proto__:null,MobileThrottlingSelector:P});const y={networkThrottlingIsEnabled:"Network throttling is enabled",requestsMayBeRewrittenByLocal:"Requests may be rewritten by local overrides",requestsMayBeBlocked:"Requests may be blocked",acceptedEncodingOverrideSet:"The set of accepted `Content-Encoding` headers has been modified by DevTools. See the Network Conditions panel."},E=t.i18n.registerUIStrings("panels/mobile_throttling/NetworkPanelIndicator.ts",y),U=t.i18n.getLocalizedString.bind(void 0,E);var R=Object.freeze({__proto__:null,NetworkPanelIndicator:class{constructor(){if(!o.InspectorView.InspectorView.instance().hasPanel("network"))return;const t=e.NetworkManager.MultitargetNetworkManager.instance();function n(){let n=null;t.isThrottling()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,U(y.networkThrottlingIsEnabled))):e.NetworkManager.MultitargetNetworkManager.instance().isIntercepting()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,U(y.requestsMayBeRewrittenByLocal))):t.isBlocking()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,U(y.requestsMayBeBlocked))):t.isAcceptedEncodingOverrideSet()&&(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,U(y.acceptedEncodingOverrideSet))),o.InspectorView.InspectorView.instance().setPanelIcon("network",n)}t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.BlockedPatternsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.InterceptorsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.AcceptedEncodingsChanged,n),n()}}});const A=new CSSStyleSheet;A.replaceSync(":host{overflow:hidden}.header{padding:0 0 6px;border-bottom:1px solid var(--color-details-hairline);font-size:18px;font-weight:normal;flex:none}.add-conditions-button{flex:none;margin:10px 2px;min-width:140px;align-self:flex-start}.conditions-list{max-width:500px;min-width:340px;flex:auto}.conditions-list-item{padding:3px 5px;height:30px;display:flex;align-items:center;position:relative;flex:auto 1 1}.conditions-list-text{white-space:nowrap;text-overflow:ellipsis;flex:0 0 70px;user-select:none;color:var(--color-text-primary);text-align:end;position:relative}.conditions-list-text:last-child{flex-basis:140px;text-align:left}.conditions-edit-row .conditions-list-text:last-child{text-align:right}.conditions-list-title{text-align:start;display:flex;flex:auto;align-items:flex-start}.conditions-list-title-text{overflow:hidden;flex:auto;white-space:nowrap;text-overflow:ellipsis}.conditions-list-separator{flex:0 0 1px;background-color:var(--color-background-elevation-2);height:30px;margin:0 4px}.conditions-list-separator-invisible{visibility:hidden;height:100%!important}.conditions-edit-row{flex:none;display:flex;flex-direction:row;margin:6px 5px}.conditions-edit-row input{width:100%;text-align:inherit}.conditions-edit-optional{position:absolute;bottom:-20px;right:0;color:var(--color-text-disabled)}.editor-buttons{margin-top:10px}\n/*# sourceURL=throttlingSettingsTab.css */\n");const L={networkThrottlingProfiles:"Network Throttling Profiles",addCustomProfile:"Add custom profile...",dms:"{PH1} `ms`",profileName:"Profile Name",download:"Download",upload:"Upload",latency:"Latency",optional:"optional",profileNameCharactersLengthMust:"Profile Name characters length must be between 1 to {PH1} inclusive",sMustBeANumberBetweenSkbsToSkbs:"{PH1} must be a number between {PH2} `kbit/s` to {PH3} `kbit/s` inclusive",latencyMustBeAnIntegerBetweenSms:"Latency must be an integer between {PH1} `ms` to {PH2} `ms` inclusive",dskbits:"{PH1} `kbit/s`",fsmbits:"{PH1} `Mbit/s`"},O=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingSettingsTab.ts",L),H=t.i18n.getLocalizedString.bind(void 0,O);let _;class B extends o.Widget.VBox{list;customSetting;editor;constructor(){super(!0);const t=this.contentElement.createChild("div","header");t.textContent=H(L.networkThrottlingProfiles),o.ARIAUtils.markAsHeading(t,1);const e=o.UIUtils.createTextButton(H(L.addCustomProfile),this.addButtonClicked.bind(this),"add-conditions-button");this.contentElement.appendChild(e),this.list=new o.ListWidget.ListWidget(this),this.list.element.classList.add("conditions-list"),this.list.show(this.contentElement),this.customSetting=n.Settings.Settings.instance().moduleSetting("customNetworkConditions"),this.customSetting.addChangeListener(this.conditionsUpdated,this),this.setDefaultFocusedElement(e)}static instance(t={forceNew:null}){const{forceNew:e}=t;return _&&!e||(_=new B),_}wasShown(){super.wasShown(),this.list.registerCSSFiles([A]),this.registerCSSFiles([A]),this.conditionsUpdated()}conditionsUpdated(){this.list.clear();const t=this.customSetting.get();for(let e=0;e<t.length;++e)this.list.appendItem(t[e],!0);this.list.appendSeparator()}addButtonClicked(){this.list.addNewItem(this.customSetting.get().length,{title:()=>"",download:-1,upload:-1,latency:0})}renderItem(t,e){const n=document.createElement("div");n.classList.add("conditions-list-item");const i=n.createChild("div","conditions-list-text conditions-list-title").createChild("div","conditions-list-title-text"),r=this.retrieveOptionsTitle(t);return i.textContent=r,o.Tooltip.Tooltip.install(i,r),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=z(t.download),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=z(t.upload),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=H(L.dms,{PH1:t.latency}),n}removeItemRequested(t,e){const n=this.customSetting.get();n.splice(e,1),this.customSetting.set(n)}retrieveOptionsTitle(t){return"function"==typeof t.title?t.title():t.title}commitEdit(t,e,n){t.title=e.control("title").value.trim();const i=e.control("download").value.trim();t.download=i?125*parseInt(i,10):-1;const o=e.control("upload").value.trim();t.upload=o?125*parseInt(o,10):-1;const r=e.control("latency").value.trim();t.latency=r?parseInt(r,10):0;const s=this.customSetting.get();n&&s.push(t),this.customSetting.set(s)}beginEdit(t){const e=this.createEditor();return e.control("title").value=this.retrieveOptionsTitle(t),e.control("download").value=t.download<=0?"":String(t.download/125),e.control("upload").value=t.upload<=0?"":String(t.upload/125),e.control("latency").value=t.latency?String(t.latency):"",e}createEditor(){if(this.editor)return this.editor;const e=new o.ListWidget.Editor;this.editor=e;const n=e.contentElement(),i=n.createChild("div","conditions-edit-row"),r=i.createChild("div","conditions-list-text conditions-list-title"),s=H(L.profileName);r.createChild("div","conditions-list-title-text").textContent=s,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const a=i.createChild("div","conditions-list-text"),l=H(L.download);a.createChild("div","conditions-list-title-text").textContent=l,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const c=i.createChild("div","conditions-list-text").createChild("div","conditions-list-title-text"),d=H(L.upload);c.textContent=d,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const g=i.createChild("div","conditions-list-text"),h=H(L.latency);g.createChild("div","conditions-list-title-text").textContent=h;const u=n.createChild("div","conditions-edit-row"),w=e.createInput("title","text","",(function(t,e,n){const i=n.value.trim(),o=i.length>0&&i.length<=49;if(!o){const t=H(L.profileNameCharactersLengthMust,{PH1:49});return{valid:o,errorMessage:t}}return{valid:o,errorMessage:void 0}}));o.ARIAUtils.setAccessibleName(w,s),u.createChild("div","conditions-list-text conditions-list-title").appendChild(w),u.createChild("div","conditions-list-separator conditions-list-separator-invisible");let p=u.createChild("div","conditions-list-text");const C=e.createInput("download","text",t.i18n.lockedString("kbit/s"),T);p.appendChild(C),o.ARIAUtils.setAccessibleName(C,l);const k=p.createChild("div","conditions-edit-optional"),m=H(L.optional);k.textContent=m,o.ARIAUtils.setDescription(C,m),u.createChild("div","conditions-list-separator conditions-list-separator-invisible"),p=u.createChild("div","conditions-list-text");const M=e.createInput("upload","text",t.i18n.lockedString("kbit/s"),T);o.ARIAUtils.setAccessibleName(M,d),p.appendChild(M);p.createChild("div","conditions-edit-optional").textContent=m,o.ARIAUtils.setDescription(M,m),u.createChild("div","conditions-list-separator conditions-list-separator-invisible"),p=u.createChild("div","conditions-list-text");const b=e.createInput("latency","text",t.i18n.lockedString("ms"),(function(t,e,n){const i=1e6,o=n.value.trim(),r=Number(o),s=Number.isInteger(r)&&r>=0&&r<=i;if(!s){const t=H(L.latencyMustBeAnIntegerBetweenSms,{PH1:0,PH2:i});return{valid:s,errorMessage:t}}return{valid:s,errorMessage:void 0}}));o.ARIAUtils.setAccessibleName(b,h),p.appendChild(b);return p.createChild("div","conditions-edit-optional").textContent=m,o.ARIAUtils.setDescription(b,m),e;function T(t,e,n){const i=1e7,o=n.value.trim(),r=Number(o),s=n.getAttribute("aria-label"),a=!Number.isNaN(r)&&r>=0&&r<=i;if(!a){return{valid:a,errorMessage:H(L.sMustBeANumberBetweenSkbsToSkbs,{PH1:String(s),PH2:0,PH3:i})}}return{valid:a,errorMessage:void 0}}}}function z(t){if(t<0)return"";const e=t/125;if(e<1e3)return H(L.dskbits,{PH1:e});if(e<1e4){const t=(e/1e3).toFixed(1);return H(L.fsmbits,{PH1:t})}return H(L.fsmbits,{PH1:e/1e3|0})}var D=Object.freeze({__proto__:null,ThrottlingSettingsTab:B});export{I as MobileThrottlingSelector,R as NetworkPanelIndicator,w as NetworkThrottlingSelector,f as ThrottlingManager,c as ThrottlingPresets,D as ThrottlingSettingsTab};
