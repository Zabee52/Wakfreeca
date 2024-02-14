import { getChatAreaObserver } from '../lib/chat-area-observer'

function vodChatAreaObserverinit() {
  const targetNode = document.getElementById('chatMemo')
  if (!targetNode) {
    throw new Error('chatMemo element not found')
  }
  const observer = getChatAreaObserver()

  // 옵저버 시작
  const observerConfig = { attributes: false, childList: true, subtree: true }
  observer.observe(targetNode, observerConfig)
}

let retry = 120
const initializer = setInterval(() => {
  if (!--retry) {
    console.log('chat item filter initialize failed')
    clearInterval(initializer)
  }
  if (document.getElementById('chatMemo')) {
    console.log('found.', document.getElementById('chatMemo'))
    vodChatAreaObserverinit()
    clearInterval(initializer)
  }
  console.log('chat item filter : retry. remains : ' + retry)
}, 2000)
