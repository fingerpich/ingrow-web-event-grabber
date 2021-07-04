export function capturePageEvents(publish) {
  document.addEventListener("DOMContentLoaded", () => {
    publish({ action: "load" })
  }, { once: true })
  
  const wObserve = window.addEventListener
  wObserve('beforeunload', function(event) {
    publish({ action: "leaving" })
  })

  wObserve('unload', function(event) {
    publish({ action: "leaved" })
  }, { once: true })
}