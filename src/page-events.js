export function capturePageEvents(sendEvent) {
  document.addEventListener("DOMContentLoaded", () => {
    sendEvent({ action: "load" })
  })
  
  const wObserve = window.addEventListener
  wObserve('beforeunload', function(event) {
    sendEvent({ action: "load" })
  })

  wObserve('unload', function(event) {
    sendEvent({ action: "load" })
  })
}