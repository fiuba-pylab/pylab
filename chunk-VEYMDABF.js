import{a as Mt,b as At}from"./chunk-ULWRKMMF.js";import{b as Dt,d as Ot,e as zt,m as A,p as Et}from"./chunk-O2BMXSYL.js";import{d as Lt}from"./chunk-7IPSC6GI.js";import{A as Tt,B as Pt,D as $,M as wt,S as St,T as Ct,a as vt,b as bt,g as yt,h as X,i as U,r as It,z as xt}from"./chunk-KWJPMI34.js";import{$b as N,Aa as it,Ac as ut,Bb as ct,Cb as pt,Db as dt,Eb as c,Ec as ft,Fb as h,Ga as z,Gb as L,Ha as ot,I as q,Kb as w,Na as nt,Nb as f,Pb as v,Ub as ht,Vb as mt,Wb as _t,X as u,_b as y,ab as p,ac as V,ba as W,bb as l,ca as R,dc as j,ea as D,f as C,h as Q,ha as K,ib as st,ja as J,jb as at,ka as tt,na as d,oa as k,ob as rt,oc as B,pa as F,qa as et,qc as H,rc as M,sb as E,tb as T,ub as g,vb as lt,wb as G,xa as I,xc as gt,ya as x,za as O,zb as P}from"./chunk-NL575MTC.js";import{a as S}from"./chunk-3U4P6EEP.js";var Ut=["tooltip"],Ft=20;var Nt=new D("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let n=K(A);return()=>n.scrollStrategies.reposition({scrollThrottle:Ft})}});function $t(n){return()=>n.scrollStrategies.reposition({scrollThrottle:Ft})}var Zt={provide:Nt,deps:[A],useFactory:$t};function Qt(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}var qt=new D("mat-tooltip-default-options",{providedIn:"root",factory:Qt});var Rt="tooltip-panel",kt=bt({passive:!0}),Wt=8,Kt=8,Jt=24,te=200,Vt=(()=>{let o=class o{get position(){return this._position}set position(t){t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(t){this._positionAtOrigin=X(t),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(t){this._disabled=X(t),this._disabled?this.hide(0):this._setupPointerEnterEventsIfNeeded()}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=U(t)}get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=U(t),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}get message(){return this._message}set message(t){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this._message,"tooltip"),this._message=t!=null?String(t).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage(),this._ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")})}))}get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}constructor(t,e,i,s,r,m,b,Bt,Ht,Z,_,Yt){this._overlay=t,this._elementRef=e,this._scrollDispatcher=i,this._viewContainerRef=s,this._ngZone=r,this._platform=m,this._ariaDescriber=b,this._focusMonitor=Bt,this._dir=Z,this._defaultOptions=_,this._position="below",this._positionAtOrigin=!1,this._disabled=!1,this._viewInitialized=!1,this._pointerExitEventsInitialized=!1,this._tooltipComponent=ee,this._viewportMargin=8,this._cssClassPrefix="mat-mdc",this.touchGestures="auto",this._message="",this._passiveListeners=[],this._destroyed=new C,this._scrollStrategy=Ht,this._document=Yt,_&&(this._showDelay=_.showDelay,this._hideDelay=_.hideDelay,_.position&&(this.position=_.position),_.positionAtOrigin&&(this.positionAtOrigin=_.positionAtOrigin),_.touchGestures&&(this.touchGestures=_.touchGestures)),Z.change.pipe(u(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)}),this._viewportMargin=Wt}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(u(this._destroyed)).subscribe(t=>{t?t==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let t=this._elementRef.nativeElement;clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._passiveListeners.forEach(([e,i])=>{t.removeEventListener(e,i,kt)}),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._ariaDescriber.removeDescription(t,this.message,"tooltip"),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay,e){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let i=this._createOverlay(e);this._detach(),this._portal=this._portal||new zt(this._tooltipComponent,this._viewContainerRef);let s=this._tooltipInstance=i.attach(this._portal).instance;s._triggerElement=this._elementRef.nativeElement,s._mouseLeaveHideDelay=this._hideDelay,s.afterHidden().pipe(u(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),s.show(t)}hide(t=this.hideDelay){let e=this._tooltipInstance;e&&(e.isVisible()?e.hide(t):(e._cancelPendingAnimations(),this._detach()))}toggle(t){this._isTooltipVisible()?this.hide():this.show(void 0,t)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(t){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!t)&&s._origin instanceof z)return this._overlayRef;this._detach()}let e=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),i=this._overlay.position().flexibleConnectedTo(this.positionAtOrigin?t||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(e);return i.positionChanges.pipe(u(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:i,panelClass:`${this._cssClassPrefix}-${Rt}`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(u(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(u(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(u(this._destroyed)).subscribe(s=>{this._isTooltipVisible()&&s.keyCode===27&&!yt(s)&&(s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0)))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){let e=t.getConfig().positionStrategy,i=this._getOrigin(),s=this._getOverlayPosition();e.withPositions([this._addOffset(S(S({},i.main),s.main)),this._addOffset(S(S({},i.fallback),s.fallback))])}_addOffset(t){let e=Kt,i=!this._dir||this._dir.value=="ltr";return t.originY==="top"?t.offsetY=-e:t.originY==="bottom"?t.offsetY=e:t.originX==="start"?t.offsetX=i?-e:e:t.originX==="end"&&(t.offsetX=i?e:-e),t}_getOrigin(){let t=!this._dir||this._dir.value=="ltr",e=this.position,i;e=="above"||e=="below"?i={originX:"center",originY:e=="above"?"top":"bottom"}:e=="before"||e=="left"&&t||e=="right"&&!t?i={originX:"start",originY:"center"}:(e=="after"||e=="right"&&t||e=="left"&&!t)&&(i={originX:"end",originY:"center"});let{x:s,y:r}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:s,originY:r}}}_getOverlayPosition(){let t=!this._dir||this._dir.value=="ltr",e=this.position,i;e=="above"?i={overlayX:"center",overlayY:"bottom"}:e=="below"?i={overlayX:"center",overlayY:"top"}:e=="before"||e=="left"&&t||e=="right"&&!t?i={overlayX:"end",overlayY:"center"}:(e=="after"||e=="right"&&t||e=="left"&&!t)&&(i={overlayX:"start",overlayY:"center"});let{x:s,y:r}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:s,overlayY:r}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),this._ngZone.onMicrotaskEmpty.pipe(q(1),u(this._destroyed)).subscribe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t,this._tooltipInstance._markForCheck())}_invertPosition(t,e){return this.position==="above"||this.position==="below"?e==="top"?e="bottom":e==="bottom"&&(e="top"):t==="end"?t="start":t==="start"&&(t="end"),{x:t,y:e}}_updateCurrentPositionClass(t){let{overlayY:e,originX:i,originY:s}=t,r;if(e==="center"?this._dir&&this._dir.value==="rtl"?r=i==="end"?"left":"right":r=i==="start"?"left":"right":r=e==="bottom"&&s==="top"?"above":"below",r!==this._currentPosition){let m=this._overlayRef;if(m){let b=`${this._cssClassPrefix}-${Rt}-`;m.removePanelClass(b+this._currentPosition),m.addPanelClass(b+r)}this._currentPosition=r}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._passiveListeners.length||(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",t=>{this._setupPointerExitEventsIfNeeded();let e;t.x!==void 0&&t.y!==void 0&&(e=t),this.show(void 0,e)}]):this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",t=>{let e=t.targetTouches?.[0],i=e?{x:e.clientX,y:e.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),clearTimeout(this._touchstartTimeout);let s=500;this._touchstartTimeout=setTimeout(()=>this.show(void 0,i),this._defaultOptions.touchLongPressShowDelay??s)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;let t=[];if(this._platformSupportsMouseEvents())t.push(["mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}],["wheel",e=>this._wheelListener(e)]);else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions.touchendHideDelay)};t.push(["touchend",e],["touchcancel",e])}this._addListeners(t),this._passiveListeners.push(...t)}_addListeners(t){t.forEach(([e,i])=>{this._elementRef.nativeElement.addEventListener(e,i,kt)})}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(t){if(this._isTooltipVisible()){let e=this._document.elementFromPoint(t.clientX,t.clientY),i=this._elementRef.nativeElement;e!==i&&!i.contains(e)&&this.hide()}}_disableNativeGesturesIfNecessary(){let t=this.touchGestures;if(t!=="off"){let e=this._elementRef.nativeElement,i=e.style;(t==="on"||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA")&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),(t==="on"||!e.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent"}}};o.\u0275fac=function(e){return new(e||o)(l(A),l(z),l(Dt),l(at),l(st),l(vt),l(It),l(xt),l(Nt),l(Pt),l(qt,8),l(gt))},o.\u0275dir=et({type:o,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(e,i){e&2&&G("mat-mdc-tooltip-disabled",i.disabled)},inputs:{position:[d.None,"matTooltipPosition","position"],positionAtOrigin:[d.None,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[d.None,"matTooltipDisabled","disabled"],showDelay:[d.None,"matTooltipShowDelay","showDelay"],hideDelay:[d.None,"matTooltipHideDelay","hideDelay"],touchGestures:[d.None,"matTooltipTouchGestures","touchGestures"],message:[d.None,"matTooltip","message"],tooltipClass:[d.None,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"],standalone:!0});let n=o;return n})(),ee=(()=>{let o=class o{constructor(t,e,i){this._changeDetectorRef=t,this._elementRef=e,this._isMultiline=!1,this._closeOnInteraction=!1,this._isVisible=!1,this._onHide=new C,this._showAnimation="mat-mdc-tooltip-show",this._hideAnimation="mat-mdc-tooltip-hide",this._animationsDisabled=i==="NoopAnimations"}show(t){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},t)}hide(t){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},t)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:t}){(!t||!this._triggerElement.contains(t))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let t=this._elementRef.nativeElement.getBoundingClientRect();return t.height>Jt&&t.width>=te}_handleAnimationEnd({animationName:t}){(t===this._showAnimation||t===this._hideAnimation)&&this._finalizeAnimation(t===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(t){t?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(t){let e=this._tooltip.nativeElement,i=this._showAnimation,s=this._hideAnimation;if(e.classList.remove(t?s:i),e.classList.add(t?i:s),this._isVisible!==t&&(this._isVisible=t,this._changeDetectorRef.markForCheck()),t&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let r=getComputedStyle(e);(r.getPropertyValue("animation-duration")==="0s"||r.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}t&&this._onShow(),this._animationsDisabled&&(e.classList.add("_mat-animation-noopable"),this._finalizeAnimation(t))}};o.\u0275fac=function(e){return new(e||o)(l(B),l(z),l(nt,8))},o.\u0275cmp=k({type:o,selectors:[["mat-tooltip-component"]],viewQuery:function(e,i){if(e&1&&ht(Ut,7),e&2){let s;mt(s=_t())&&(i._tooltip=s.first)}},hostAttrs:["aria-hidden","true"],hostVars:2,hostBindings:function(e,i){e&1&&f("mouseleave",function(r){return i._handleMouseLeave(r)}),e&2&&lt("zoom",i.isVisible()?1:null)},standalone:!0,features:[j],decls:4,vars:4,consts:[["tooltip",""],[1,"mdc-tooltip","mdc-tooltip--shown","mat-mdc-tooltip",3,"animationend","ngClass"],[1,"mdc-tooltip__surface","mdc-tooltip__surface-animation"]],template:function(e,i){if(e&1){let s=w();c(0,"div",1,0),f("animationend",function(m){return I(s),x(i._handleAnimationEnd(m))}),c(2,"div",2),y(3),h()()}e&2&&(G("mdc-tooltip--multiline",i._isMultiline),g("ngClass",i.tooltipClass),p(3),N(i.message))},dependencies:[ut],styles:['.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - 2*8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - 2*8px);align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}'],encapsulation:2,changeDetection:0});let n=o;return n})();var jt=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=F({type:o}),o.\u0275inj=R({providers:[Zt],imports:[Tt,ft,Et,$,$,Ot]});let n=o;return n})();function ie(n,o){if(n&1&&(c(0,"mat-option",16),y(1),h()),n&2){let a=o.$implicit;g("value",a),p(),V(" ",a," ")}}function oe(n,o){if(n&1){let a=w();c(0,"mat-form-field",13)(1,"mat-select",15),f("selectionChange",function(e){I(a);let i=v(2);return x(i._changePageSize(e.value))}),pt(2,ie,2,2,"mat-option",16,ct),h()()}if(n&2){let a=v(2);g("appearance",a._formFieldAppearance)("color",a.color),p(),g("value",a.pageSize)("disabled",a.disabled)("aria-labelledby",a._pageSizeLabelId)("panelClass",a.selectConfig.panelClass||"")("disableOptionCentering",a.selectConfig.disableOptionCentering),p(),dt(a._displayedPageSizeOptions)}}function ne(n,o){if(n&1&&(c(0,"div",14),y(1),h()),n&2){let a=v(2);p(),N(a.pageSize)}}function se(n,o){if(n&1&&(c(0,"div",2)(1,"div",12),y(2),h(),E(3,oe,4,7,"mat-form-field",13)(4,ne,2,1,"div",14),h()),n&2){let a=v();p(),T("id",a._pageSizeLabelId),p(),V(" ",a._intl.itemsPerPageLabel," "),p(),P(3,a._displayedPageSizeOptions.length>1?3:-1),p(),P(4,a._displayedPageSizeOptions.length<=1?4:-1)}}function ae(n,o){if(n&1){let a=w();c(0,"button",17),f("click",function(){I(a);let e=v();return x(e.firstPage())}),O(),c(1,"svg",7),L(2,"path",18),h()()}if(n&2){let a=v();g("matTooltip",a._intl.firstPageLabel)("matTooltipDisabled",a._previousButtonsDisabled())("matTooltipPosition","above")("disabled",a._previousButtonsDisabled()),T("aria-label",a._intl.firstPageLabel)}}function re(n,o){if(n&1){let a=w();c(0,"button",19),f("click",function(){I(a);let e=v();return x(e.lastPage())}),O(),c(1,"svg",7),L(2,"path",20),h()()}if(n&2){let a=v();g("matTooltip",a._intl.lastPageLabel)("matTooltipDisabled",a._nextButtonsDisabled())("matTooltipPosition","above")("disabled",a._nextButtonsDisabled()),T("aria-label",a._intl.lastPageLabel)}}var Y=(()=>{let o=class o{constructor(){this.changes=new C,this.itemsPerPageLabel="Items per page:",this.nextPageLabel="Next page",this.previousPageLabel="Previous page",this.firstPageLabel="First page",this.lastPageLabel="Last page",this.getRangeLabel=(t,e,i)=>{if(i==0||e==0)return`0 of ${i}`;i=Math.max(i,0);let s=t*e,r=s<i?Math.min(s+e,i):s+e;return`${s+1} \u2013 ${r} of ${i}`}}};o.\u0275fac=function(e){return new(e||o)},o.\u0275prov=W({token:o,factory:o.\u0275fac,providedIn:"root"});let n=o;return n})();function le(n){return n||new Y}var ce={provide:Y,deps:[[new J,new tt,Y]],useFactory:le},pe=50;var de=new D("MAT_PAGINATOR_DEFAULT_OPTIONS"),he=0,me=(()=>{let o=class o{get pageIndex(){return this._pageIndex}set pageIndex(t){this._pageIndex=Math.max(t||0,0),this._changeDetectorRef.markForCheck()}get length(){return this._length}set length(t){this._length=t||0,this._changeDetectorRef.markForCheck()}get pageSize(){return this._pageSize}set pageSize(t){this._pageSize=Math.max(t||0,0),this._updateDisplayedPageSizeOptions()}get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(t){this._pageSizeOptions=(t||[]).map(e=>M(e,0)),this._updateDisplayedPageSizeOptions()}constructor(t,e,i){if(this._intl=t,this._changeDetectorRef=e,this._pageSizeLabelId=`mat-paginator-page-size-label-${he++}`,this._isInitialized=!1,this._initializedStream=new Q(1),this._pageIndex=0,this._length=0,this._pageSizeOptions=[],this.hidePageSize=!1,this.showFirstLastButtons=!1,this.selectConfig={},this.disabled=!1,this.page=new ot,this.initialized=this._initializedStream,this._intlChanges=t.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),i){let{pageSize:s,pageSizeOptions:r,hidePageSize:m,showFirstLastButtons:b}=i;s!=null&&(this._pageSize=s),r!=null&&(this._pageSizeOptions=r),m!=null&&(this.hidePageSize=m),b!=null&&(this.showFirstLastButtons=b)}this._formFieldAppearance=i?.formFieldAppearance||"outline"}ngOnInit(){this._isInitialized=!0,this._updateDisplayedPageSizeOptions(),this._initializedStream.next()}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe()}nextPage(){if(!this.hasNextPage())return;let t=this.pageIndex;this.pageIndex=this.pageIndex+1,this._emitPageEvent(t)}previousPage(){if(!this.hasPreviousPage())return;let t=this.pageIndex;this.pageIndex=this.pageIndex-1,this._emitPageEvent(t)}firstPage(){if(!this.hasPreviousPage())return;let t=this.pageIndex;this.pageIndex=0,this._emitPageEvent(t)}lastPage(){if(!this.hasNextPage())return;let t=this.pageIndex;this.pageIndex=this.getNumberOfPages()-1,this._emitPageEvent(t)}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let t=this.getNumberOfPages()-1;return this.pageIndex<t&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(t){let e=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(e/t)||0,this.pageSize=t,this._emitPageEvent(i)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:pe),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((t,e)=>t-e),this._changeDetectorRef.markForCheck())}_emitPageEvent(t){this.page.emit({previousPageIndex:t,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}};o.\u0275fac=function(e){return new(e||o)(l(Y),l(B),l(de,8))},o.\u0275cmp=k({type:o,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[d.HasDecoratorInputTransform,"pageIndex","pageIndex",M],length:[d.HasDecoratorInputTransform,"length","length",M],pageSize:[d.HasDecoratorInputTransform,"pageSize","pageSize",M],pageSizeOptions:"pageSizeOptions",hidePageSize:[d.HasDecoratorInputTransform,"hidePageSize","hidePageSize",H],showFirstLastButtons:[d.HasDecoratorInputTransform,"showFirstLastButtons","showFirstLastButtons",H],selectConfig:"selectConfig",disabled:[d.HasDecoratorInputTransform,"disabled","disabled",H]},outputs:{page:"page"},exportAs:["matPaginator"],standalone:!0,features:[rt,j],decls:14,vars:14,consts:[[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-live","polite",1,"mat-mdc-paginator-range-label"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-previous",3,"click","matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-next",3,"click","matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],[1,"mat-mdc-paginator-page-size-label"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],[1,"mat-mdc-paginator-page-size-value"],["hideSingleSelectionIndicator","",3,"selectionChange","value","disabled","aria-labelledby","panelClass","disableOptionCentering"],[3,"value"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-first",3,"click","matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["mat-icon-button","","type","button",1,"mat-mdc-paginator-navigation-last",3,"click","matTooltip","matTooltipDisabled","matTooltipPosition","disabled"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(e,i){e&1&&(c(0,"div",0)(1,"div",1),E(2,se,5,4,"div",2),c(3,"div",3)(4,"div",4),y(5),h(),E(6,ae,3,5,"button",5),c(7,"button",6),f("click",function(){return i.previousPage()}),O(),c(8,"svg",7),L(9,"path",8),h()(),it(),c(10,"button",9),f("click",function(){return i.nextPage()}),O(),c(11,"svg",7),L(12,"path",10),h()(),E(13,re,3,5,"button",11),h()()()),e&2&&(p(2),P(2,i.hidePageSize?-1:2),p(3),V(" ",i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length)," "),p(),P(6,i.showFirstLastButtons?6:-1),p(),g("matTooltip",i._intl.previousPageLabel)("matTooltipDisabled",i._previousButtonsDisabled())("matTooltipPosition","above")("disabled",i._previousButtonsDisabled()),T("aria-label",i._intl.previousPageLabel),p(3),g("matTooltip",i._intl.nextPageLabel)("matTooltipDisabled",i._nextButtonsDisabled())("matTooltipPosition","above")("disabled",i._nextButtonsDisabled()),T("aria-label",i._intl.nextPageLabel),p(3),P(13,i.showFirstLastButtons?13:-1))},dependencies:[Lt,Mt,wt,St,Vt],styles:[".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color);background-color:var(--mat-paginator-container-background-color);font-family:var(--mat-paginator-container-text-font);line-height:var(--mat-paginator-container-text-line-height);font-size:var(--mat-paginator-container-text-size);font-weight:var(--mat-paginator-container-text-weight);letter-spacing:var(--mat-paginator-container-text-tracking);--mat-form-field-container-height:var(--mat-paginator-form-field-container-height);--mat-form-field-container-vertical-padding:var(--mat-paginator-form-field-container-vertical-padding)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size)}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color)}.mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color)}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"],encapsulation:2,changeDetection:0});let n=o;return n})(),ii=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=F({type:o}),o.\u0275inj=R({providers:[ce],imports:[Ct,At,jt,me]});let n=o;return n})();export{ii as a};