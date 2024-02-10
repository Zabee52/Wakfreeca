export const cleanChildNodes = (node: HTMLElement) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
