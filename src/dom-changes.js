import subscribeDomChanges from "./utils/get-dom-change"
import { getElementMainProps } from "./utils/get-dom-props"
const CheckDomChangesInterval = 200

export function captureDomChanges(publish) {
  subscribeDomChanges((changes) => {
    const addedNodes = [];
    const removedNodes = [];

    changes.forEach(record => {
      [...record.addedNodes].forEach(addedItem => {
        addedNodes.push(getElementMainProps(addedItem))
      });
      [...record.removedNodes].forEach(addedItem => {
        removedNodes.push(getElementMainProps(addedItem))
      })
    })
    publish({ 
      added_nodes: addedNodes, 
      removed_nodes: removedNodes, 
      action: "dom-changed"
    })
  }, CheckDomChangesInterval)
}
