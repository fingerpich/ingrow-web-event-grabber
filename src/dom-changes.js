import subscribeDomChanges from "./utils/get-dom-change"
const CheckDomChangesInterval = 200

export function captureDomChanges(sendEvent) {
  subscribeDomChanges((changes) => {
    changes.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
    
    changes.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

    sendEvent(changes)
  }, CheckDomChangesInterval)
}
