## Ingrow Event Grabber
This module is created by [Ingrow](https://ingrow.co) to send events automatically to Ingrow event streaming platform.

# Install and Initialize ingrow-event-grabber in an HTML file
```HTML
<script src="https://github.com/ingrowco/ingrow-event-grabber/blob/main/dist/index.js" />
<script>
    const ingrowConfig = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }
    IngrowEventGrabber.startEventGrabber(ingrowConfig)
</script>
```

# Install and Initialize ingrow-event-grabber in front-end JavaScript projects

```sh
yarn add ingrow-js-sdk
```
```js
import { startEventGrabber } from "ingrow-js-event-grabber"
const ingrowConfig = { apiKey: "API_KEY", projectID: "PROJECT_ID", userID: "" }
startEventGrabber(ingrowConfig)
```

## How to use sampleRates for Events
```js
const sampleRates = {
    mouse = 1, 
    page = 1,
    error = 1,
    domChange = 1,
}
startEventGrabber(ingrowConfig, sampleRates)
```

## How to use ingrowSdk manually alongside
When you install `ingrow-js-event-grabber` the `ingrow-js-sdk` is imported in so you can use it as the following code

```js
import { startEventGrabber, Ingrow, setUser } from "ingrow-js-event-grabber"
const ingrow = new Ingrow(apiKey: "API_KEY", projectID: "PROJECT_ID", user: "" )
startEventGrabber(ingrow)
// and on special events
ingrow.sendEvent("STREAM_NAME", {
    description: "paginate",
    event_type: "Click",
    element_type: "Button",
    time: new Date(),
})
```

## using middlewares
You can use middlewares to have more control over data before they get sent as following
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
startEventGrabber(ingrow, null, middlewares)
```
