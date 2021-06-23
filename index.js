import jsIngrow from "js-ingrow-sdk"
import { captureMouseTouchEvents } from "./src/mouse-touch-events"
import { capturePageEvents } from "./src/page-events"
import { captureErrors } from "./src/errors"
import { captureDomChanges } from "./src/dom-changes"
import { passedSampleRate } from "./src/utils/math"

export function autoGrabber(ingrow, grabberConfig) {
  let ingrowInstance;
  if (ingrow.projectID && ingrow.apiKey) {
    const { projectID, apiKey, user } = ingrow
    ingrowInstance = new jsIngrow(projectID, apiKey, user)
  } else if (ingrow.sendEvent) {
    ingrowInstance = ingrow
  } else {
    throw "ingrow be an instance of Ingrow class or contains ingrow sdk configs"
  }
  const {
    touchMouseEventSampleRate = 1, 
    pageEventSampleRate = 1,
    errorSampleRate = 1,
    domChangeSampleRate = 1,
  } = grabberConfig

  if (touchMouseEventSampleRate) {
    captureMouseTouchEvents((eventData) => {
      if (passedSampleRate(touchMouseEventSampleRate)) {
        ingrow.send("events", eventData, false)
      }
    })
  }

  if (pageEventSampleRate) {
    capturePageEvents((eventData) => {
      if (passedSampleRate(pageEventSampleRate)) {
        ingrow.send("events", eventData, true)
      }
    })
  }

  if (errorSampleRate) {
    captureErrors((eventData) => {
      if (passedSampleRate(errorSampleRate)) {
        ingrow.send("events", eventData, false)
      }
    })
  }

  if (domChangeSampleRate) {
    captureDomChanges(() => {
      if (passedSampleRate(domChangeSampleRate)) {
        ingrow.send("events", eventData, false)
      }
    })
  }
}