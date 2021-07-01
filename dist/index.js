'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(e, n) {
  if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, n) {
  for (var t = 0; t < n.length; t++) {
    var o = n[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
  }
}

function _createClass(e, n, t) {
  return n && _defineProperties(e.prototype, n), t && _defineProperties(e, t), e;
}

function getRandomString(e) {
  for (var n = ""; n.length < e;) {
    n += Math.random().toString(36).substr(2, e - n.length);
  }

  return s;
}

function saveValue(e, n) {
  var t;
  window.localStorage ? window.localStorage.setItem(e, n) : ((t = new Date()).setTime(t.getTime() + 31536e7), t = "expires=" + t.toUTCString(), document.cookie = "".concat(e, "=").concat(n, "; ").concat(t));
}

function getValue(e) {
  return window.localStorage ? window.localStorage.getItem(e) : (null === (e = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) || void 0 === e ? void 0 : e.pop()) || "";
}

function getCreatedAnonymousId() {
  var e = getValue("ingrow_events_anonymous_id");
  return e || saveValue("ingrow_events_anonymous_id", e = getRandomString(32)), e;
}

function getDeviceInfo() {
  var e = navigator.userAgent,
      n = window.screen;
  return {
    userAgent: e,
    screen: {
      width: n.width,
      height: n.height
    }
  };
}

var Ingrow$1 = function () {
  function o(e, n, t) {
    _classCallCheck(this, o), this.apiKey = e, this.projectID = n, this.apiEndpoint = "https://event.ingrow.co", this.anonymousId = getCreatedAnonymousId(), this.ip = "autofill", this.setUserID(t);
  }

  return _createClass(o, [{
    key: "setUserID",
    value: function value(e) {
      this.userId = e || "";
    }
  }, {
    key: "sendEvent",
    value: function value(e, n, t) {
      var o = t || {},
          t = o.sendDeviceInfo,
          i = o.done,
          r = [],
          o = function o(e, n) {
        r.push({
          name: e,
          input: n
        });
      };

      o("session", {
        anonymous_id: this.anonymousId,
        user_id: this.userId
      }), o("ip", {
        ip: this.ip
      }), void 0 !== t && t && o("device", getDeviceInfo());
      var n = {
        ingrow: {
          stream: e,
          project: this.projectID
        },
        enrichment: r,
        event: n
      },
          s = new XMLHttpRequest();
      s.open("POST", "".concat(this.apiEndpoint, "/v1")), s.setRequestHeader("api-key", this.apiKey), s.send(JSON.stringify(n)), s.onload = function () {
        i && i(s.response);
      }, s.onerror = function () {
        i && i(null, s.response);
      };
    }
  }]), o;
}();

var dist = Ingrow$1;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// https://gist.github.com/karlgroves/7544592
function getDomPath(el) {
  var stack = [];

  while (el.parentNode != null) {
    var sibCount = 0;
    var sibIndex = 0;

    for (var i = 0; i < el.parentNode.childNodes.length; i++) {
      var sib = el.parentNode.childNodes[i];

      if (sib.nodeName == el.nodeName) {
        if (sib === el) {
          sibIndex = sibCount;
        }

        sibCount++;
      }
    }

    if (el.hasAttribute && el.hasAttribute('id') && el.id != '') {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if (sibCount > 1) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }

    el = el.parentNode;
  }

  var stackEl = stack.slice(1); // removes the html element

  var domPathString = stackEl && stackEl.length ? stackEl.join(">") : "";
  return domPathString;
}

function getElementMainProps(element) {
  var path = getDomPath(element);
  var nodeName = element.nodeName,
      id = element.id,
      className = element.className;
  return {
    path: path,
    nodeName: nodeName,
    id: id,
    className: className
  };
}

var downProp = {};

function down(isTouch) {
  return function (event) {
    var element = event.target,
        x = event.clientX,
        y = event.clientY;
    downProp = _objectSpread2({
      isTouch: isTouch,
      x: x,
      y: y
    }, getElementMainProps(element));
  };
}

function up(publish, isTouch) {
  return function (event) {
    var element = event.target,
        x = event.clientX,
        y = event.clientY;
    var dx = x - downProp.x;
    var dy = y - downProp.y;
    var notMoved = Math.pow(dx * dx + dy * dy, .5) < 25;
    var action = notMoved ? isTouch ? 'tap' : 'click' : 'drag';

    var eventData = _objectSpread2(_objectSpread2({
      isTouch: isTouch,
      x: x,
      y: y
    }, getElementMainProps(element)), {}, {
      action: action
    });

    if (!notMoved) {
      eventData.from = downProp;
    }

    publish(eventData);
  };
}

function captureMouseTouchEvents(publish) {
  var observe = document.body.addEventListener;
  observe('mousedown', down(publish));
  observe('touchstart', down(publish));
  observe('mouseup', up(publish));
  observe('touchend', up(publish, true));
}

function capturePageEvents(publish) {
  document.addEventListener("DOMContentLoaded", function () {
    publish({
      action: "load"
    });
  });
  var wObserve = window.addEventListener;
  wObserve('beforeunload', function (event) {
    publish({
      action: "load"
    });
  });
  wObserve('unload', function (event) {
    publish({
      action: "load"
    });
  });
}

function captureErrors(publish) {
  window.onerror = function (error, url, line) {
    publish({
      error: error,
      url: url,
      line: line,
      action: "error"
    });
  };
}

// Most of the following codes are copied from
// https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
// But I changed it because
// 1 - It didn't send the recordedChanges
// 2 - It didn't use MutationObserver when its available
// 3 - delay should not affect chunking recordedChanges and we should decide about the chunks out of this module
var naiveDelay = 300;
var stack = []; // Manage event queue

function callback(recordedChanges) {
  for (var i = 0; i < stack.length; i++) {
    stack[i](recordedChanges);
  }
} //Public interface


function subscribe(fn, delay) {
  if (delay) naiveDelay = delay;
  stack.push(fn);
}

function naive() {
  var last = document.getElementsByTagName('*');
  var lastlen = last.length;
  setTimeout(function check() {
    // get current state of the document
    var current = document.getElementsByTagName('*');
    var len = current.length; // if the length is different
    // it's fairly obvious

    if (len != lastlen) {
      // just make sure the loop finishes early
      last = [];
    } // go check every element in order


    for (var i = 0; i < len; i++) {
      if (current[i] !== last[i]) {
        callback();
        last = current;
        lastlen = len;
        break;
      }
    } // over, and over, and over again


    setTimeout(check, naiveDelay);
  }, naiveDelay);
} // checks a particular event


function test(event) {
  el.addEventListener(event, function fn() {
    support[event] = true;
    el.removeEventListener(event, fn, false);
  }, false);
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var el = document.documentElement;

if (MutationObserver) {
  var mutationObserver = new MutationObserver(callback); // have the observer observe foo for changes in children

  mutationObserver.observe(el, {
    childList: true,
    subtree: true
  });
} else {
  var support = {}; //  Check for mutation events support

  if (window.addEventListener) {
    test('DOMSubtreeModified');
    test('DOMNodeInserted');
    test('DOMNodeRemoved');
  }

  if (support.DOMNodeInserted) {
    window.addEventListener("DOMContentLoaded", function () {
      if (support.DOMSubtreeModified) {
        // for FF 3+, Chrome
        el.addEventListener('DOMSubtreeModified', callback, false);
      } else {
        // for FF 2, Safari, Opera 9.6+
        el.addEventListener('DOMNodeInserted', callback, false);
        el.addEventListener('DOMNodeRemoved', callback, false);
      }
    }, false);
  } else if (document.onpropertychange) {
    // for IE 5.5+
    document.onpropertychange = callback;
  } else {
    // fallback
    naive();
  }
} // do the dummy test
// var dummy = document.createElement("div");
// el.appendChild(dummy);
// el.removeChild(dummy);

var CheckDomChangesInterval = 200;
function captureDomChanges(publish) {
  subscribe(function (changes) {
    var addedNodes = [];
    var removedNodes = [];
    changes.forEach(function (record) {
      _toConsumableArray(record.addedNodes).forEach(function (addedItem) {
        addedNodes.push(getElementMainProps(addedItem));
      });

      _toConsumableArray(record.removedNodes).forEach(function (addedItem) {
        removedNodes.push(getElementMainProps(addedItem));
      });
    });
    publish({
      addedNodes: addedNodes,
      removedNodes: removedNodes,
      action: "dom-changed"
    });
  }, CheckDomChangesInterval);
}

function passedSampleRate(value) {
  return Math.random() < value;
}

var ingrowInstance;
function startEventGrabber(ingrow, rates) {
  var middlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (middlewares && !Array.isArray(middlewares)) {
    throw "should pass an array to the middlewares";
  }

  if (ingrow && ingrow.projectID && ingrow.apiKey) {
    var projectID = ingrow.projectID,
        apiKey = ingrow.apiKey,
        userID = ingrow.userID;
    ingrowInstance = new (dist["default"] || dist)(apiKey, projectID, userID);
  } else if (ingrow !== null && ingrow !== void 0 && ingrow.sendEvent) {
    ingrowInstance = ingrow;
  } else {
    throw "autoGrabber( first parameter ingrow should be an instance of Ingrow class as following\n    ingrow = new Ingrow(apiKey: \"API_KEY\", projectID: \"PROJECT_ID\", user: \"\" )\n\n    or contains ingrow sdk configs like bellow\n    ingrow = { apiKey: \"API_KEY\", projectID: \"PROJECT_ID\", userID: \"\" }";
  }

  var eventsConfig = [{
    type: "mouse",
    stream: "events",
    sendDeviceInfo: false,
    capture: captureMouseTouchEvents
  }, {
    type: "page",
    stream: "events",
    sendDeviceInfo: true,
    capture: capturePageEvents
  }, {
    type: "domChange",
    stream: "events",
    sendDeviceInfo: false,
    capture: captureDomChanges
  }, {
    type: "error",
    stream: "events",
    sendDeviceInfo: false,
    capture: captureErrors
  }];

  if (rates) {
    middlewares.push(function (item, next) {
      var _rates$item$type;

      var rate = (_rates$item$type = rates[item.type]) === null || _rates$item$type === void 0 ? void 0 : _rates$item$type.rate;
      rate = rate > -1 ? rate : 1;

      if (passedSampleRate(rate)) {
        next(item);
      }
    });
  }

  middlewares.push(function (item, next) {
    ingrowInstance.sendEvent(item.stream, item.eventData, item.sendDeviceInfo);
  });

  function callMiddleWares(middlewares, value) {
    middlewares.length && middlewares[0](value, function (newValue) {
      callMiddleWares(middlewares.slice(1), newValue || value);
    });
  }

  eventsConfig.forEach(function (item) {
    item.capture(function (eventData) {
      item.eventData = eventData;
      callMiddleWares(middlewares, eventData);
    });
  });
}
var Ingrow = dist;
function setUser(userID) {
  ingrowInstance.setUser(userID);
}

exports.Ingrow = Ingrow;
exports.setUser = setUser;
exports.startEventGrabber = startEventGrabber;
