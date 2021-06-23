export function captureErrors(sendEvent) {
  window.onerror = function(error, url, line) {
    sendEvent({error, url, line});
  };
}