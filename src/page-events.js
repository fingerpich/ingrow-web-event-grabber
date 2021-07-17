export function capturePageEvents(publish) {
  const wObserve = window.addEventListener
  wObserve("load", () => {
    publish({ action: "load" })
  }, { once: true })
  
  wObserve('beforeunload', function(event) {
    publish({ action: "leave" })
  })

  wObserve('unload', function(event) {
    publish({ action: "leaved" })
  }, { once: true })
}