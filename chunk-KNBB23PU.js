import{a as K,b as Q}from"./chunk-VIRNAJBB.js";import{d as U}from"./chunk-KOAWOLLS.js";import"./chunk-ZDQ6ILTK.js";import"./chunk-7LFWN6NF.js";import"./chunk-7KKEDIQL.js";import{c as z,d as x,f,h as G,j as u,k as H}from"./chunk-RESQ43ZJ.js";import{d as J}from"./chunk-VNJL7Y5K.js";import{a as A,b as N}from"./chunk-6JC6PT3M.js";import{R,T as q}from"./chunk-E5MVSGBN.js";import{h as $,j as B}from"./chunk-EYRDJ4LK.js";import{$b as T,Ab as P,Ac as D,Cb as w,Cc as V,Db as O,Eb as r,Fb as a,Gb as b,Hb as F,Ib as I,Kb as L,Nb as S,Pb as m,_b as s,ab as c,bb as d,dc as E,ec as j,oa as h,r as C,sb as g,ub as l,xa as y,ya as M,zb as v,zc as k}from"./chunk-RKST6CCA.js";import{i as _}from"./chunk-3U4P6EEP.js";var W=()=>[1,2,3,4,5];function X(t,e){t&1&&(r(0,"mat-icon"),s(1,"star"),a())}function Y(t,e){t&1&&(r(0,"mat-icon",10),s(1,"star_border"),a())}function Z(t,e){if(t&1&&(F(0),g(1,X,2,0,"mat-icon",8)(2,Y,2,0,"mat-icon",9),I()),t&2){let n=e.$implicit,i=m().$implicit;c(),l("ngIf",n<=i.difficulty),c(),l("ngIf",n>i.difficulty)}}function tt(t,e){if(t&1){let n=L();r(0,"div",1)(1,"section",2)(2,"h3"),s(3),a(),r(4,"div",3)(5,"span",4),s(6,"Dificultad:"),a(),r(7,"section",5),g(8,Z,3,2,"ng-container",6),a()()(),r(9,"button",7),S("click",function(){let o=y(n).$implicit,p=m(2);return M(p.goToDisplay(o))}),s(10,"Ver Ejemplo"),a()()}if(t&2){let n=e.$implicit;c(3),T(n.title),c(5),l("ngForOf",j(2,W))}}function et(t,e){if(t&1&&(r(0,"div",0),w(1,tt,11,3,"div",1,P),a()),t&2){let n=m();c(),O(n.programs)}}function it(t,e){if(t&1&&b(0,"app-spinner",11),t&2){let n=m();l("loading",n.loadingList)}}var ut=(()=>{let e=class e{constructor(i,o,p){this.router=i,this.route=o,this.fileService=p,this.programs=[],this.type="",this.loadingList=!0}ngOnInit(){return _(this,null,function*(){this.type=this.route.snapshot.paramMap.get("type")??"",yield this.loadFiles()})}loadFiles(){return _(this,null,function*(){this.loadingList=!0;try{let i=yield C(this.fileService.getList(this.type));this.loadingList=!1,this.programs=i.sort((o,p)=>o.difficulty-p.difficulty)}catch(i){console.log("Error loading files:",i)}})}goToDisplay(i){this.router.navigate(["/display",this.type,i.id],{state:{program:i}})}};e.\u0275fac=function(o){return new(o||e)(d(B),d($),d(U))},e.\u0275cmp=h({type:e,selectors:[["app-program-list"]],standalone:!0,features:[E],decls:2,vars:1,consts:[[1,"programs-container"],[1,"program"],[1,"header"],[1,"stars"],[2,"margin-right","5px"],[1,"icons"],[4,"ngFor","ngForOf"],["mat-flat-button","","color","primary",3,"click"],[4,"ngIf"],["class","not-filled",4,"ngIf"],[1,"not-filled"],[3,"loading"]],template:function(o,p){o&1&&g(0,et,3,0,"div",0)(1,it,1,1),o&2&&v(0,p.loadingList?1:0)},dependencies:[K,V,k,D,J,N,A,q,R,Q],styles:["*[_ngcontent-%COMP%]{color:var(--pylab-accent)}[_nghost-%COMP%]{display:block;height:100vh;overflow:auto}.programs-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:25px;gap:15px}.program[_ngcontent-%COMP%]{padding-top:10px;box-shadow:0 2px 10px #0006;border-radius:10px 10px 30px 30px;min-width:350px}.header[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;gap:15px;padding:15px}h3[_ngcontent-%COMP%]{width:70%;color:var(--pylab-accent);letter-spacing:1px}.stars[_ngcontent-%COMP%]{display:flex;gap:5px;align-items:center;justify-content:center;flex-wrap:wrap}.stars[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{display:flex;flex-direction:row}.stars[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--pylab-primary)}.stars[_ngcontent-%COMP%]   mat-icon.not-filled[_ngcontent-%COMP%]{color:rgba(var(--pylab-accent-rgb),.2)}button[_ngcontent-%COMP%]{width:100%;border-radius:0 0 30px 30px/0px 0px 30px 30px;line-height:30px}@media (min-width: 1000px){.program[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;border-radius:10px;padding:0;position:relative}.stars[_ngcontent-%COMP%]{flex-wrap:nowrap}.header[_ngcontent-%COMP%]{width:80%}button[_ngcontent-%COMP%]{width:fit-content;border-radius:30px 10px 10px 0/30px 10px 10px 0px;height:100%;position:absolute;right:0}}@media (max-width: 600px){.header[_ngcontent-%COMP%]{flex-direction:column;gap:10px;padding:15px}.stars[_ngcontent-%COMP%]{width:100%;justify-content:start}h3[_ngcontent-%COMP%]{width:100%;font-size:17px}}"],data:{animation:[z("listAnimation",[G("* <=> *",[u(":enter",[f({opacity:0}),H("60ms",x("600ms ease-out",f({opacity:1})))],{optional:!0}),u(":leave",x("200ms",f({opacity:0})),{optional:!0})])])]}});let t=e;return t})();export{ut as ProgramListComponent};
