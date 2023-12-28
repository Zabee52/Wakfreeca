export function elementToSpan(element: HTMLElement) {
  const span = document.createElement('span')
  while (element.firstChild) {
    span.appendChild(element.firstChild)
  }
  element.classList?.forEach((className) => {
    span.classList.add(className)
  })
  return span
}
