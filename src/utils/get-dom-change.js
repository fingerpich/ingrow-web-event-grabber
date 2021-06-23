
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
}

//Public interface
export default function subscribe(fn, delay) {
    if (delay) naiveDelay = delay;
    stack.push(fn);
};

// Naive approach for compatibility
function naive() {

    var last = document.getElementsByTagName('*');
    var lastlen = last.length;
    var timer = setTimeout(function check() {

        // get current state of the document
        var current = document.getElementsByTagName('*');
        var len = current.length;

        // if the length is different
        // it's fairly obvious
        if (len != lastlen) {
            // just make sure the loop finishes early
            last = [];
        }

        // go check every element in order
        for (var i = 0; i < len; i++) {
            if (current[i] !== last[i]) {
                callback();
                last = current;
                lastlen = len;
                break;
            }
        }

        // over, and over, and over again
        setTimeout(check, naiveDelay);

    }, naiveDelay);
}

// checks a particular event
function test(event) {
    el.addEventListener(event, function fn() {
        support[event] = true;
        el.removeEventListener(event, fn, false);
    }, false);
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if (MutationObserver) {
    var mutationObserver = new MutationObserver(callback)

    // have the observer observe foo for changes in children
    mutationObserver.observe( obj, { childList:true, subtree:true })
    return mutationObserver
} else {
    var support = {};
    var el = document.documentElement;

    //  Check for mutation events support
    if (window.addEventListener) {
        test('DOMSubtreeModified');
        test('DOMNodeInserted');
        test('DOMNodeRemoved');
    }
    if (support.DOMNodeInserted) {
        window.addEventListener("DOMContentLoaded", function () {
            if (support.DOMSubtreeModified) { // for FF 3+, Chrome
                el.addEventListener('DOMSubtreeModified', callback, false);
            } else { // for FF 2, Safari, Opera 9.6+
                el.addEventListener('DOMNodeInserted', callback, false);
                el.addEventListener('DOMNodeRemoved', callback, false);
            }
        }, false);
    } else if (document.onpropertychange) { // for IE 5.5+
        document.onpropertychange = callback;
    } else { // fallback
        naive();
    }
}

// do the dummy test
// var dummy = document.createElement("div");
// el.appendChild(dummy);
// el.removeChild(dummy);