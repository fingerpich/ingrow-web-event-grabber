import jsIngrow from "ingrow-js-sdk"
import { captureMouseTouchEvents } from "./src/mouse-touch-events"
import { capturePageEvents } from "./src/page-events"
import { captureErrors } from "./src/errors"
import { captureDomChanges } from "./src/dom-changes"
import { passedSampleRate } from "./src/utils/math"

export function autoGrabber(ingrow, rates, middlewares = []) {
  if (!Array.isArray(middlewares)) {
    throw "should pass an array to the middlewares"
  }

  let ingrowInstance;
  if (ingrow.projectID && ingrow.apiKey) {
    const { projectID, apiKey, userID } = ingrow
    ingrowInstance = new jsIngrow(projectID, apiKey, user)
  } else if (ingrow.sendEvent) {
    ingrowInstance = ingrow
  } else {
    throw "ingrow be an instance of Ingrow class or contains ingrow sdk configs"
  }

  const eventsConfig = [
    { type: "mouse", stream: "events", sendDeviceInfo: false,
      capture: captureMouseTouchEvents},

    { type: "page", stream: "events", sendDeviceInfo: true,
      capture: capturePageEvents },

    { type: "domChange", stream: "events", sendDeviceInfo: false,
      capture: captureDomChanges },

    { type: "error", stream: "events", sendDeviceInfo: false,
      capture: captureErrors },
  ]

  if (rates) {
    middlewares.push((item, next) => {
      let rate = rates[item.type]?.rate
      rate = rate > -1 ? rate : 1
      if (passedSampleRate(rate)) {
        next(item)
      }
    })
  }

  middlewares.push((item, next) => {
    ingrow.send(item.stream, item.eventData, item.sendDeviceInfo)
  })

  function callMiddleWares(middlewares, value) {
    middlewares.length && middlewares[0](value, (newValue) => {
      callMiddleWares(middlewares.slice(1), newValue || value)
    })
  }

  eventsConfig.forEach((item) => {
    item.capture((eventData) => {
      item.eventData = eventData;
      callMiddleWares(middlewares, eventData)
    })
  })
}