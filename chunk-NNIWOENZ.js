import{a as Y,c as $}from"./chunk-2CRAOFWR.js";import{d as L}from"./chunk-O2BMXSYL.js";import"./chunk-SPVD6LDR.js";import"./chunk-RESQ43ZJ.js";import{a as S,b as E}from"./chunk-XHLTC5ID.js";import{D as m,I as G,J as K,S as X,T as w,a as Z,m as q}from"./chunk-KWJPMI34.js";import{g as I,i as U,j as b}from"./chunk-ACUWEEHC.js";import{Eb as d,Ec as W,Fb as a,Ga as k,Gb as f,Ha as V,Nb as p,Qb as C,Rb as x,Tb as F,Vb as M,Wb as D,_b as r,ab as y,ba as P,bb as c,ca as g,dc as s,g as B,ga as T,oa as l,pa as _,qa as A,ub as O,wb as v,xb as N,xc as Q,yc as H}from"./chunk-NL575MTC.js";import"./chunk-3U4P6EEP.js";var ct=["*",[["mat-toolbar-row"]]],rt=["*","mat-toolbar-row"],lt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=A({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0});let e=t;return e})(),J=(()=>{let t=class t{constructor(n,i,o){this._elementRef=n,this._platform=i,this._document=o}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}};t.\u0275fac=function(i){return new(i||t)(c(k),c(Z),c(Q))},t.\u0275cmp=l({type:t,selectors:[["mat-toolbar"]],contentQueries:function(i,o,h){if(i&1&&F(h,lt,5),i&2){let R;M(R=D())&&(o._toolbarRows=R)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,o){i&2&&(N(o.color?"mat-"+o.color:""),v("mat-toolbar-multiple-rows",o._toolbarRows.length>0)("mat-toolbar-single-row",o._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[s],ngContentSelectors:rt,decls:2,vars:0,template:function(i,o){i&1&&(C(ct),x(0),x(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0});let e=t;return e})();var z=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=_({type:t}),t.\u0275inj=g({imports:[m,m]});let e=t;return e})();var tt=(()=>{let t=class t{constructor(n,i){this.dialogRef=n,this.router=i}ngOnInit(){}navigateToHome(){this.dialogRef.close(),this.router.navigate(["/home"])}};t.\u0275fac=function(i){return new(i||t)(c(Y),c(b))},t.\u0275cmp=l({type:t,selectors:[["app-help-dialog"]],standalone:!0,features:[s],decls:22,vars:0,consts:[[1,"help-dialog-container"],[1,"header"],[1,"x-close",3,"click"],[1,"help"],["id","navigate-home",3,"click"]],template:function(i,o){i&1&&(d(0,"div",0)(1,"section",1)(2,"h2"),r(3,"Ayuda"),a(),d(4,"mat-icon",2),p("click",function(){return o.dialogRef.close()}),r(5,"close"),a()(),d(6,"section",3)(7,"h3"),r(8,"\xBFQu\xE9 es Pylab?"),a(),d(9,"p"),r(10," Pylab es una aplicaci\xF3n web que te permite entender diferentes algoritmos de una forma sencilla y divertida. Vas a poder explorar conceptos fundamentales de programaci\xF3n y algoritmos a tu propio ritmo. "),a(),d(11,"h3"),r(12,"\xBFC\xF3mo se ejecuta un algoritmo en Pylab?"),a(),d(13,"p"),r(14,"1) Seleccion\xE1 un tema que quieras aprender desde la "),d(15,"span",4),p("click",function(){return o.navigateToHome()}),r(16,"pantalla principal"),a(),r(17,". Esto te llevar\xE1 a una lista de programas relacionados, ordenados seg\xFAn dificultad de menor a mayor."),a(),d(18,"p"),r(19,'2) Hac\xE9 click en "Ver Ejemplo" para acceder a un algoritmo en particular.'),a(),d(20,"p"),r(21,"3) Ejecut\xE1 el paso a paso! Para esto podes elegir avanzar de una l\xEDnea por vez de manera manual o de manera autom\xE1tica, eligiendo la velocidad. A medida que avances, pod\xE9s ver como van variando las variables y los outputs."),a()()())},dependencies:[w,S],styles:[".help-dialog-container[_ngcontent-%COMP%]{padding:20px;max-height:50vh;max-width:60vw;min-width:60vw}.x-close[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;color:var(--pylab-accent)}h3[_ngcontent-%COMP%]{margin:10px 0;color:var(--pylab-primary)}p[_ngcontent-%COMP%]{text-align:justify;color:var(--pylab-accent);line-height:25px}.help[_ngcontent-%COMP%]{margin:10px 0;padding:10px 0 20px}#navigate-home[_ngcontent-%COMP%]{color:var(--pylab-primary);font-weight:700;text-decoration:underline;cursor:pointer}"]});let e=t;return e})();var it=(()=>{let t=class t{constructor(n,i){this.router=n,this.location=i,this.history=[],this.behaviorSubjectIsHome=new B(!0),this.isHome=this.behaviorSubjectIsHome.asObservable()}startSaveHistory(){this.router.events.subscribe(n=>{n instanceof I&&(this.history.push(n.urlAfterRedirects),n.urlAfterRedirects!="/intro"?this.behaviorSubjectIsHome.next(!1):this.behaviorSubjectIsHome.next(!0))})}goBack(){this.history.pop(),this.history.length>0?this.location.back():this.router.navigateByUrl("/")}};t.\u0275fac=function(i){return new(i||t)(T(b),T(H))},t.\u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var et=(()=>{let t=class t{constructor(n,i,o){this.dialog=n,this.navigationService=i,this.router=o,this.sidebarEvent=new V,this.showBackButton=!1,this.navigationService.startSaveHistory(),this.router.events.subscribe(h=>{h instanceof I&&(this.showBackButton=!h.url.startsWith("/info/")&&!h.url.startsWith("/intro"))})}openHelpDialog(){let n=this.dialog.open(tt,{})}goBack(){this.navigationService.goBack()}navigateToHome(){this.router.navigate(["/home"])}};t.\u0275fac=function(i){return new(i||t)(c($),c(it),c(b))},t.\u0275cmp=l({type:t,selectors:[["app-header"]],outputs:{sidebarEvent:"sidebarEvent"},standalone:!0,features:[s],decls:10,vars:1,consts:[["color","primary"],["mat-icon-button","",3,"click","hidden"],["src","assets/logo-blanco.png","alt","Pylab",1,"logo",3,"click"],[1,"spacer"],["mat-icon-button","",3,"click"]],template:function(i,o){i&1&&(d(0,"mat-toolbar",0)(1,"button",1),p("click",function(){return o.goBack()}),d(2,"mat-icon"),r(3,"arrow_back"),a()(),d(4,"img",2),p("click",function(){return o.navigateToHome()}),a(),f(5,"img")(6,"span",3),d(7,"button",4),p("click",function(){return o.openHelpDialog()}),d(8,"mat-icon"),r(9,"help"),a()()()),i&2&&(y(),O("hidden",!o.showBackButton))},dependencies:[z,J,w,X,E,S],styles:[".spacer[_ngcontent-%COMP%]{flex:1 1 auto}img[_ngcontent-%COMP%]{width:6rem;cursor:pointer}"]});let e=t;return e})();var ot=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=_({type:t}),t.\u0275inj=g({imports:[m,m]});let e=t;return e})();var dt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=_({type:t}),t.\u0275inj=g({imports:[q,W,m,G,K,ot]});let e=t;return e})();var at=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=_({type:t}),t.\u0275inj=g({imports:[m,L,L,m]});let e=t;return e})();var xi=(()=>{let t=class t{constructor(n){this.router=n,this.menus=[{displayName:"Inicio",route:"/home",iconName:"home",profiles:[""]}]}};t.\u0275fac=function(i){return new(i||t)(c(b))},t.\u0275cmp=l({type:t,selectors:[["app-layout"]],standalone:!0,features:[s],decls:2,vars:0,template:function(i,o){i&1&&f(0,"app-header")(1,"router-outlet")},dependencies:[U,et,z,w,E,at,dt],styles:["mat-sidenav-container[_ngcontent-%COMP%]{height:calc(100vh - 64px)}.item[_ngcontent-%COMP%]{align-items:center;color:var(--pylab-accent)}mat-icon[_ngcontent-%COMP%]{vertical-align:middle;color:var(--pylab-accent)}"]});let e=t;return e})();export{xi as LayoutComponent};