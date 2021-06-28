"use strict";function unwrapExports(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}Object.defineProperty(exports,"__esModule",{value:!0});var dist=createCommonjsModule(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=(o(s,null,[{key:"getRandomString",value:function(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="",n=0;n<32;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}},{key:"setCookie",value:function(e){var t=s.getRandomString();return document.cookie=e+"="+t,t}},{key:"getCookie",value:function(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}},{key:"checkCookie",value:function(e){return""!=s.getCookie(e)}}]),s);function s(){a(this,s)}o(u,[{key:"sendEvent",value:function(e,t){return fetch(this.apiEndpoint+"/v1",{method:"POST",headers:{"api-key":this.apiKey},body:JSON.stringify({ingrow:{stream:e,project:this.projectID},enrichment:[{name:"session",input:{anonymous_id:this.anonymousId,user_id:2<arguments.length&&void 0!==arguments[2]?arguments[2]:""}}],event:n({},this.IP,t)})})}}]),o=u;function u(e,t){a(this,u),this.apiKey=e,this.projectID=t,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=i.checkCookie("ingrow_events_anonymous_id")?i.getCookie("ingrow_events_anonymous_id"):i.setCookie("ingrow_events_anonymous_id"),this.ip={IP:"autofill"}}t.default=o});unwrapExports(dist);var ingrowJsSdk=dist;function getDomPath(e){for(var t=[];null!=e.parentNode;){for(var n=0,o=0,r=0;r<e.parentNode.childNodes.length;r++){var a=e.parentNode.childNodes[r];a.nodeName==e.nodeName&&(a===e&&(o=n),n++)}e.hasAttribute("id")&&""!=e.id?t.unshift(e.nodeName.toLowerCase()+"#"+e.id):1<n?t.unshift(e.nodeName.toLowerCase()+":eq("+o+")"):t.unshift(e.nodeName.toLowerCase()),e=e.parentNode}const i=t.slice(1);return i&&i.length?i.join(">"):""}function getElementMainProps(e){var{nodeName:t,id:n,className:o}=e;return{path:getDomPath(e),nodeName:t,id:n,className:o}}let downProp={};function down(o){return e=>{var{target:t,clientX:n,clientY:e}=e;downProp={isTouch:o,x:n,y:e,...getElementMainProps(t)}}}function up(a,i){return function(e){var{target:t,clientX:n,clientY:o}=e,r=n-downProp.x,e=o-downProp.y,e=r*r+e*e^!0?i?"tap":"click":"drag",e={isTouch:i,x:n,y:o,...getElementMainProps(t),action:e};a(e)}}function captureMouseTouchEvents(e){const t=document.body.addEventListener;t("mousedown",down(e)),t("touchstart",down(e)),t("mouseup",up(e)),t("touchend",up(e,!0))}function capturePageEvents(t){document.addEventListener("DOMContentLoaded",()=>{t({action:"load"})});const e=window.addEventListener;e("beforeunload",function(e){t({action:"load"})}),e("unload",function(e){t({action:"load"})})}function captureErrors(o){window.onerror=function(e,t,n){o({error:e,url:t,line:n})}}var naiveDelay=300,stack=[];function callback(e){for(var t=0;t<stack.length;t++)stack[t](e)}function subscribe(e,t){t&&(naiveDelay=t),stack.push(e)}function naive(){var r=document.getElementsByTagName("*"),a=r.length;setTimeout(function e(){var t=document.getElementsByTagName("*"),n=t.length;n!=a&&(r=[]);for(var o=0;o<n;o++)if(t[o]!==r[o]){callback(),r=t,a=n;break}setTimeout(e,naiveDelay)},naiveDelay)}function test(t){el.addEventListener(t,function e(){support[t]=!0,el.removeEventListener(t,e,!1)},!1)}var mutationObserver,support,MutationObserver=window.MutationObserver||window.WebKitMutationObserver,el=document.documentElement;MutationObserver?(mutationObserver=new MutationObserver(callback)).observe(el,{childList:!0,subtree:!0}):(support={},window.addEventListener&&(test("DOMSubtreeModified"),test("DOMNodeInserted"),test("DOMNodeRemoved")),support.DOMNodeInserted?window.addEventListener("DOMContentLoaded",function(){support.DOMSubtreeModified?el.addEventListener("DOMSubtreeModified",callback,!1):(el.addEventListener("DOMNodeInserted",callback,!1),el.addEventListener("DOMNodeRemoved",callback,!1))},!1):document.onpropertychange?document.onpropertychange=callback:naive());const CheckDomChangesInterval=200;function captureDomChanges(o){subscribe(e=>{const t=[],n=[];e.forEach(e=>e.addedNodes.length&t.push(...e.addedNodes)),e.forEach(e=>e.removedNodes.length&n.push(...e.removedNodes)),o({addedNodes:t,removedNodes:n})},CheckDomChangesInterval)}function passedSampleRate(e){return Math.random()<e}function autoGrabber(e,o,n=[]){if(n&&!Array.isArray(n))throw"should pass an array to the middlewares";let r;if(e&&e.projectID&&e.apiKey){var{projectID:t,apiKey:a,userID:i}=e;r=new(ingrowJsSdk.default||ingrowJsSdk)(t,a,i)}else{if(!e?.sendEvent)throw`autoGrabber( first parameter ingrow should be an instance of Ingrow class as following
    ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )

    or contains ingrow sdk configs like bellow
    ingrow = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }`;r=e}const s=[{type:"mouse",stream:"events",sendDeviceInfo:!1,capture:captureMouseTouchEvents},{type:"page",stream:"events",sendDeviceInfo:!0,capture:capturePageEvents},{type:"domChange",stream:"events",sendDeviceInfo:!1,capture:captureDomChanges},{type:"error",stream:"events",sendDeviceInfo:!1,capture:captureErrors}];o&&n.push((e,t)=>{let n=o[e.type]?.rate;n=-1<n?n:1,passedSampleRate(n)&&t(e)}),n.push((e,t)=>{r.sendEvent(e.stream,e.eventData,e.sendDeviceInfo)}),s.forEach(t=>{t.capture(e=>{t.eventData=e,function t(n,o){n.length&&n[0](o,e=>{t(n.slice(1),e||o)})}(n,e)})})}exports.autoGrabber=autoGrabber;
