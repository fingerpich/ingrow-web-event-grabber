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
    const { projectID, apiKey, userID = "" } = ingrow
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
    middlewares.push((eventData, next, eventConfig) => {
      let rate = rates[eventConfig.type]?.rate
      rate = rate > -1 ? rate : 1
      if (passedSampleRate(rate)) {
        next()
      }
    })
  }

  // adds some info to all events
  middlewares.unshift((eventData, next) => {
    eventData.page_url = window.location.pathname
    next(eventData)
  })

  middlewares.push((eventData, next, eventConfig) => {
    ingrowInstance.sendEvent(eventConfig.stream, eventData, {
      sendDeviceInfo: eventConfig.sendDeviceInfo,
    })
  })

  function callMiddleWares(middlewares, eventData, eventConfig) {
    middlewares.length && middlewares[0](eventData, (newEventData) => {
      callMiddleWares(middlewares.slice(1), newEventData || eventData, eventConfig)
    }, eventConfig)
  }

  eventsConfig.forEach(({type, stream, sendDeviceInfo, capture}) => {
    capture((eventData) => {
      const eventConfig = { type, stream, sendDeviceInfo }
      callMiddleWares(middlewares, eventData, eventConfig)
    })
  })
}

export const Ingrow = JsIngrow

export function setUser(userID) {
  ingrowInstance.setUser(userID)
}
export function setIp(ip) {
  ingrowInstance.ip = ip
}
