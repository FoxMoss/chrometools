import*as e from"../../../core/common/common.js";import*as t from"../../../core/i18n/i18n.js";import*as o from"../../../services/window_bounds/window_bounds.js";import*as n from"../../../third_party/codemirror.next/codemirror.next.js";import*as r from"../code_highlighter/code_highlighter.js";import*as i from"../icon_button/icon_button.js";import*as s from"../../../core/sdk/sdk.js";import*as a from"../../../models/bindings/bindings.js";import*as c from"../../../models/javascript_metadata/javascript_metadata.js";import*as l from"../../legacy/legacy.js";import*as d from"../../legacy/theme_support/theme_support.js";import*as u from"../../lit-html/lit-html.js";import*as m from"../helpers/helpers.js";const p=n.EditorView.theme({"&.cm-editor":{color:"color: var(--color-text-primary)",cursor:"auto","&.cm-focused":{outline:"none"}},".cm-scroller":{lineHeight:"1.2em",fontFamily:"var(--source-code-font-family)",fontSize:"var(--source-code-font-size)"},".cm-panels":{backgroundColor:"var(--color-background-elevation-1)"},".cm-selectionMatch":{backgroundColor:"var(--color-selection-highlight)"},".cm-cursor":{borderLeft:"1px solid var(--color-background-inverted)"},"&.cm-readonly .cm-cursor":{display:"none"},".cm-cursor-secondary":{borderLeft:"1px solid var(--color-secondary-cursor)"},".cm-selectionBackground":{background:"var(--color-editor-selection)"},"&.cm-focused .cm-selectionBackground":{background:"var(--color-editor-selection)"},".cm-gutters":{borderRight:"1px solid var(--color-details-hairline)",whiteSpace:"nowrap",backgroundColor:"var(--color-background)"},".cm-gutters .cm-foldGutterElement":{cursor:"pointer",opacity:"0%",transition:"opacity 0.2s"},".cm-gutters .cm-foldGutterElement-folded, .cm-gutters:hover .cm-foldGutterElement":{opacity:"100%"},".cm-lineNumbers":{overflow:"visible",minWidth:"40px"},".cm-lineNumbers .cm-gutterElement":{color:"var(--color-line-number)",padding:"0 3px 0 9px"},".cm-foldPlaceholder":{background:"transparent",border:"none",color:"var(--color-text-secondary)"},".cm-matchingBracket, .cm-nonmatchingBracket":{background:"transparent",borderBottom:"none"},"&:focus-within .cm-matchingBracket":{color:"inherit",backgroundColor:"var(--color-matching-bracket-background)",borderBottom:"1px solid var(--color-matching-bracket-underline)"},"&:focus-within .cm-nonmatchingBracket":{backgroundColor:"var(--color-nonmatching-bracket-background)",borderBottom:"1px solid var(--color-nonmatching-bracket-underline)"},".cm-trailingWhitespace":{backgroundColor:"var(--color-trailing-whitespace)"},".cm-highlightedTab":{display:"inline-block",position:"relative","&:before":{content:'""',borderBottom:"1px solid var(--color-text-secondary)",position:"absolute",left:"5%",bottom:"50%",width:"90%",pointerEvents:"none"}},".cm-highlightedSpaces:before":{color:"var(--color-text-secondary)",content:"attr(data-display)",position:"absolute",pointerEvents:"none"},".cm-placeholder":{color:"var(--color-text-secondary)"},".cm-completionHint":{color:"var(--color-text-secondary)"},".cm-tooltip":{boxShadow:"var(--drop-shadow)",backgroundColor:"var(--color-background-elevation-1)"},".cm-argumentHints":{pointerEvents:"none",padding:"0 4px",whiteSpace:"nowrap",lineHeight:"20px",marginBottom:"4px",width:"fit-content"},".cm-tooltip.cm-tooltip-autocomplete > ul":{backgroundColor:"var(--color-background)",maxHeight:"25em",minWidth:"16em","& > li":{border:"1px solid var(--color-background)"},"& > li.cm-secondaryCompletion":{display:"flex",backgroundColor:"var(--color-background-elevation-1)",borderColor:"var(--color-background-elevation-1)",justifyContent:"space-between","&::before":{content:'">"',fontWeight:"bold",color:"var(--color-primary-variant)",marginRight:"5px"}},"& > li:hover":{backgroundColor:"var(--item-hover-color)"},"& > li[aria-selected]":{backgroundColor:"var(--color-selected-option-background)",borderColor:"var(--color-selected-option-background)","&, &.cm-secondaryCompletion::before":{color:"var(--color-selected-option)"}}},".cm-tooltip.cm-tooltip-autocomplete.cm-conservativeCompletion > ul > li[aria-selected]":{backgroundColor:"var(--color-background)",border:"1px dotted var(--color-text-primary)","&, &.cm-secondaryCompletion::before":{color:"var(--color-text-primary)"}},".cm-completionMatchedText":{textDecoration:"none",fontWeight:"bold"},".cm-highlightedLine":{animation:"cm-fading-highlight 2s 0s"},"@keyframes cm-fading-highlight":{from:{backgroundColor:"var(--color-highlighted-line)"},to:{backgroundColor:"transparent"}}}),h={codeEditor:"Code editor"},f=t.i18n.registerUIStrings("ui/components/text_editor/config.ts",h),g=t.i18n.getLocalizedString.bind(void 0,f),b=[],v=n.Facet.define();class y{settingName;getExtension;compartment=new n.Compartment;constructor(e,t){this.settingName=e,this.getExtension=t}settingValue(){return e.Settings.Settings.instance().moduleSetting(this.settingName).get()}instance(){return[this.compartment.of(this.getExtension(this.settingValue())),v.of(this)]}sync(e,t){const o=this.compartment.get(e),n=this.getExtension(t);return o===n?null:this.compartment.reconfigure(n)}static bool(e,t,o=b){return new y(e,(e=>e?t:o))}static none=[]}const w=y.bool("textEditorTabMovesFocus",[],n.keymap.of([{key:"Tab",run:e=>!!e.state.doc.length&&n.indentMore(e),shift:e=>!!e.state.doc.length&&n.indentLess(e)}])),S=n.StateField.define({create:()=>!0,update:(e,t)=>"active"!==n.completionStatus(t.state)||(n.selectedCompletionIndex(t.startState)??0)===(n.selectedCompletionIndex(t.state)??0)&&e});function x(e){return!e.state.field(S,!1)&&n.acceptCompletion(e)}function E(e){const t=e.state.selection.main.head,o=e.state.doc.lineAt(t);return!!(t-o.from>=o.length)&&n.acceptCompletion(e)}const C=new y("textEditorAutocompletion",(e=>[n.autocompletion({activateOnTyping:e,icons:!1,optionClass:e=>"secondary"===e.type?"cm-secondaryCompletion":"",tooltipClass:e=>e.field(S,!1)?"cm-conservativeCompletion":"",defaultKeymap:!1}),n.Prec.highest(n.keymap.of([{key:"End",run:E},{key:"ArrowRight",run:E},{key:"Ctrl-Space",run:n.startCompletion},{key:"Escape",run:n.closeCompletion},{key:"ArrowDown",run:n.moveCompletionSelection(!0)},{key:"ArrowUp",run:n.moveCompletionSelection(!1)},{mac:"Ctrl-n",run:n.moveCompletionSelection(!0)},{mac:"Ctrl-p",run:n.moveCompletionSelection(!1)},{key:"PageDown",run:n.moveCompletionSelection(!0,"page")},{key:"PageUp",run:n.moveCompletionSelection(!1,"page")},{key:"Enter",run:x}]))])),k=y.bool("textEditorBracketMatching",n.bracketMatching()),M=y.bool("textEditorCodeFolding",[n.foldGutter({markerDOM(e){const t=e?"triangle-expanded":"triangle-collapsed",o=new i.Icon.Icon;return o.setAttribute("class",e?"cm-foldGutterElement":"cm-foldGutterElement cm-foldGutterElement-folded"),o.data={iconName:t,color:"var(--color-text-secondary)",width:"12px",height:"12px"},o}}),n.keymap.of(n.foldKeymap)]);function D(t){const o=Object.create(null);let n=0;for(let e=t.iterLines(1,Math.min(t.lines+1,1e3));!e.next().done;){let t=/^\s*/.exec(e.value)[0];if(t.length!==e.value.length&&t.length&&"*"!==e.value[t.length]){if("\t"===t[0])t="\t";else if(/[^ ]/.test(t))continue;n++,o[t]=(o[t]||0)+1}}const r=.05*n;return Object.entries(o).reduce(((e,[t,o])=>o<r||e&&e.length<t.length?e:t),null)??e.Settings.Settings.instance().moduleSetting("textEditorIndent").get()}const T=n.Prec.highest(n.indentUnit.compute([],(e=>D(e.doc)))),P=y.bool("textEditorAutoDetectIndent",T);function j(e){return n.ViewPlugin.define((t=>({decorations:e.createDeco(t),update(t){this.decorations=e.updateDeco(t,this.decorations)}})),{decorations:e=>e.decorations})}const L=new Map;const B=j(new n.MatchDecorator({regexp:/\t| +/g,decoration:e=>function(e){const t=L.get(e);if(t)return t;const o=n.Decoration.mark({attributes:"\t"===e?{class:"cm-highlightedTab"}:{class:"cm-highlightedSpaces","data-display":"·".repeat(e.length)}});return L.set(e,o),o}(e[0]),boundary:/\S/})),N=j(new n.MatchDecorator({regexp:/\s+$/g,decoration:n.Decoration.mark({class:"cm-trailingWhitespace"}),boundary:/\S/})),O=new y("showWhitespacesInEditor",(e=>"all"===e?B:"trailing"===e?N:b)),I=y.bool("allowScrollPastEof",n.scrollPastEnd()),A=Object.create(null);const _=new y("textEditorIndent",(function(e){let t=A[e];return t||(t=A[e]=n.indentUnit.of(e)),t})),F=y.bool("domWordWrap",n.EditorView.lineWrapping);function W(e){return/\r\n/.test(e)&&!/(^|[^\r])\n/.test(e)?n.EditorState.lineSeparator.of("\r\n"):[]}const z=n.keymap.of([{key:"Tab",run:n.acceptCompletion},{key:"Ctrl-m",run:n.cursorMatchingBracket,shift:n.selectMatchingBracket},{key:"Mod-/",run:n.toggleComment},{key:"Mod-d",run:n.selectNextOccurrence},{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:n.cursorSubwordBackward,shift:n.selectSubwordBackward},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:n.cursorSubwordForward,shift:n.selectSubwordForward},...n.standardKeymap,...n.historyKeymap]);function H(){const t=e.Settings.Settings.instance().moduleSetting("uiTheme").get();return"systemPreferred"===t?window.matchMedia("(prefers-color-scheme: dark)").matches:"dark"===t}const R=n.EditorView.theme({},{dark:!0}),$=new n.Compartment;function V(){return[p,H()?$.of(R):$.of([])]}let U=null;function G(){return U||(U=o.WindowBoundsService.WindowBoundsServiceImpl.instance().getDevToolsBoundingElement()),U.getBoundingClientRect()}function K(e){return[V(),n.highlightSpecialChars(),n.highlightSelectionMatches(),n.history(),n.drawSelection(),n.EditorState.allowMultipleSelections.of(!0),n.indentOnInput(),n.syntaxHighlighting(r.CodeHighlighter.highlightStyle),z,n.EditorView.clickAddsSelectionRange.of((e=>e.altKey||e.ctrlKey)),w.instance(),k.instance(),_.instance(),n.Prec.lowest(n.EditorView.contentAttributes.of({"aria-label":g(h.codeEditor)})),e instanceof n.Text?[]:W(e),n.tooltips({parent:Q(),tooltipSpace:G})]}const J=[n.closeBrackets(),n.keymap.of(n.closeBracketsKeymap)];let q=null;function Q(){if(!q){const e=n.EditorState.create({extensions:[p,H()?R:[],n.syntaxHighlighting(r.CodeHighlighter.highlightStyle),n.showTooltip.of({pos:0,create:()=>({dom:document.createElement("div")})})]}).facet(n.EditorView.styleModule),t=document.body.appendChild(document.createElement("div"));t.className="editor-tooltip-host",q=t.attachShadow({mode:"open"}),n.StyleModule.mount(q,e)}return q}class X extends n.WidgetType{text;constructor(e){super(),this.text=e}eq(e){return this.text===e.text}toDOM(){const e=document.createElement("span");return e.className="cm-completionHint",e.textContent=this.text,e}}const Y=n.ViewPlugin.fromClass(class{decorations=n.Decoration.none;currentHint=null;update(e){const t=this.currentHint=this.topCompletion(e.state);this.decorations=t?n.Decoration.set([n.Decoration.widget({widget:new X(t),side:1}).range(e.state.selection.main.head)]):n.Decoration.none}topCompletion(e){const t=n.selectedCompletion(e);if(!t)return null;let{label:o,apply:r}=t;if("string"==typeof r&&(o=r,r=void 0),r||o.length>100||o.indexOf("\n")>-1||"secondary"===t.type)return null;const i=e.selection.main.head,s=e.doc.lineAt(i);if(i!==s.to)return null;const a=("'"===o[0]?/'(\\.|[^'\\])*$/:'"'===o[0]?/"(\\.|[^"\\])*$/:/#?[\w$]+$/).exec(s.text);return a&&!o.startsWith(a[0])?null:o.slice(a?a[0].length:0)}},{decorations:e=>e.decorations});var Z=Object.freeze({__proto__:null,dynamicSetting:v,DynamicSetting:y,tabMovesFocus:w,conservativeCompletion:S,autocompletion:C,bracketMatching:k,codeFolding:M,guessIndent:D,autoDetectIndent:P,showWhitespace:O,allowScrollPastEof:I,indentUnit:_,domWordWrap:F,dummyDarkTheme:R,themeSelection:$,theme:V,baseConfiguration:K,closeBrackets:J,showCompletionHint:Y,contentIncludingHint:function(e){const t=e.plugin(Y);let o=e.state.doc.toString();if(t&&t.currentHint){const{head:n}=e.state.selection.main;o=o.slice(0,n)+t.currentHint+o.slice(n)}return o}});const ee=n.StateEffect.define();class te{completions;seen;constructor(e=[],t=new Set){this.completions=e,this.seen=t}add(e){this.seen.has(e.label)||(this.seen.add(e.label),this.completions.push(e))}copy(){return new te(this.completions.slice(),new Set(this.seen))}}const oe=["async","await","break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","false","finally","for","function","if","import","in","instanceof","let","new","null","of","return","static","super","switch","this","throw","true","try","typeof","var","void","while","with","yield"],ne=["clear","copy","debug","dir","dirxml","getEventListeners","inspect","keys","monitor","monitorEvents","profile","profileEnd","queryObjects","table","undebug","unmonitor","unmonitorEvents","values"],re=["$","$$","$x","$0","$_"],ie=new te;for(const e of oe)ie.add({label:e,type:"keyword"});for(const e of ne)ie.add({label:e,type:"function"});for(const e of re)ie.add({label:e,type:"variable"});const se=new Set(["TemplateString","LineComment","BlockComment","TypeDefinition","VariableDefinition","PropertyDefinition","TypeName"]);function ae(e,t,o){let n=e.resolveInner(t,-1);const r=n.parent;if(se.has(n.name))return null;if("PropertyName"===n.name||"PrivatePropertyName"===n.name)return"MemberExpression"!==r?.name?null:{type:1,from:n.from,relatedNode:r};if("VariableName"===n.name||!n.firstChild&&n.to-n.from<20&&!/[^a-z]/.test(o.sliceString(n.from,n.to)))return{type:0,from:n.from};if("String"===n.name){const e=n.parent;return"MemberExpression"===e?.name&&"["===e.childBefore(n.from)?.name?{type:2,from:n.from,relatedNode:e}:null}if(n=n.enterUnfinishedNodesBefore(t),n.to===t&&"MemberExpression"===n.parent?.name&&(n=n.parent),"MemberExpression"===n.name){const e=n.childBefore(Math.min(t,n.to));if("["===e?.name)return{type:2,relatedNode:n};if("."===e?.name||"?."===e?.name)return{type:1,relatedNode:n}}if("("===n.name&&"ArgList"===r?.name&&"CallExpression"===r?.parent?.name){const e=r?.parent?.firstChild;if("MemberExpression"===e?.name){const t=e?.lastChild;if(t&&"get"===o.sliceString(t.from,t.to)){const t=e?.firstChild;return{type:3,relatedNode:t||void 0}}}}return{type:0}}async function ce(e){const t=ae(n.syntaxTree(e.state),e.pos,e.state.doc);if(!t||void 0===t.from&&!e.explicit&&0===t.type)return null;const o=me()?.debuggerModel.selectedCallFrame()?.script;if(o&&a.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().pluginManager?.hasPluginForScript(o))return null;let r,i;if(0===t.type){const[e,t]=await Promise.all([ve(),ye()]);if(e.completions.length){r=e;for(const e of t.completions)r.add(e)}else r=t}else if(1===t.type||2===t.type){const o=t.relatedNode.getChild("Expression");if(2===t.type&&(i=void 0===t.from?"'":e.state.sliceDoc(t.from,t.from+1)),!o)return null;r=await async function(e,t,o=!1){const n=ge.instance();if(!t){const t=n.get(e);if(t)return t}const r=me();if(!r)return new te;const i=be(e,r,t,o);t||n.set(e,i);return i}(e.state.sliceDoc(o.from,o.to),i,"]"===e.state.sliceDoc(e.pos,e.pos+1))}else{if(3!==t.type)return null;{const o=t.relatedNode;if(!o)return null;r=await async function(e){const t=new te,o=me();if(!o)return t;const n=await pe(o,`[...Map.prototype.keys.call(${e})]`,"completion");if(!n)return t;const r=s.RemoteObject.RemoteArray.objectAsArray(n),i=r.length();for(let e=0;e<i;e++)t.add({label:`"${(await r.at(e)).value}")`,type:"constant",boost:-1*e});return t}(e.state.sliceDoc(o.from,o.to))}}return{from:t.from??e.pos,options:r.completions,validFor:i?"'"===i?de:ue:le}}const le=/^#?(?:[$_\p{ID_Start}])(?:[$_\u200C\u200D\p{ID_Continue}])*$/u,de=/^\'(\\.|[^\\'\n])*'?$/,ue=/^"(\\.|[^\\"\n])*"?$/;function me(){return l.Context.Context.instance().flavor(s.RuntimeModel.ExecutionContext)}async function pe(e,t,o){const n=await e.evaluate({expression:t,objectGroup:o,includeCommandLineAPI:!0,silent:!0,returnByValue:!1,generatePreview:!1,throwOnSideEffect:!0,timeout:500},!1,!1);return"error"in n||n.exceptionDetails||!n.object?null:n.object}const he=new Map([["string","String"],["symbol","Symbol"],["number","Number"],["boolean","Boolean"],["bigint","BigInt"]]);let fe=null;class ge{#e=new Map;constructor(){const e=()=>this.#e.clear();s.ConsoleModel.ConsoleModel.instance().addEventListener(s.ConsoleModel.Events.CommandEvaluated,e),l.Context.Context.instance().addFlavorChangeListener(s.RuntimeModel.ExecutionContext,e),s.TargetManager.TargetManager.instance().addModelListener(s.DebuggerModel.DebuggerModel,s.DebuggerModel.Events.DebuggerResumed,e),s.TargetManager.TargetManager.instance().addModelListener(s.DebuggerModel.DebuggerModel,s.DebuggerModel.Events.DebuggerPaused,e)}get(e){return this.#e.get(e)}set(e,t){this.#e.set(e,t),window.setTimeout((()=>{this.#e.get(e)===t&&this.#e.delete(e)}),3e4)}static instance(){return fe||(fe=new ge),fe}}async function be(e,t,o,n=!1){const r=new te;if(!t)return r;let i=await pe(t,e,"completion");if(!i)return r;for(;"object"===i.type&&"proxy"===i.subtype;){const e=(await i.getOwnProperties(!1)).internalProperties?.find((e=>"[[Target]]"===e.name))?.value;if(!e)break;i=e}const s=he.get(i.type);s&&(i=await pe(t,s+".prototype","completion"));const a="globalThis"===e?"function":"method",c="globalThis"===e?"variable":"property";if(i&&("object"===i.type||"function"===i.type)){const t=await i.getAllProperties(!1,!1,!0),s="function"===i.type;for(const i of t.properties||[])if(!i.symbol&&(!s||"arguments"!==i.name&&"caller"!==i.name)&&(!i.private||"this"===e)&&(o||le.test(i.name))){const e=o?o+i.name.replaceAll("\\","\\\\").replaceAll(o,"\\"+o)+o:i.name,t=o&&!n?`${e}]`:void 0,s=2*Number(i.isOwn)+1*Number(i.enumerable),l="function"===i.value?.type?a:c;r.add({apply:t,label:e,type:l,boost:s})}}return t.runtimeModel.releaseObjectGroup("completion"),r}async function ve(){const e=new te,t=me()?.debuggerModel.selectedCallFrame();if(!t)return e;const o=await Promise.all(t.scopeChain().map((e=>e.object().getAllProperties(!1,!1))));for(const t of o)for(const o of t.properties||[])e.add({label:o.name,type:"function"===o.value?.type?"function":"variable"});return e}async function ye(){const e=ge.instance(),t=e.get("");if(t)return t;const o=me();if(!o)return ie;const n=ie.copy(),r=be("globalThis",o).then((e=>o.globalLexicalScopeNames().then((t=>{for(const t of e.completions)n.add(t);for(const e of t||[])n.add({label:e,type:"variable"});return n}))));return e.set("",r),r}async function we(e,t){const o=n.syntaxTree(e).resolveInner(t).enterUnfinishedNodesBefore(t);if("ArgList"!==o.name)return null;const r=o.parent?.getChild("Expression");if(!r)return null;const i=await async function(e,t){const o=me();if(!o)return null;const n=t.sliceString(e.from,e.to),r=await pe(o,n,"argumentsHint");if(!r||"function"!==r.type)return null;return xe(r,(async()=>{const n=e.firstChild;return n&&"MemberExpression"===e.name?pe(o,t.sliceString(n.from,n.to),"argumentsHint"):null}),n).finally((()=>o.runtimeModel.releaseObjectGroup("argumentsHint")))}(r,e.doc);if(!i)return null;let s=0;for(let e=t;;){const t=o.childBefore(e);if(!t)break;t.type.is("Expression")&&s++,e=t.from}return()=>function(e,t){const o=document.createElement("div");o.className="cm-argumentHints";for(const n of e){const e=document.createElement("span");for(let o=0;o<n.length;o++){if(o===t||o<t&&n[o].startsWith("...")){e.appendChild(document.createElement("b")).appendChild(document.createTextNode(n[o]))}else e.appendChild(document.createTextNode(n[o]));o<n.length-1&&e.appendChild(document.createTextNode(", "))}const r=o.appendChild(document.createElement("div"));r.className="source-code",r.appendChild(document.createTextNode("ƒ(")),r.appendChild(e),r.appendChild(document.createTextNode(")"))}return{dom:o}}(i,s)}function Se(e){function t(t){for(;"ParamList"!==t.name&&t.nextSibling(););const o=[];if("ParamList"===t.name&&t.firstChild()){let n="";do{switch(t.name){case"ArrayPattern":o.push(n+"arr"),n="";break;case"ObjectPattern":o.push(n+"obj"),n="";break;case"VariableDefinition":o.push(n+e.slice(t.from,t.to)),n="";break;case"Spread":n="..."}}while(t.nextSibling())}return o}try{try{const{parser:o}=n.javascript.javascriptLanguage.configure({strict:!0,top:"SingleClassItem"}),r=o.parse(e).cursor();if(r.firstChild()&&"MethodDeclaration"===r.name&&r.firstChild())return t(r);throw new Error("SingleClassItem rule is expected to have exactly one MethodDeclaration child")}catch{const{parser:o}=n.javascript.javascriptLanguage.configure({strict:!0,top:"SingleExpression"}),r=o.parse(e).cursor();if(!r.firstChild())throw new Error("SingleExpression rule is expected to have children");switch(r.name){case"ArrowFunction":case"FunctionExpression":if(!r.firstChild())throw new Error(`${r.name} rule is expected to have children`);return t(r);case"ClassExpression":if(!r.firstChild())throw new Error(`${r.name} rule is expected to have children`);for(;r.nextSibling()&&"ClassBody"!==r.name;);if("ClassBody"===r.name&&r.firstChild())do{if("MethodDeclaration"===r.name&&r.firstChild()){if("PropertyDefinition"===r.name&&"constructor"===e.slice(r.from,r.to))return t(r);r.parent()}}while(r.nextSibling());return[]}throw new Error("Unexpected expression")}}catch(t){throw new Error(`Failed to parse for arguments list: ${e}`,{cause:t})}}async function xe(e,t,o){const n=e.description;if(!n)return null;if(!n.endsWith("{ [native code] }"))return[Se(n)];if("function () { [native code] }"===n){const t=await async function(e){const{internalProperties:t}=await e.getOwnProperties(!1);if(!t)return null;const o=t.find((e=>"[[TargetFunction]]"===e.name))?.value,n=t.find((e=>"[[BoundArgs]]"===e.name))?.value,r=t.find((e=>"[[BoundThis]]"===e.name))?.value;if(!r||!o||!n)return null;const i=await xe(o,(()=>Promise.resolve(r))),a=s.RemoteObject.RemoteObject.arrayLength(n);if(!i)return null;return i.map((e=>{const t=e.findIndex((e=>e.startsWith("...")));return t>-1&&t<a?e.slice(t):e.slice(a)}))}(e);if(t)return t}const r=c.JavaScriptMetadata.JavaScriptMetadataImpl.instance(),i=/^function ([^(]*)\(/.exec(n),a=i&&i[1]||o;if(!a)return null;const l=r.signaturesForNativeFunction(a);if(l)return l;const d=await t();if(!d)return null;const u=d.className;if(u){const e=r.signaturesForInstanceMethod(a,u);if(e)return e}if(d.description&&"function"===d.type&&d.description.endsWith("{ [native code] }")){const e=/^function ([^(]*)\(/.exec(d.description);if(e){const t=e[1],o=r.signaturesForStaticMethod(a,t);if(o)return o}}for(const e of await async function(e){if("number"===e.type)return["Number","Object"];if("string"===e.type)return["String","Object"];if("symbol"===e.type)return["Symbol","Object"];if("bigint"===e.type)return["BigInt","Object"];if("boolean"===e.type)return["Boolean","Object"];if("undefined"===e.type||"null"===e.subtype)return[];return await e.callFunctionJSON((function(){const e=[];for(let t=this;t;t=Object.getPrototypeOf(t))"object"==typeof t&&t.constructor&&t.constructor.name&&(e[e.length]=t.constructor.name);return e}),[])}(d)){const t=r.signaturesForInstanceMethod(a,e);if(t)return t}return null}var Ee=Object.freeze({__proto__:null,completion:function(){return n.javascript.javascriptLanguage.data.of({autocomplete:ce})},completeInContext:async function(e,t,o=!1){const r=n.EditorState.create({doc:e+t,selection:{anchor:e.length},extensions:n.javascript.javascriptLanguage}),i=await ce(new n.CompletionContext(r,r.doc.length,o));return i?i.options.filter((e=>e.label.startsWith(t))).map((e=>({text:e.label,priority:100+(e.boost||0),isSecondary:"secondary"===e.type}))):[]},getQueryType:ae,javascriptCompletionSource:ce,isExpressionComplete:async function(e){const t=l.Context.Context.instance().flavor(s.RuntimeModel.ExecutionContext);if(!t)return!0;const o=await t.runtimeModel.compileScript(e,"",!1,t.id);if(!o||!o.exceptionDetails||!o.exceptionDetails.exception)return!0;const n=o.exceptionDetails.exception.description;return!!n&&(!n.startsWith("SyntaxError: Unexpected end of input")&&!n.startsWith("SyntaxError: Unterminated template literal"))},argumentHints:function(){return function(e){const t=n.StateEffect.define();return[n.StateField.define({create:()=>null,update(e,o){if(o.selection&&(e=null),e&&!o.changes.empty){const t=o.changes.mapPos(e.pos,-1,n.MapMode.TrackDel);e=null===t?null:{pos:t,create:e.create,above:!0}}for(const n of o.effects)n.is(t)?e={pos:o.state.selection.main.from,create:n.value,above:!0}:n.is(ee)&&(e=null);return e},provide:e=>n.showTooltip.from(e)}),n.ViewPlugin.fromClass(class{pending=-1;updateID=0;update(e){this.updateID++,e.transactions.some((e=>e.selection))&&e.state.selection.main.empty&&this.#t(e.view)}#t(e){this.pending>-1&&clearTimeout(this.pending),this.pending=window.setTimeout((()=>this.#o(e)),50)}#o(o){this.pending=-1;const{main:n}=o.state.selection;if(n.empty){const{updateID:r}=this;e(o.state,n.from).then((e=>{this.updateID!==r?this.pending<0&&this.#t(o):e?o.dispatch({effects:t.of(e)}):o.dispatch({effects:ee.of(null)})}))}}})]}(we)},closeArgumentsHintsTooltip:function(e,t){return null!==e.state.field(t)&&(e.dispatch({effects:ee.of(null)}),!0)},argumentsList:Se});function Ce(e,{lineNumber:t,columnNumber:o}){const n=e.line(Math.max(1,Math.min(e.lines,t+1)));return Math.max(n.from,Math.min(n.to,n.from+o))}function ke(e,t){t=Math.max(0,Math.min(t,e.length));const o=e.lineAt(t);return{lineNumber:o.number-1,columnNumber:t-o.from}}var Me=Object.freeze({__proto__:null,toOffset:Ce,toLineColumn:ke});class De extends HTMLElement{static litTagName=u.literal`devtools-text-editor`;#n=this.attachShadow({mode:"open"});#r=void 0;#i=y.none;#s=[];#a;#c={left:0,top:0,changed:!1};#l=-1;#d=()=>{this.#l<0&&(this.#l=window.setTimeout((()=>{this.#l=-1,this.#r&&n.repositionTooltips(this.#r)}),50))};#u=new ResizeObserver(this.#d);constructor(e){super(),this.#a=e,this.#n.adoptedStyleSheets=[r.Style.default]}#m(){return this.#r=new n.EditorView({state:this.state,parent:this.#n,root:this.#n,dispatch:e=>{this.editor.update([e]),e.reconfigured&&this.#p()}}),this.#h(this.#r),this.#r.scrollDOM.addEventListener("scroll",(e=>{this.#r&&(this.#f(this.#r,{scrollLeft:e.target.scrollLeft,scrollTop:e.target.scrollTop}),this.scrollEventHandledToSaveScrollPositionForTest())})),this.#p(),this.#g(),d.ThemeSupport.instance().addEventListener(d.ThemeChangeEvent.eventName,(()=>{const e="dark"===d.ThemeSupport.instance().themeName()?R:[];this.editor.dispatch({effects:$.reconfigure(e)})})),this.#r}get editor(){return this.#r||this.#m()}dispatch(e){return this.editor.dispatch(e)}get state(){return this.#r?this.#r.state:(this.#a||(this.#a=n.EditorState.create({extensions:K("")})),this.#a)}set state(e){this.#a!==e&&(this.#a=e,this.#r&&(this.#r.setState(e),this.#p()))}#h(e){this.#c.changed&&e.dispatch({effects:n.EditorView.scrollIntoView(0,{x:"start",xMargin:-this.#c.left,y:"start",yMargin:-this.#c.top})})}#f(e,{scrollLeft:t,scrollTop:o}){const n=e.contentDOM.getBoundingClientRect(),r=e.coordsAtPos(0)??{top:n.top,left:n.left,bottom:n.bottom,right:n.right};this.#c.left=t+(n.left-r.left),this.#c.top=o+(n.top-r.top),this.#c.changed=!0}scrollEventHandledToSaveScrollPositionForTest(){}connectedCallback(){this.#r?this.#h(this.#r):this.#m()}disconnectedCallback(){this.#r&&(this.#r.dispatch({effects:Te.of(null)}),this.#a=this.#r.state,this.#u.disconnect(),window.removeEventListener("resize",this.#d),this.#r.destroy(),this.#r=void 0,this.#p())}focus(){this.#r&&this.#r.focus()}#p(){const t=this.#r?this.#r.state.facet(v):y.none;if(t===this.#i)return;this.#i=t;for(const[e,t]of this.#s)e.removeChangeListener(t);this.#s=[];const o=e.Settings.Settings.instance();for(const e of t){const t=({data:t})=>{const o=e.sync(this.state,t);o&&this.#r&&this.#r.dispatch({effects:o})},n=o.moduleSetting(e.settingName);n.addChangeListener(t),this.#s.push([n,t])}}#g(){const e=o.WindowBoundsService.WindowBoundsServiceImpl.instance().getDevToolsBoundingElement();e&&this.#u.observe(e),window.addEventListener("resize",this.#d)}revealPosition(e,t=!0){const o=this.#r;if(!o)return;const r=o.state.doc.lineAt(e.main.head),i=[];t&&(o.state.field(je,!1)?o.dispatch({effects:Te.of(null)}):o.dispatch({effects:n.StateEffect.appendConfig.of(je)}),i.push(Pe.of(r.from)));const s=o.scrollDOM.getBoundingClientRect(),a=o.coordsAtPos(e.main.head);(!a||a.top<s.top||a.bottom>s.bottom)&&i.push(n.EditorView.scrollIntoView(e.main,{y:"center"})),o.dispatch({selection:e,effects:i,userEvent:"select.reveal"})}createSelection(e,t){const{doc:o}=this.state,r=Ce(o,e);return n.EditorSelection.single(t?Ce(o,t):r,r)}toLineColumn(e){return ke(this.state.doc,e)}toOffset(e){return Ce(this.state.doc,e)}}m.CustomElements.defineComponent("devtools-text-editor",De);const Te=n.StateEffect.define(),Pe=n.StateEffect.define(),je=n.StateField.define({create:()=>n.Decoration.none,update(e,t){!t.changes.empty&&e.size&&(e=e.map(t.changes));for(const o of t.effects)o.is(Te)?e=n.Decoration.none:o.is(Pe)&&(e=n.Decoration.set([n.Decoration.line({attributes:{class:"cm-highlightedLine"}}).range(o.value)]));return e},provide:e=>n.EditorView.decorations.from(e,(e=>e))});var Le=Object.freeze({__proto__:null,TextEditor:De});export{Z as Config,Ee as JavaScript,Me as Position,Le as TextEditor};