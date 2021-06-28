
import { getDomPath } from "./utils/get-dom-path"

function getElementMainProps(element) {
  const path = getDomPath(element)
  const { nodeName, id, className } = element
  return { path, nodeName, id, className }
}

let downProp = {}
function down(isTouch) {
  return (event) => {
    const {target: element, clientX: x, clientY: y} = event
    downProp = {isTouch, x, y , ...getElementMainProps(element)}
  }
}
function up(publish, isTouch) {
  return function(event) {
    const {target: element, clientX: x, clientY: y} = event
    const dx = x - downProp.x
    const dy = y - downProp.y
    const notMoved = (dx * dx + dy * dy)^.5 < 25
    const action = notMoved ? (isTouch ? 'tap' : 'click') : 'drag'
    const eventData = { isTouch, x, y , ...getElementMainProps(element), action}
    publish(eventData)
  }
}

export function captureMouseTouchEvents(publish) {
  const observe = document.body.addEventListener
  observe('mousedown', down(publish))
  observe('touchstart', down(publish, true))

  observe('mouseup', up(publish))
  observe('touchend', up(publish, true))

}