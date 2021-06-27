## JS SDK

<<<<<<< HEAD
This Javascript SDK is created by [Ingrow](https://ingrow.co) to using the Ingrow event streaming platform. It provides the functionality of collecting and sending events to the Ingrow system and make insights based on them.

## Install

Install with npm:

    npm install ingrow-js-sdk

Or with yarn:

    yarn add ingrow-js-sdk

## Import

Import ingrow with:

    import ingrow from "ingrow-js-sdk"

## Initialize

After importing SDK, you must initialize it by giving `api key` and `project id` that you have received from Ingrow panel.

    const myIngrow = new ingrow("API_KEY", "PROJECT_ID")

It is possible to trace events related to specific user by adding `user id` to arguments
and initialize like this:

    const myIngrow = new ingrow("API_KEY", "PROJECT_ID", "USER_ID")

By default ingrow set a cookie for every user that can be gravely useful for data analysis

By default the IP of user will attached automatically to events but You can
overwrite by sending the according IP in your custom data with `IP` key.

## Send Event

After initializing SDK, you can send event using `sendEvent()` method. You must pass stream name and custom data to sendEvent method. for example:

    myIngrow.sendEvent("STREAM_NAME", {
        description: "paginate",
        event_type: "Click",
        element_type: "Button",
        time: new Date(),
    })
 
`sendEvent` method will return a promise, so you can handle success or failure of event sending, like other promises.
=======
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
>>>>>>> get events automatically, and send them to ingrow
