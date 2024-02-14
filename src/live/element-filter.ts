import { getChatAreaObserver } from '../lib/chat-area-observer'

function init() {
  const targetNode = document.getElementById('chat_area')
  if (!targetNode) {
    throw new Error('chat_area element not found')
  }
  const observer = getChatAreaObserver()

  // 옵저버 시작
  const observerConfig = { attributes: false, childList: true, subtree: true }
  observer.observe(targetNode, observerConfig)
}

init()
