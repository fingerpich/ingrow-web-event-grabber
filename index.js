import jsIngrow from "js-ingrow-sdk"
import { captureMouseTouchEvents } from "./src/mouse-touch-events"
import { capturePageEvents } from "./page-events"
import { captureErrors } from "./errors"
import { captureDomChanges } from "./dom-changes"
import { passedSampleRate } from "./src/utils/math"

export function autoGrabber(projectID, apiKey, user, grabberConfig) {
  const ingrow = new jsIngrow(projectID, apiKey, user)
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