"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function getRandomString(e){for(var t="",n=0;n<e;n++)t+=Math.random().toString(36).substr(2,e-t.length);return t}function saveValue(e,t){var n;window.localStorage?window.localStorage.setItem(e,t):((n=new Date).setTime(n.getTime()+31536e7),n="expires="+n.toUTCString(),document.cookie="".concat(e,"=").concat(t,"; ").concat(n))}function getValue(e){return window.localStorage?window.localStorage.getItem(e):(null===(e=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))||void 0===e?void 0:e.pop())||""}function getCreatedAnonymousId(){var e="ingrow_events_anonymous_id",t=getValue(e);return t||saveValue(e,t=getRandomString(32)),t}function getDeviceInfo(){var e=navigator.userAgent,t=window.screen;return{userAgent:e,screen:{width:t.width,height:t.height}}}Object.defineProperty(exports,"__esModule",{value:!0});var Ingrow$1=function(){function r(e,t,n){_classCallCheck(this,r),this.apiKey=e,this.projectID=t,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.setUserID(n)}return _createClass(r,[{key:"setUserID",value:function(e){this.userId=e||""}},{key:"sendEvent",value:function(e,t,n){var r=n||{},n=void 0!==(n=r.sendDeviceInfo)&&n,o=r.done,a=[];(r=function(e,t){a.push({name:e,input:t})})("session",{anonymous_id:this.anonymousId,user_id:this.userId}),r("ip",{ip:this.ip}),n&&r("device",getDeviceInfo());var t={ingrow:{stream:e,project:this.projectID},enrichment:a,event:t},i=new XMLHttpRequest;i.open("POST","".concat(this.apiEndpoint,"/v1")),i.setRequestHeader("api-key",this.apiKey),i.send(JSON.stringify(t)),i.onload=function(){o&&o(i.response)},i.onerror=function(){o&&o(null,i.response)}}}]),r}(),dist=Ingrow$1;function ownKeys(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function getDomPath(e){for(var t=[];null!=e.parentNode;){for(var n=0,r=0,o=!!e.id,a=!0,i=e.className&&"string"==typeof e.className,s=e.parentNode.children,c=0;c<s.length;c++){var u=s[c];u.nodeName===e.nodeName&&(u===e?r=n:i&&u.className===e.className?i=!1:o&&u.id===e.id?o=!1:a&&u.nodeName===e.nodeName&&(a=!1)),n++}o?t.unshift("#"+e.id):i?t.unshift("."+e.className.split(" ").join(".")):a?t.unshift("."+e.nodeName.toLowerCase()):1<n?t.unshift(":nth-child("+(r+1)+")"):t.unshift(e.nodeName.toLowerCase()),e=e.parentNode}var d=t.slice(1);return d&&d.length?d.join(">"):""}function getElementMainProps(e){return{path:getDomPath(e),node_name:e.nodeName,id:e.id,class_name:e.className}}var downProp={};function down(r){return function(e){var t=getMousePos(e),n=t.x,t=t.y,e=e.target;downProp=_objectSpread2({is_touch:r,x:n,y:t},getElementMainProps(e))}}function getMousePos(e){var t,n;return(e=e||window.event).pageX||e.pageY?(t=e.pageX,n=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft,n=e.clientY+document.body.scrollTop),{x:t,y:n}}function up(a,i){return function(e){var t=getMousePos(e),n=t.x,r=t.y,o=e.target,t=n-downProp.x,e=r-downProp.y,t=Math.pow(t*t+e*e,.5)<25,e=t?i?"tap":"click":"drag",e=_objectSpread2(_objectSpread2({is_touch:i,x:n,y:r},getElementMainProps(o)),{},{action:e});t||(e.from=downProp),a(e)}}function captureMouseTouchEvents(e){var t=document.body.addEventListener;t("mousedown",down(e)),t("touchstart",down(e)),t("mouseup",up(e,!1)),t("touchend",up(e,!0))}function capturePageEvents(t){var e=window.addEventListener;e("load",function(){t({action:"load"})},{once:!0}),e("beforeunload",function(e){t({action:"leave"})}),e("unload",function(e){t({action:"leaved"})},{once:!0})}function captureErrors(r){window.onerror=function(e,t,n){r({error:e,url:t,line:n,action:"error"})}}var naiveDelay=300,stack=[];function callback(e){for(var t=0;t<stack.length;t++)stack[t](e)}function subscribe(e,t){t&&(naiveDelay=t),stack.push(e)}function naive(){var o=document.getElementsByTagName("*"),a=o.length;setTimeout(function e(){var t=document.getElementsByTagName("*"),n=t.length;n!=a&&(o=[]);for(var r=0;r<n;r++)if(t[r]!==o[r]){callback(),o=t,a=n;break}setTimeout(e,naiveDelay)},naiveDelay)}function test(t){el.addEventListener(t,function e(){support[t]=!0,el.removeEventListener(t,e,!1)},!1)}var mutationObserver,support,MutationObserver=window.MutationObserver||window.WebKitMutationObserver,el=document.documentElement;MutationObserver?(mutationObserver=new MutationObserver(callback)).observe(el,{childList:!0,subtree:!0}):(support={},window.addEventListener&&(test("DOMSubtreeModified"),test("DOMNodeInserted"),test("DOMNodeRemoved")),support.DOMNodeInserted?window.addEventListener("DOMContentLoaded",function(){support.DOMSubtreeModified?el.addEventListener("DOMSubtreeModified",callback,!1):(el.addEventListener("DOMNodeInserted",callback,!1),el.addEventListener("DOMNodeRemoved",callback,!1))},!1):document.onpropertychange?document.onpropertychange=callback:naive());var ingrowInstance,CheckDomChangesInterval=200;function captureDomChanges(r){subscribe(function(e){var t=[],n=[];e.forEach(function(e){_toConsumableArray(e.addedNodes).forEach(function(e){t.push(getElementMainProps(e))}),_toConsumableArray(e.removedNodes).forEach(function(e){n.push(getElementMainProps(e))})}),r({added_nodes:t,removed_nodes:n,action:"dom-changed"})},CheckDomChangesInterval)}function captureAjaxCalls(s){var c=window.fetch;window.fetch=function(){var e=arguments,t=this;console.log(arguments);var n=Array.prototype.slice.call(arguments),o=n[0],n=(n[1]||{}).method,a=(a=void 0===n?"GET":n).toUpperCase(),i=Date.now();return new Promise(function(r,n){return c.apply(t,e).then(function(e){var t=e.status,n=(Date.now()-i)/1e3;s({action:"200Ajax",url:o,method:a,status:t,takenSec:n}),r(e)}).catch(function(e){var t=(Date.now()-i)/1e3;s({action:"failedAjax",url:o,method:a,status:status,takenSec:t}),n(response)})})};var e=window.XMLHttpRequest.prototype,t=e.send,n=e.open,i={};e.open=function(){var e=Array.prototype.slice.call(arguments),t=e[0],e=e[1];return i[t]=e,n.apply(this,[].slice.call(arguments))},e.send=function(){var o=Date.now(),a=this;return a.addEventListener("readystatechange",function(){var e=(Date.now()-o)/1e3,t=a.responseURL,n=i[t]||"GET",r=a.status;t.includes("event.ingrow.co")||(4==a.readyState&&200<=r&&r<300?s({action:"200Ajax",url:t,method:n,status:r,takenSec:e}):4==a.readyState&&200!=r&&s({action:"failedAjax",url:t,method:n,status:r,takenSec:e}))},!1),t.apply(this,[].slice.call(arguments))}}function passedSampleRate(e){return Math.random()<e}function startEventGrabber(e,r){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[];if(i&&!Array.isArray(i))throw"should pass an array to the middlewares";if(e&&e.projectID&&e.apiKey){var t=e.projectID,n=e.apiKey,o=e.userID;ingrowInstance=new(dist.default||dist)(n,t,void 0===o?"":o)}else{if(null==e||!e.sendEvent)throw'autoGrabber( first parameter ingrow should be an instance of Ingrow class as following\n    ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )\n\n    or contains ingrow sdk configs like bellow\n    ingrow = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }';ingrowInstance=e}var s=[{type:"ajax",stream:"events",sendDeviceInfo:!1,waitForDom:!1,capture:captureAjaxCalls},{type:"mouse",stream:"events",sendDeviceInfo:!1,waitForDom:!0,capture:captureMouseTouchEvents},{type:"page",stream:"events",sendDeviceInfo:!0,waitForDom:!1,capture:capturePageEvents},{type:"domChange",stream:"events",sendDeviceInfo:!1,waitForDom:!0,capture:captureDomChanges},{type:"error",stream:"events",sendDeviceInfo:!1,waitForDom:!1,capture:captureErrors}];function a(a){s.forEach(function(e){var t=e.waitForDom,n=e.type,r=e.stream,o=e.sendDeviceInfo,e=e.capture;t===a&&e(function(e){!function t(n,r,o){n.length&&n[0](r,function(e){t(n.slice(1),e||r,o)},o)}(i,e,{type:n,stream:r,sendDeviceInfo:o})})})}r&&i.push(function(e,t,n){n=null===(n=r[n.type])||void 0===n?void 0:n.rate;passedSampleRate(n=-1<n?n:1)&&t()}),i.unshift(function(e,t){e.page_url=window.location.pathname,t(e)}),i.push(function(e,t,n){ingrowInstance.sendEvent(n.stream,e,{sendDeviceInfo:n.sendDeviceInfo})}),window.addEventListener("load",function(){a(!0)}),a(!1)}var Ingrow=dist;function setUser(e){ingrowInstance.setUserID(e)}function setIp(e){ingrowInstance.ip=e}exports.Ingrow=Ingrow,exports.setIp=setIp,exports.setUser=setUser,exports.startEventGrabber=startEventGrabber;
