import{$ as ne,Ba as ce,Fa as A,L as J,Q as X,R as ee,_ as te,ba as R,c as S,ea as c,f as H,g as b,ga as l,ha as f,ia as re,ib as ue,j as Y,l as Q,la as oe,lb as T,lc as D,qc as I,ra as ie,u as W,va as se}from"./chunk-RKST6CCA.js";import{a as h,b as E}from"./chunk-3U4P6EEP.js";function k(e,t){let o=!t?.manualCleanup;o&&!t?.injector&&se(k);let n=o?t?.injector?.get(A)??f(A):null,r;t?.requireSync?r=T({kind:0}):r=T({kind:1,value:t?.initialValue});let i=e.subscribe({next:s=>r.set({kind:1,value:s}),error:s=>{if(t?.rejectErrors)throw s;r.set({kind:2,error:s})}});return n?.onDestroy(i.unsubscribe.bind(i)),I(()=>{let s=r();switch(s.kind){case 1:return s.value;case 2:throw s.error;case 0:throw new ne(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}var _={};function x(e,t){if(_[e]=(_[e]||0)+1,typeof t=="function")return U(e,(...n)=>E(h({},t(...n)),{type:e}));switch(t?t._as:"empty"){case"empty":return U(e,()=>({type:e}));case"props":return U(e,n=>E(h({},n),{type:e}));default:throw new Error("Unexpected config.")}}function be(){return{_as:"props",_p:void 0}}function U(e,t){return Object.defineProperty(t,"type",{value:e,writable:!1})}var Ie="@ngrx/store/init",m=(()=>{let t=class t extends b{constructor(){super({type:Ie})}next(n){if(typeof n=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof n>"u")throw new TypeError("Actions must be objects");if(typeof n.type>"u")throw new TypeError("Actions must have a type property");super.next(n)}complete(){}ngOnDestroy(){super.complete()}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),Me=[m],Fe=new c("@ngrx/store Internal Root Guard"),ae=new c("@ngrx/store Internal Initial State"),$=new c("@ngrx/store Initial State"),we=new c("@ngrx/store Reducer Factory"),de=new c("@ngrx/store Internal Reducer Factory Provider"),je=new c("@ngrx/store Initial Reducers"),M=new c("@ngrx/store Internal Initial Reducers"),$t=new c("@ngrx/store Store Features"),le=new c("@ngrx/store Internal Store Reducers"),qt=new c("@ngrx/store Internal Feature Reducers"),Kt=new c("@ngrx/store Internal Feature Configs"),Lt=new c("@ngrx/store Internal Store Features"),Bt=new c("@ngrx/store Internal Feature Reducers Token"),Gt=new c("@ngrx/store Feature Reducers"),fe=new c("@ngrx/store User Provided Meta Reducers"),F=new c("@ngrx/store Meta Reducers"),pe=new c("@ngrx/store Internal Resolved Meta Reducers"),ye=new c("@ngrx/store User Runtime Checks Config"),he=new c("@ngrx/store Internal User Runtime Checks Config"),v=new c("@ngrx/store Internal Runtime Checks"),xe=new c("@ngrx/store Check if Action types are unique"),Re=new c("@ngrx/store Root Store Provider"),Zt=new c("@ngrx/store Feature State Provider");function _e(e,t={}){let o=Object.keys(e),n={};for(let i=0;i<o.length;i++){let s=o[i];typeof e[s]=="function"&&(n[s]=e[s])}let r=Object.keys(n);return function(s,d){s=s===void 0?t:s;let a=!1,p={};for(let u=0;u<r.length;u++){let y=r[u],C=n[y],G=s[y],Z=C(G,d);p[y]=Z,a=a||Z!==G}return a?p:s}}function Ne(e,t){return Object.keys(e).filter(o=>o!==t).reduce((o,n)=>Object.assign(o,{[n]:e[n]}),{})}function Oe(...e){return function(t){if(e.length===0)return t;let o=e[e.length-1];return e.slice(0,-1).reduceRight((r,i)=>i(r),o(t))}}function Ce(e,t){return Array.isArray(t)&&t.length>0&&(e=Oe.apply(null,[...t,e])),(o,n)=>{let r=e(o);return(i,s)=>(i=i===void 0?n:i,r(i,s))}}function Pe(e){let t=Array.isArray(e)&&e.length>0?Oe(...e):o=>o;return(o,n)=>(o=t(o),(r,i)=>(r=r===void 0?n:r,o(r,i)))}var g=class extends S{},w=class extends m{},Ve="@ngrx/store/update-reducers",N=(()=>{let t=class t extends b{get currentReducers(){return this.reducers}constructor(n,r,i,s){super(s(i,r)),this.dispatcher=n,this.initialState=r,this.reducers=i,this.reducerFactory=s}addFeature(n){this.addFeatures([n])}addFeatures(n){let r=n.reduce((i,{reducers:s,reducerFactory:d,metaReducers:a,initialState:p,key:u})=>{let y=typeof s=="function"?Pe(a)(s,p):Ce(d,a)(s,p);return i[u]=y,i},{});this.addReducers(r)}removeFeature(n){this.removeFeatures([n])}removeFeatures(n){this.removeReducers(n.map(r=>r.key))}addReducer(n,r){this.addReducers({[n]:r})}addReducers(n){this.reducers=h(h({},this.reducers),n),this.updateReducers(Object.keys(n))}removeReducer(n){this.removeReducers([n])}removeReducers(n){n.forEach(r=>{this.reducers=Ne(this.reducers,r)}),this.updateReducers(n)}updateReducers(n){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:Ve,features:n})}ngOnDestroy(){this.complete()}};t.\u0275fac=function(r){return new(r||t)(l(w),l($),l(je),l(we))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),ze=[N,{provide:g,useExisting:N},{provide:w,useExisting:m}],q=(()=>{let t=class t extends H{ngOnDestroy(){this.complete()}};t.\u0275fac=(()=>{let n;return function(i){return(n||(n=ce(t)))(i||t)}})(),t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),$e=[q],j=class extends S{},me=(()=>{let t=class t extends b{constructor(n,r,i,s){super(s);let a=n.pipe(Q(Y)).pipe(te(r)),p={state:s},u=a.pipe(ee(qe,p));this.stateSubscription=u.subscribe(({state:y,action:C})=>{this.next(y),i.next(C)}),this.state=k(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}};t.INIT=Ie,t.\u0275fac=function(r){return new(r||t)(l(m),l(g),l(q),l($))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})();function qe(e={state:void 0},[t,o]){let{state:n}=e;return{state:o(n,t),action:t}}var Ke=[me,{provide:j,useExisting:me}],K=(()=>{let t=class t extends S{constructor(n,r,i){super(),this.actionsObserver=r,this.reducerManager=i,this.source=n,this.state=n.state}select(n,...r){return Be.call(null,n,...r)(this)}selectSignal(n,r){return I(()=>n(this.state()),r)}lift(n){let r=new t(this,this.actionsObserver,this.reducerManager);return r.operator=n,r}dispatch(n){this.actionsObserver.next(n)}next(n){this.actionsObserver.next(n)}error(n){this.actionsObserver.error(n)}complete(){this.actionsObserver.complete()}addReducer(n,r){this.reducerManager.addReducer(n,r)}removeReducer(n){this.reducerManager.removeReducer(n)}};t.\u0275fac=function(r){return new(r||t)(l(j),l(m),l(N))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),Le=[K];function Be(e,t,...o){return function(r){let i;if(typeof e=="string"){let s=[t,...o].filter(Boolean);i=r.pipe(X(e,...s))}else if(typeof e=="function")i=r.pipe(W(s=>e(s,t)));else throw new TypeError(`Unexpected type '${typeof e}' in select operator, expected 'string' or 'function'`);return i.pipe(J())}}var L="https://ngrx.io/guide/store/configuration/runtime-checks";function ve(e){return e===void 0}function ge(e){return e===null}function Ae(e){return Array.isArray(e)}function Ge(e){return typeof e=="string"}function Ze(e){return typeof e=="boolean"}function He(e){return typeof e=="number"}function Te(e){return typeof e=="object"&&e!==null}function Ye(e){return Te(e)&&!Ae(e)}function Qe(e){if(!Ye(e))return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function P(e){return typeof e=="function"}function We(e){return P(e)&&e.hasOwnProperty("\u0275cmp")}function Je(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Xe=!1;function et(){return Xe}function Ee(e,t){return e===t}function tt(e,t,o){for(let n=0;n<e.length;n++)if(!o(e[n],t[n]))return!0;return!1}function De(e,t=Ee,o=Ee){let n=null,r=null,i;function s(){n=null,r=null}function d(u=void 0){i={result:u}}function a(){i=void 0}function p(){if(i!==void 0)return i.result;if(!n)return r=e.apply(null,arguments),n=arguments,r;if(!tt(arguments,n,t))return r;let u=e.apply(null,arguments);return n=arguments,o(r,u)?r:(r=u,u)}return{memoized:p,reset:s,setResult:d,clearResult:a}}function O(...e){return rt(De)(...e)}function nt(e,t,o,n){if(o===void 0){let i=t.map(s=>s(e));return n.memoized.apply(null,i)}let r=t.map(i=>i(e,o));return n.memoized.apply(null,[...r,o])}function rt(e,t={stateFn:nt}){return function(...o){let n=o;if(Array.isArray(n[0])){let[u,...y]=n;n=[...u,...y]}else n.length===1&&ot(n[0])&&(n=it(n[0]));let r=n.slice(0,n.length-1),i=n[n.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),d=e(function(...u){return i.apply(null,u)}),a=De(function(u,y){return t.stateFn.apply(null,[u,r,y,d])});function p(){a.reset(),d.reset(),s.forEach(u=>u.release())}return Object.assign(a.memoized,{release:p,projector:d.memoized,setResult:a.setResult,clearResult:a.clearResult})}}function ke(e){return O(t=>{let o=t[e];return!et()&&D()&&!(e in t)&&console.warn(`@ngrx/store: The feature name "${e}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${e}', ...) or StoreModule.forFeature('${e}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),o},t=>t)}function ot(e){return!!e&&typeof e=="object"&&Object.values(e).every(t=>typeof t=="function")}function it(e){let t=Object.values(e),o=Object.keys(e),n=(...r)=>o.reduce((i,s,d)=>E(h({},i),{[s]:r[d]}),{});return[...t,n]}function st(e){return e instanceof c?f(e):e}function ct(e){return typeof e=="function"?e():e}function ut(e,t){return e.concat(t)}function at(){if(f(K,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function dt(e,t){return function(o,n){let r=t.action(n)?V(n):n,i=e(o,r);return t.state()?V(i):i}}function V(e){Object.freeze(e);let t=P(e);return Object.getOwnPropertyNames(e).forEach(o=>{if(!o.startsWith("\u0275")&&Je(e,o)&&(!t||o!=="caller"&&o!=="callee"&&o!=="arguments")){let n=e[o];(Te(n)||P(n))&&!Object.isFrozen(n)&&V(n)}}),e}function lt(e,t){return function(o,n){if(t.action(n)){let i=z(n);Se(i,"action")}let r=e(o,n);if(t.state()){let i=z(r);Se(i,"state")}return r}}function z(e,t=[]){return(ve(e)||ge(e))&&t.length===0?{path:["root"],value:e}:Object.keys(e).reduce((n,r)=>{if(n)return n;let i=e[r];return We(i)?n:ve(i)||ge(i)||He(i)||Ze(i)||Ge(i)||Ae(i)?!1:Qe(i)?z(i,[...t,r]):{path:[...t,r],value:i}},!1)}function Se(e,t){if(e===!1)return;let o=e.path.join("."),n=new Error(`Detected unserializable ${t} at "${o}". ${L}#strict${t}serializability`);throw n.value=e.value,n.unserializablePath=o,n}function ft(e,t){return function(o,n){if(t.action(n)&&!ue.isInAngularZone())throw new Error(`Action '${n.type}' running outside NgZone. ${L}#strictactionwithinngzone`);return e(o,n)}}function pt(e){return D()?h({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},e):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function yt({strictActionSerializability:e,strictStateSerializability:t}){return o=>e||t?lt(o,{action:n=>e&&!B(n),state:()=>t}):o}function ht({strictActionImmutability:e,strictStateImmutability:t}){return o=>e||t?dt(o,{action:n=>e&&!B(n),state:()=>t}):o}function B(e){return e.type.startsWith("@ngrx")}function Rt({strictActionWithinNgZone:e}){return t=>e?ft(t,{action:o=>e&&!B(o)}):t}function mt(e){return[{provide:he,useValue:e},{provide:ye,useFactory:gt,deps:[he]},{provide:v,deps:[ye],useFactory:pt},{provide:F,multi:!0,deps:[v],useFactory:ht},{provide:F,multi:!0,deps:[v],useFactory:yt},{provide:F,multi:!0,deps:[v],useFactory:Rt}]}function vt(){return[{provide:xe,multi:!0,deps:[v],useFactory:Et}]}function gt(e){return e}function Et(e){if(!e.strictActionTypeUniqueness)return;let t=Object.entries(_).filter(([,o])=>o>1).map(([o])=>o);if(t.length)throw new Error(`Action types are registered more than once, ${t.map(o=>`"${o}"`).join(", ")}. ${L}#strictactiontypeuniqueness`)}function St(e={},t={}){return[{provide:Fe,useFactory:at},{provide:ae,useValue:t.initialState},{provide:$,useFactory:ct,deps:[ae]},{provide:M,useValue:e},{provide:le,useExisting:e instanceof c?e:M},{provide:je,deps:[M,[new re(le)]],useFactory:st},{provide:fe,useValue:t.metaReducers?t.metaReducers:[]},{provide:pe,deps:[F,fe],useFactory:ut},{provide:de,useValue:t.reducerFactory?t.reducerFactory:_e},{provide:we,deps:[de,pe],useFactory:Ce},Me,ze,$e,Ke,Le,mt(t.runtimeChecks),vt()]}function bt(){f(m),f(g),f(q),f(K),f(Fe,{optional:!0}),f(xe,{optional:!0})}var It=[{provide:Re,useFactory:bt},{provide:oe,multi:!0,useFactory(){return()=>f(Re)}}];function Ht(e,t){return ie([...St(e,t),It])}function Yt(...e){let t=e.pop(),o=e.map(n=>n.type);return{reducer:t,types:o}}function Qt(e,...t){let o=new Map;for(let n of t)for(let r of n.types){let i=o.get(r);if(i){let s=(d,a)=>n.reducer(i(d,a),a);o.set(r,s)}else o.set(r,n.reducer)}return function(n=e,r){let i=o.get(r.type);return i?i(n,r):n}}var en=x("[Coordinator] Go Back"),tn=x("[Coordinator] Add New",be()),nn=x("[Coordinator] Reset State"),Ue=ke("appState"),rn=O(Ue,e=>e.currentValues),on=O(Ue,e=>e.past);export{k as a,Ie as b,m as c,$ as d,g as e,w as f,Ve as g,q as h,j as i,K as j,Ht as k,Yt as l,Qt as m,en as n,tn as o,nn as p,on as q};
