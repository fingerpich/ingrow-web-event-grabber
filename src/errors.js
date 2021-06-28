export function captureErrors(publish) {
  window.onerror = function(error, url, line) {
    publish({error, url, line});
  };
}