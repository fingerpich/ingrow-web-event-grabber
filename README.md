## JS SDK

This Javascript SDK is created by [Ingrow](https://ingrow.co) to easily use the Ingrow event streaming platform automatically.

## Install

```sh
yarn add ingrow-js-sdk
```

## How To use Ingrow Event Grabber
```js
import ingrowEventGrabber from "ingrow-js-event-grabber"
const ingrowConfig = { apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" }
const eventGrabberConfig = {
    touchMouseEventSampleRate = 1, 
    pageEventSampleRate = 1,
    errorSampleRate = 1,
    domChangeSampleRate = 1,
}
startIngrowEventGrabber(ingrowConfig, eventGrabberConfig)
```

## how to use autograbber alongside
when you install `ingrow-js-event-grabber` the `ingrow-js-sdk` will be installed automatically so you can use it as the following code

```js
import Ingrow from "ingrow-js-sdk"
const ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )

startIngrowEventGrabber(ingrow, eventGrabberConfig)

// and on special events
ingrow.sendEvent("STREAM_NAME", {
    description: "paginate",
    event_type: "Click",
    element_type: "Button",
    time: new Date(),
})
```
