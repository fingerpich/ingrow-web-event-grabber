import JsIngrow from "ingrow-js-sdk"
import { captureMouseTouchEvents } from "./src/mouse-touch-events"
import { capturePageEvents } from "./src/page-events"
import { captureErrors } from "./src/errors"
import { captureDomChanges } from "./src/dom-changes"
import { passedSampleRate } from "./src/utils/math"

let ingrowInstance;

export function startEventGrabber(ingrow, rates, middlewares = []) {
  if (middlewares && !Array.isArray(middlewares)) {
    throw "should pass an array to the middlewares"
  }
  
  if (ingrow && ingrow.projectID && ingrow.apiKey) {
    const { projectID, apiKey, userID } = ingrow
    ingrowInstance = new (JsIngrow.default || JsIngrow)(apiKey, projectID , userID)
  } else if (ingrow?.sendEvent) {
    ingrowInstance = ingrow
  } else {
    throw `autoGrabber( first parameter ingrow should be an instance of Ingrow class as following
    ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )

    or contains ingrow sdk configs like bellow
    ingrow = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }`
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
    ingrowInstance.sendEvent(item.stream, item.eventData, item.sendDeviceInfo)
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

export const Ingrow = JsIngrow

export function setUser(userID) {
  ingrowInstance.setUser(userID)
}
