export function elementToSpan(element: HTMLElement) {
  const span = document.createElement('span')
  while (element.firstChild) {
    span.appendChild(element.firstChild)
  }
  cloneElementClass(element, span)

  return span
}

function cloneElementClass(element: HTMLElement, target: HTMLElement) {
  element.classList?.forEach((className) => {
    target.classList.add(className)
  })
}

export function cloneElementColorStyle(element: HTMLElement, target: HTMLElement) {
  const styles = window.getComputedStyle(element)
  const colorStyle = styles.getPropertyValue('color')
  if (colorStyle) {
    target.style.color = colorStyle
  }
}
