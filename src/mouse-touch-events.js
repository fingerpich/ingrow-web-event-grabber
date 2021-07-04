
import { getElementMainProps } from "./utils/get-dom-props"

let downProp = {}
function down(isTouch) {
  return (event) => {
    const { x, y } = getMousePos(event);
    const { target: element } = event
    downProp = {is_touch: isTouch, x, y , ...getElementMainProps(element)}
  }
}
function getMousePos(e) {
  var posx;
  var posy;
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft;
    posy = e.clientY + document.body.scrollTop;
  }
  return {x: posx, y: posy}
}
function up(publish, isTouch) {
  return function(event) {
    const { x, y } = getMousePos(event);
    const { target: element } = event
    const dx = x - downProp.x
    const dy = y - downProp.y
    const notMoved = ((dx * dx + dy * dy) ** .5) < 25
    const action = notMoved ? (isTouch ? 'tap' : 'click') : 'drag'
    const eventData = { is_touch: isTouch, x, y , ...getElementMainProps(element), action }
    if (!notMoved) { eventData.from = downProp }
    publish(eventData)
  }
}

export function captureMouseTouchEvents(publish) {
  const observe = document.body.addEventListener
  observe('mousedown', down(publish, false))
  observe('touchstart', down(publish, true))

  observe('mouseup', up(publish, false))
  observe('touchend', up(publish, true))

}