export function captureAjaxCalls(publish) {
  const constantMock = window.fetch;
  window.fetch = function() {
    console.log(arguments)
    const [ url, config ] = arguments
    let { method = "GET" } = config || {}
    method = method.toUpperCase()
    const sendTime = Date.now()
    return new Promise((resolve, reject) => {
      return constantMock.apply(this, arguments)
        .then((response) => {
          const status = response.status
          const takenSec = (Date.now() - sendTime) / 1000
          publish({
            action: "200Ajax", 
            url, method,
            status, takenSec
          });
          resolve(response);
        })
        .catch((error) => {
          const takenSec = (Date.now() - sendTime) / 1000
          publish({
            action: "failedAjax", 
            url, method,
            status, takenSec
          });
          reject(response);
        })
    })
  }
  
  const xhrPrototype = window.XMLHttpRequest.prototype
  const { send: sendProto, open: openProto } = xhrPrototype
  const urlMethod = {}
  xhrPrototype.open = function() {
    const [url, method] = arguments
    urlMethod[url] = method
    return openProto.apply(this, [].slice.call(arguments))
  }
  xhrPrototype.send = function() {
    let sendTime = Date.now()
    var xhr = this
    xhr.addEventListener("readystatechange", function() {
      const takenSec = (Date.now() - sendTime) / 1000
      const url = xhr.responseURL
      const method = urlMethod[url] || "GET"
      const status = xhr.status
      if (url.includes("event.ingrow.co")) { return }
      if (xhr.readyState == 4 && status >= 200 && status < 300) {
        publish({ 
          action: "200Ajax", 
          url, method,
          status, takenSec
        });
      } else if (xhr.readyState == 4 && status != 200) {
        publish({ 
          action: "failedAjax", 
          url, method,
          status, takenSec
        });
      }
    }, false);
    
    return sendProto.apply(this, [].slice.call(arguments));
  };
}