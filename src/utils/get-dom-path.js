// https://gist.github.com/karlgroves/7544592

export function getDomPath(el) {
  var stack = [];
  while ( el.parentNode != null ) {
    var sibCount = 0;
    var sibIndex = 0;
    let hasDifferentID = !!el.id
    let hasDifferentClassName = !!el.className
    const children = el.parentNode.children
    for ( var i = 0; i < children.length; i++ ) {
      var sib = children[i];
      if ( sib.nodeName === el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        } else {
          if (hasDifferentClassName && sib.className === el.className) {
            hasDifferentClassName = false
          } else if (hasDifferentID && sib.id === el.id) {
            hasDifferentID = false
          }
        }
      }
      sibCount++;
    }

    if ( hasDifferentID ) {
      stack.unshift('#' + el.id);
    } else if(hasDifferentClassName) {
      stack.unshift('.' + el.className.split(" ").join("."));
    } else if ( sibCount > 1 ) {
      stack.unshift(':nth-child(' + (sibIndex+1) + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  const stackEl = stack.slice(1) // removes the html element
  const domPathString = stackEl && stackEl.length ? stackEl.join(" > ") : "";
  return domPathString
}
