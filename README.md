## JS SDK
This Javascript SDK is created by [Ingrow](https://ingrow.co) to easily use the Ingrow event streaming platform automatically.

## Install

```sh
yarn add ingrow-js-sdk
```

## How To use Ingrow Event Grabber
```js
import ingrowEventGrabber from "ingrow-js-event-grabber"
const ingrowConfig = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }
startIngrowEventGrabber(ingrowConfig)
```

## How to use sampleRate for Events
```js
const sampleRates = {
    mouse = 1, 
    page = 1,
    error = 1,
    domChange = 1,
}
startIngrowEventGrabber(ingrowConfig, sampleRates)
```

## how to use autograbber alongside
when you install `ingrow-js-event-grabber` the `ingrow-js-sdk` will be installed automatically so you can use it as the following code

```js
import Ingrow from "ingrow-js-sdk"
const ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )
startIngrowEventGrabber(ingrow)

// and on special events
ingrow.sendEvent("STREAM_NAME", {
    description: "paginate",
    event_type: "Click",
    element_type: "Button",
    time: new Date(),
})
```

## using middlewares
you can use middlewares to have more control over data before they get sent as following
```js
const middlewares = [
    (item, next) => {
        if (Math.random() > .5) {
            next()
        }
    },
    (item, next) => {
        item.date = Date.now()
        next(item) // passes the updated data to the next middlewares
    },
    (item, next) => {
        console.log(item)
        next() 
    },
]
startIngrowEventGrabber(ingrow, null, middlewares)
```


