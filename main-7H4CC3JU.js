import{a as Zt,b as J,c as z,d as Xt,e as Kt,f as Wt,g as Y,h as qt,i as Jt,k as Yt,l as $,m as Qt,n as te,o as ee,p as ne}from"./chunk-4SHIU6M3.js";import{b as $t,c as Bt,d as Ut,e as Vt,i as Ht,k as Gt}from"./chunk-EYRDJ4LK.js";import{$ as Ct,B as W,Ba as Rt,C as R,Cc as zt,E as It,Ea as Mt,F as xt,G as At,Gb as Ft,I as Et,Na as Nt,R as vt,S as Ot,U as Tt,W as q,X as j,_ as bt,ba as M,c as X,cb as Dt,dc as _t,ea as D,eb as Pt,ga as A,gb as kt,h as ft,ha as F,hb as jt,ib as L,j as mt,k as gt,l as yt,n as K,oa as wt,ra as _,t as St,u as C,vc as Lt}from"./chunk-RKST6CCA.js";import{a as x,b}from"./chunk-3U4P6EEP.js";var ie=[{path:"",loadComponent:()=>import("./chunk-BQQEGQ3P.js").then(e=>e.LayoutComponent),children:[{path:"",redirectTo:"intro",pathMatch:"full"},{path:"intro",loadComponent:()=>import("./chunk-Y7CRCZMT.js").then(e=>e.IntroComponent)},{path:"home",loadComponent:()=>import("./chunk-4EA57JTO.js").then(e=>e.HomeComponent)},{path:"list/:type",loadComponent:()=>import("./chunk-KNBB23PU.js").then(e=>e.ProgramListComponent)},{path:"display/:type/:id",loadComponent:()=>import("./chunk-HNZDHHSA.js").then(e=>e.ProgramDisplayComponent)},{path:"info/:id",loadComponent:()=>import("./chunk-6X6XGYJX.js").then(e=>e.CommentsComponent)}]},{path:"**",redirectTo:"home"}];var De="@",Pe=(()=>{let t=class t{constructor(n,i,s,u,c){this.doc=n,this.delegate=i,this.zone=s,this.animationType=u,this.moduleImpl=c,this._rendererFactoryPromise=null,this.scheduler=F(Pt,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-NVCTZEN5.js")).catch(i=>{throw new Ct(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:s})=>{this._engine=i(this.animationType,this.doc,this.scheduler);let u=new s(this.delegate,this._engine,this.zone);return this.delegate=u,u})}createRenderer(n,i){let s=this.delegate.createRenderer(n,i);if(s.\u0275type===0)return s;typeof s.throwOnSyntheticProps=="boolean"&&(s.throwOnSyntheticProps=!1);let u=new Q(s);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(c=>{let g=c.createRenderer(n,i);u.use(g)}).catch(c=>{u.use(s)}),u}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};t.\u0275fac=function(i){Dt()},t.\u0275prov=M({token:t,factory:t.\u0275fac});let e=t;return e})(),Q=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let o of this.replay)o(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,o){return this.delegate.createElement(t,o)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,o){this.delegate.appendChild(t,o)}insertBefore(t,o,n,i){this.delegate.insertBefore(t,o,n,i)}removeChild(t,o,n){this.delegate.removeChild(t,o,n)}selectRootElement(t,o){return this.delegate.selectRootElement(t,o)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,o,n,i){this.delegate.setAttribute(t,o,n,i)}removeAttribute(t,o,n){this.delegate.removeAttribute(t,o,n)}addClass(t,o){this.delegate.addClass(t,o)}removeClass(t,o){this.delegate.removeClass(t,o)}setStyle(t,o,n,i){this.delegate.setStyle(t,o,n,i)}removeStyle(t,o,n){this.delegate.removeStyle(t,o,n)}setProperty(t,o,n){this.shouldReplay(o)&&this.replay.push(i=>i.setProperty(t,o,n)),this.delegate.setProperty(t,o,n)}setValue(t,o){this.delegate.setValue(t,o)}listen(t,o,n){return this.shouldReplay(o)&&this.replay.push(i=>i.listen(t,o,n)),this.delegate.listen(t,o,n)}shouldReplay(t){return this.replay!==null&&t.startsWith(De)}};function se(e="animations"){return jt("NgAsyncAnimations"),_([{provide:kt,useFactory:(t,o,n)=>new Pe(t,o,n,e),deps:[Lt,Ut,L]},{provide:Nt,useValue:e==="noop"?"NoopAnimations":"BrowserAnimations"}])}var k="PERFORM_ACTION",ke="REFRESH",de="RESET",pe="ROLLBACK",he="COMMIT",fe="SWEEP",me="TOGGLE_ACTION",je="SET_ACTIONS_ACTIVE",ge="JUMP_TO_STATE",ye="JUMP_TO_ACTION",pt="IMPORT_STATE",Se="LOCK_CHANGES",Ie="PAUSE_RECORDING",N=class{constructor(t,o){if(this.action=t,this.timestamp=o,this.type=k,typeof t.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},tt=class{constructor(){this.type=ke}},et=class{constructor(t){this.timestamp=t,this.type=de}},nt=class{constructor(t){this.timestamp=t,this.type=pe}},it=class{constructor(t){this.timestamp=t,this.type=he}},ot=class{constructor(){this.type=fe}},st=class{constructor(t){this.id=t,this.type=me}};var rt=class{constructor(t){this.index=t,this.type=ge}},at=class{constructor(t){this.actionId=t,this.type=ye}},ct=class{constructor(t){this.nextLiftedState=t,this.type=pt}},lt=class{constructor(t){this.status=t,this.type=Se}},ut=class{constructor(t){this.status=t,this.type=Ie}};var H=new D("@ngrx/store-devtools Options"),re=new D("@ngrx/store-devtools Initial Config");function xe(){return null}var Fe="NgRx Store DevTools";function _e(e){let t={maxAge:!1,monitor:xe,actionSanitizer:void 0,stateSanitizer:void 0,name:Fe,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},o=typeof e=="function"?e():e,n=o.logOnly?{pause:!0,export:!0,test:!0}:!1,i=o.features||n||t.features;i.import===!0&&(i.import="custom");let s=Object.assign({},t,{features:i},o);if(s.maxAge&&s.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${s.maxAge}`);return s}function ae(e,t){return e.filter(o=>t.indexOf(o)<0)}function Ae(e){let{computedStates:t,currentStateIndex:o}=e;if(o>=t.length){let{state:i}=t[t.length-1];return i}let{state:n}=t[o];return n}function P(e){return new N(e,+Date.now())}function Le(e,t){return Object.keys(t).reduce((o,n)=>{let i=Number(n);return o[i]=Ee(e,t[i],i),o},{})}function Ee(e,t,o){return b(x({},t),{action:e(t.action,o)})}function ze(e,t){return t.map((o,n)=>({state:ve(e,o.state,n),error:o.error}))}function ve(e,t,o){return e(t,o)}function Oe(e){return e.predicate||e.actionsSafelist||e.actionsBlocklist}function $e(e,t,o,n){let i=[],s={},u=[];return e.stagedActionIds.forEach((c,g)=>{let d=e.actionsById[c];d&&(g&&ht(e.computedStates[g],d,t,o,n)||(s[c]=d,i.push(c),u.push(e.computedStates[g])))}),b(x({},e),{stagedActionIds:i,actionsById:s,computedStates:u})}function ht(e,t,o,n,i){let s=o&&!o(e,t.action),u=n&&!t.action.type.match(n.map(g=>ce(g)).join("|")),c=i&&t.action.type.match(i.map(g=>ce(g)).join("|"));return s||u||c}function ce(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Te(e){return{ngZone:e?F(L):null,connectInZone:e}}var G=(()=>{let t=class t extends z{};t.\u0275fac=(()=>{let n;return function(s){return(n||(n=Rt(t)))(s||t)}})(),t.\u0275prov=M({token:t,factory:t.\u0275fac});let e=t;return e})(),B={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},dt=new D("@ngrx/store-devtools Redux Devtools Extension"),be=(()=>{let t=class t{constructor(n,i,s){this.config=i,this.dispatcher=s,this.zoneConfig=Te(this.config.connectInZone),this.devtoolsExtension=n,this.createActionStreams()}notify(n,i){if(this.devtoolsExtension)if(n.type===k){if(i.isLocked||i.isPaused)return;let s=Ae(i);if(Oe(this.config)&&ht(s,n,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let u=this.config.stateSanitizer?ve(this.config.stateSanitizer,s,i.currentStateIndex):s,c=this.config.actionSanitizer?Ee(this.config.actionSanitizer,n,i.nextActionId):n;this.sendToReduxDevtools(()=>this.extensionConnection.send(c,u))}else{let s=b(x({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?Le(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?ze(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,s,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new X(n=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(s=>n.next(s)),i.unsubscribe}):gt}createActionStreams(){let n=this.createChangesObservable().pipe(Ot()),i=n.pipe(R(a=>a.type===B.START)),s=n.pipe(R(a=>a.type===B.STOP)),u=n.pipe(R(a=>a.type===B.DISPATCH),C(a=>this.unwrapAction(a.payload)),xt(a=>a.type===pt?this.dispatcher.pipe(R(r=>r.type===Y),St(1e3),At(1e3),C(()=>a),It(()=>K(a)),Et(1)):K(a))),g=n.pipe(R(a=>a.type===B.ACTION),C(a=>this.unwrapAction(a.payload))).pipe(j(s)),d=u.pipe(j(s));this.start$=i.pipe(j(s)),this.actions$=this.start$.pipe(q(()=>g)),this.liftedActions$=this.start$.pipe(q(()=>d))}unwrapAction(n){return typeof n=="string"?(0,eval)(`(${n})`):n}getExtensionConfig(n){let i={name:n.name,features:n.features,serialize:n.serialize,autoPause:n.autoPause??!1,trace:n.trace??!1,traceLimit:n.traceLimit??75};return n.maxAge!==!1&&(i.maxAge=n.maxAge),i}sendToReduxDevtools(n){try{n()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}};t.\u0275fac=function(i){return new(i||t)(A(dt),A(H),A(G))},t.\u0275prov=M({token:t,factory:t.\u0275fac});let e=t;return e})(),V={type:J},Be="@ngrx/store-devtools/recompute",Ue={type:Be};function Ce(e,t,o,n,i){if(n)return{state:o,error:"Interrupted by an error up the chain"};let s=o,u;try{s=e(o,t)}catch(c){u=c.toString(),i.handleError(c)}return{state:s,error:u}}function U(e,t,o,n,i,s,u,c,g){if(t>=e.length&&e.length===s.length)return e;let d=e.slice(0,t),a=s.length-(g?1:0);for(let r=t;r<a;r++){let f=s[r],I=i[f].action,p=d[r-1],l=p?p.state:n,v=p?p.error:void 0,O=u.indexOf(f)>-1?p:Ce(o,I,l,v,c);d.push(O)}return g&&d.push(e[e.length-1]),d}function Ve(e,t){return{monitorState:t(void 0,{}),nextActionId:1,actionsById:{0:P(V)},stagedActionIds:[0],skippedActionIds:[],committedState:e,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function He(e,t,o,n,i={}){return s=>(u,c)=>{let{monitorState:g,actionsById:d,nextActionId:a,stagedActionIds:r,skippedActionIds:f,committedState:I,currentStateIndex:p,computedStates:l,isLocked:v,isPaused:S}=u||t;u||(d=Object.create(d));function O(y){let m=y,T=r.slice(1,m+1);for(let E=0;E<T.length;E++)if(l[E+1].error){m=E,T=r.slice(1,m+1);break}else delete d[T[E]];f=f.filter(E=>T.indexOf(E)===-1),r=[0,...r.slice(m+1)],I=l[m].state,l=l.slice(m),p=p>m?p-m:0}function w(){d={0:P(V)},a=1,r=[0],f=[],I=l[p].state,p=0,l=[]}let h=0;switch(c.type){case Se:{v=c.status,h=1/0;break}case Ie:{S=c.status,S?(r=[...r,a],d[a]=new N({type:"@ngrx/devtools/pause"},+Date.now()),a++,h=r.length-1,l=l.concat(l[l.length-1]),p===r.length-2&&p++,h=1/0):w();break}case de:{d={0:P(V)},a=1,r=[0],f=[],I=e,p=0,l=[];break}case he:{w();break}case pe:{d={0:P(V)},a=1,r=[0],f=[],p=0,l=[];break}case me:{let{id:y}=c;f.indexOf(y)===-1?f=[y,...f]:f=f.filter(T=>T!==y),h=r.indexOf(y);break}case je:{let{start:y,end:m,active:T}=c,E=[];for(let Z=y;Z<m;Z++)E.push(Z);T?f=ae(f,E):f=[...f,...E],h=r.indexOf(y);break}case ge:{p=c.index,h=1/0;break}case ye:{let y=r.indexOf(c.actionId);y!==-1&&(p=y),h=1/0;break}case fe:{r=ae(r,f),f=[],p=Math.min(p,r.length-1);break}case k:{if(v)return u||t;if(S||u&&ht(u.computedStates[p],c,i.predicate,i.actionsSafelist,i.actionsBlocklist)){let m=l[l.length-1];l=[...l.slice(0,-1),Ce(s,c.action,m.state,m.error,o)],h=1/0;break}i.maxAge&&r.length===i.maxAge&&O(1),p===r.length-1&&p++;let y=a++;d[y]=c,r=[...r,y],h=r.length-1;break}case pt:{({monitorState:g,actionsById:d,nextActionId:a,stagedActionIds:r,skippedActionIds:f,committedState:I,currentStateIndex:p,computedStates:l,isLocked:v,isPaused:S}=c.nextLiftedState);break}case J:{h=0,i.maxAge&&r.length>i.maxAge&&(l=U(l,h,s,I,d,r,f,o,S),O(r.length-i.maxAge),h=1/0);break}case Y:{if(l.filter(m=>m.error).length>0)h=0,i.maxAge&&r.length>i.maxAge&&(l=U(l,h,s,I,d,r,f,o,S),O(r.length-i.maxAge),h=1/0);else{if(!S&&!v){p===r.length-1&&p++;let m=a++;d[m]=new N(c,+Date.now()),r=[...r,m],h=r.length-1,l=U(l,h,s,I,d,r,f,o,S)}l=l.map(m=>b(x({},m),{state:s(m.state,Ue)})),p=r.length-1,i.maxAge&&r.length>i.maxAge&&O(r.length-i.maxAge),h=1/0}break}default:{h=1/0;break}}return l=U(l,h,s,I,d,r,f,o,S),g=n(g,c),{monitorState:g,actionsById:d,nextActionId:a,stagedActionIds:r,skippedActionIds:f,committedState:I,currentStateIndex:p,computedStates:l,isLocked:v,isPaused:S}}}var le=(()=>{let t=class t{constructor(n,i,s,u,c,g,d,a){let r=Ve(d,a.monitor),f=He(d,r,g,a.monitor,a),I=W(W(i.asObservable().pipe(Tt(1)),u.actions$).pipe(C(P)),n,u.liftedActions$).pipe(yt(mt)),p=s.pipe(C(f)),l=Te(a.connectInZone),v=new ft(1);this.liftedStateSubscription=I.pipe(bt(p),ue(l),vt(({state:w},[h,y])=>{let m=y(w,h);return h.type!==k&&Oe(a)&&(m=$e(m,a.predicate,a.actionsSafelist,a.actionsBlocklist)),u.notify(h,m),{state:m,action:h}},{state:r,action:null})).subscribe(({state:w,action:h})=>{if(v.next(w),h.type===k){let y=h.action;c.next(y)}}),this.extensionStartSubscription=u.start$.pipe(ue(l)).subscribe(()=>{this.refresh()});let S=v.asObservable(),O=S.pipe(C(Ae));Object.defineProperty(O,"state",{value:Zt(O,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=n,this.liftedState=S,this.state=O}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(n){this.dispatcher.next(n)}next(n){this.dispatcher.next(n)}error(n){}complete(){}performAction(n){this.dispatch(new N(n,+Date.now()))}refresh(){this.dispatch(new tt)}reset(){this.dispatch(new et(+Date.now()))}rollback(){this.dispatch(new nt(+Date.now()))}commit(){this.dispatch(new it(+Date.now()))}sweep(){this.dispatch(new ot)}toggleAction(n){this.dispatch(new st(n))}jumpToAction(n){this.dispatch(new at(n))}jumpToState(n){this.dispatch(new rt(n))}importState(n){this.dispatch(new ct(n))}lockChanges(n){this.dispatch(new lt(n))}pauseRecording(n){this.dispatch(new ut(n))}};t.\u0275fac=function(i){return new(i||t)(A(G),A(z),A(Kt),A(be),A(qt),A(Mt),A(Xt),A(H))},t.\u0275prov=M({token:t,factory:t.\u0275fac});let e=t;return e})();function ue({ngZone:e,connectInZone:t}){return o=>t?new X(n=>o.subscribe({next:i=>e.run(()=>n.next(i)),error:i=>e.run(()=>n.error(i)),complete:()=>e.run(()=>n.complete())})):o}var Ge=new D("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function Ze(e,t){return!!e||t.monitor!==xe}function Xe(){let e="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[e]<"u"?window[e]:null}function we(e={}){return _([be,G,le,{provide:re,useValue:e},{provide:Ge,deps:[dt,H],useFactory:Ze},{provide:dt,useFactory:Xe},{provide:H,deps:[re],useFactory:_e},{provide:Jt,deps:[le],useFactory:Ke},{provide:Wt,useExisting:G}])}function Ke(e){return e.state}var We={past:[],currentValues:{}},Re=Qt(We,$(te,e=>{let t=e.past[e.past.length-1];return t?b(x({},e),{past:e.past.slice(0,-1),currentValues:x({},t)}):e}),$(ee,(e,{newCoordinator:t})=>b(x({},e),{past:[...e.past,x({},e.currentValues)],currentValues:x({},t)})),$(ne,e=>{let t=e.past[1]?e.past[1]:e.currentValues;return{past:[],currentValues:x({},t)}}));var Me={providers:[Gt(ie),se(),$t(),Yt({appState:Re}),we()]};var Ne=(()=>{let t=class t{constructor(){this.title="pylab_project"}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=wt({type:t,selectors:[["app-root"]],standalone:!0,features:[_t],decls:1,vars:0,template:function(i,s){i&1&&Ft(0,"router-outlet")},dependencies:[Ht,zt,Bt]});let e=t;return e})();typeof MonacoEnvironment<"u"?MonacoEnvironment.getWorkerUrl=function(e,t){return"./assets/editor.worker.js"}:console.error("MonacoEnvironment is not defined.");Vt(Ne,Me).catch(e=>console.error(e));
