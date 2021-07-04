import { getDomPath } from "./get-dom-path"

export function getElementMainProps(element) {
  const path = getDomPath(element)
  const { nodeName, id, className } = element
  
  return { 
    path,
    node_name: nodeName,
    id,
    class_name: className
  }
}
