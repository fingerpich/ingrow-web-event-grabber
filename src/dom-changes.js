import subscribeDomChanges from "./utils/get-dom-change"
const CheckDomChangesInterval = 200

export function captureDomChanges(publish) {
  subscribeDomChanges((changes) => {
    const addedNodes = [];
    const removedNodes = [];

    changes.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
    changes.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

    publish({ addedNodes, removedNodes })
  }, CheckDomChangesInterval)
}
