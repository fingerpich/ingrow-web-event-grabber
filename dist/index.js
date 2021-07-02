"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function getRandomString(e){for(var t="",n=0;n<e;n++)t+=Math.random().toString(36).substr(2,e-t.length);return t}function saveValue(e,t){var n;window.localStorage?window.localStorage.setItem(e,t):((n=new Date).setTime(n.getTime()+31536e7),n="expires="+n.toUTCString(),document.cookie="".concat(e,"=").concat(t,"; ").concat(n))}function getValue(e){return window.localStorage?window.localStorage.getItem(e):(null===(e=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))||void 0===e?void 0:e.pop())||""}function getCreatedAnonymousId(){var e=getValue("ingrow_events_anonymous_id");return e||saveValue("ingrow_events_anonymous_id",e=getRandomString(32)),e}function getDeviceInfo(){var e=navigator.userAgent,t=window.screen;return{userAgent:e,screen:{width:t.width,height:t.height}}}Object.defineProperty(exports,"__esModule",{value:!0});var Ingrow$1=function(){function r(e,t,n){_classCallCheck(this,r),this.apiKey=e,this.projectID=t,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.setUserID(n)}return _createClass(r,[{key:"setUserID",value:function(e){this.userId=e||""}},{key:"sendEvent",value:function(e,t,n){var r=n||{},n=r.sendDeviceInfo,o=r.done,a=[];(r=function(e,t){a.push({name:e,input:t})})("session",{anonymous_id:this.anonymousId,user_id:this.userId}),r("ip",{ip:this.ip}),void 0!==n&&n&&r("device",getDeviceInfo());var t={ingrow:{stream:e,project:this.projectID},enrichment:a,event:t},i=new XMLHttpRequest;i.open("POST","".concat(this.apiEndpoint,"/v1")),i.setRequestHeader("api-key",this.apiKey),i.send(JSON.stringify(t)),i.onload=function(){o&&o(i.response)},i.onerror=function(){o&&o(null,i.response)}}}]),r}(),dist=Ingrow$1;function ownKeys(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function getDomPath(e){for(var t=[];null!=e.parentNode;){for(var n=0,r=0,o=0;o<e.parentNode.childNodes.length;o++){var a=e.parentNode.childNodes[o];a.nodeName==e.nodeName&&(a===e&&(r=n),n++)}e.hasAttribute&&e.hasAttribute("id")&&""!=e.id?t.unshift(e.nodeName.toLowerCase()+"#"+e.id):1<n?t.unshift(e.nodeName.toLowerCase()+":eq("+r+")"):t.unshift(e.nodeName.toLowerCase()),e=e.parentNode}var i=t.slice(1);return i&&i.length?i.join(">"):""}function getElementMainProps(e){return{path:getDomPath(e),nodeName:e.nodeName,id:e.id,className:e.className}}var downProp={};function down(r){return function(e){var t=e.target,n=e.clientX,e=e.clientY;downProp=_objectSpread2({isTouch:r,x:n,y:e},getElementMainProps(t))}}function up(a,i){return function(e){var t=e.target,n=e.clientX,r=e.clientY,o=n-downProp.x,e=r-downProp.y,o=Math.pow(o*o+e*e,.5)<25,e=o?i?"tap":"click":"drag",e=_objectSpread2(_objectSpread2({isTouch:i,x:n,y:r},getElementMainProps(t)),{},{action:e});o||(e.from=downProp),a(e)}}function captureMouseTouchEvents(e){var t=document.body.addEventListener;t("mousedown",down(e)),t("touchstart",down(e)),t("mouseup",up(e)),t("touchend",up(e,!0))}function capturePageEvents(t){document.addEventListener("DOMContentLoaded",function(){t({action:"load"})});var e=window.addEventListener;e("beforeunload",function(e){t({action:"load"})}),e("unload",function(e){t({action:"load"})})}function captureErrors(r){window.onerror=function(e,t,n){r({error:e,url:t,line:n,action:"error"})}}var naiveDelay=300,stack=[];function callback(e){for(var t=0;t<stack.length;t++)stack[t](e)}function subscribe(e,t){t&&(naiveDelay=t),stack.push(e)}function naive(){var o=document.getElementsByTagName("*"),a=o.length;setTimeout(function e(){var t=document.getElementsByTagName("*"),n=t.length;n!=a&&(o=[]);for(var r=0;r<n;r++)if(t[r]!==o[r]){callback(),o=t,a=n;break}setTimeout(e,naiveDelay)},naiveDelay)}function test(t){el.addEventListener(t,function e(){support[t]=!0,el.removeEventListener(t,e,!1)},!1)}var mutationObserver,support,MutationObserver=window.MutationObserver||window.WebKitMutationObserver,el=document.documentElement;MutationObserver?(mutationObserver=new MutationObserver(callback)).observe(el,{childList:!0,subtree:!0}):(support={},window.addEventListener&&(test("DOMSubtreeModified"),test("DOMNodeInserted"),test("DOMNodeRemoved")),support.DOMNodeInserted?window.addEventListener("DOMContentLoaded",function(){support.DOMSubtreeModified?el.addEventListener("DOMSubtreeModified",callback,!1):(el.addEventListener("DOMNodeInserted",callback,!1),el.addEventListener("DOMNodeRemoved",callback,!1))},!1):document.onpropertychange?document.onpropertychange=callback:naive());var ingrowInstance,CheckDomChangesInterval=200;function captureDomChanges(r){subscribe(function(e){var t=[],n=[];e.forEach(function(e){_toConsumableArray(e.addedNodes).forEach(function(e){t.push(getElementMainProps(e))}),_toConsumableArray(e.removedNodes).forEach(function(e){n.push(getElementMainProps(e))})}),r({addedNodes:t,removedNodes:n,action:"dom-changed"})},CheckDomChangesInterval)}function passedSampleRate(e){return Math.random()<e}function startEventGrabber(e,r){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[];if(n&&!Array.isArray(n))throw"should pass an array to the middlewares";if(e&&e.projectID&&e.apiKey){var t=e.projectID,o=e.apiKey,a=e.userID;ingrowInstance=new(dist.default||dist)(o,t,a)}else{if(null==e||!e.sendEvent)throw'autoGrabber( first parameter ingrow should be an instance of Ingrow class as following\n    ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )\n\n    or contains ingrow sdk configs like bellow\n    ingrow = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }';ingrowInstance=e}e=[{type:"mouse",stream:"events",sendDeviceInfo:!1,capture:captureMouseTouchEvents},{type:"page",stream:"events",sendDeviceInfo:!0,capture:capturePageEvents},{type:"domChange",stream:"events",sendDeviceInfo:!1,capture:captureDomChanges},{type:"error",stream:"events",sendDeviceInfo:!1,capture:captureErrors}];r&&n.push(function(e,t){var n=null===(n=r[e.type])||void 0===n?void 0:n.rate;passedSampleRate(n=-1<n?n:1)&&t(e)}),n.push(function(e,t){ingrowInstance.sendEvent(e.stream,e.eventData,e.sendDeviceInfo)}),e.forEach(function(t){t.capture(function(e){t.eventData=e,function t(n,r){n.length&&n[0](r,function(e){t(n.slice(1),e||r)})}(n,e)})})}var Ingrow=dist;function setUser(e){ingrowInstance.setUser(e)}exports.Ingrow=Ingrow,exports.setUser=setUser,exports.startEventGrabber=startEventGrabber;
