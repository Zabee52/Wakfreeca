export default (node: HTMLElement) => {
  if (!node?.classList) {
    return
  }
  const removeTargetClassNames = ['balloon_area', 'adballoon_area', 'fanclub']
  if (removeTargetClassNames.some((className) => node.classList.contains(className))) {
    node.remove()
  }
}
