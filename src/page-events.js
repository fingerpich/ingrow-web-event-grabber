export function capturePageEvents(publish) {
  document.addEventListener("DOMContentLoaded", () => {
    publish({ action: "load" })
  })
  
  const wObserve = window.addEventListener
  wObserve('beforeunload', function(event) {
    publish({ action: "load" })
  })

  wObserve('unload', function(event) {
    publish({ action: "load" })
  })
}