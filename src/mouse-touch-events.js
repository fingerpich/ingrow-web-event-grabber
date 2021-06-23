
function getElementMainProps(element) {
  const path = getDomPath(element).join(" > ")
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
function up(sendEvent, isTouch) {
  return function(event) {
    const {target: element, clientX: x, clientY: y} = event
    const dx = x - downProp.x
    const dy = y - downProp.y
    const notMoved = (dx * dx + dy * dy)^.5 < 25
    const action = notMoved ? (isTouch ? 'tap' : 'click') : 'drag'
    const eventData = { isTouch, x, y , ...getElementMainProps(element), action}
    sendEvent(eventData)
  }
}

export function captureMouseTouchEvents(sendEvent) {
  const observe = document.body.addEventListener
  observe('mousedown', down(sendEvent))
  observe('touchstart', down(sendEvent, true))

  observe('mouseup', up(sendEvent))
  observe('touchend', up(sendEvent, true))

}