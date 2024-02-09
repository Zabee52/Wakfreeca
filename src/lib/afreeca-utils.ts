const getUserType = (element: HTMLElement) => {
  return element.getAttribute('user-type')
}

// user-type attribute가 streamer일 경우 bj
export function isStreamer(element: HTMLElement) {
  return getUserType(element) === 'streamer'
}

export function isSubscriber(element: HTMLElement) {
  return getUserType(element) === 'subscribe'
}

export function isChat(node: HTMLElement) {
  return node.classList?.contains('message-container')
}

export function isDonation(node: HTMLElement) {
  return node.classList?.contains('donation-container')
}

export function isNotice(node: HTMLElement) {
  return node.classList?.contains('system-message')
}
