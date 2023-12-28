import removeIfDonation from './donation-remover'
import removeIfGender from './gender-remover'
import displayChatOneLine from './chat-one-line'
import setChatColor from './chat-color-setter'

// TODO: 필터링 목록 선택할 수 있도록 조정
const targetNode = document.getElementById('chat_area')
if (!targetNode) {
  throw new Error('chat_area element not found')
}

const observerConfig = { attributes: false, childList: true, subtree: true }

const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node: Node) => {
        if (!(node instanceof HTMLElement)) {
          return
        }
        removeIfDonation(node)
        removeIfGender(node)
        displayChatOneLine(node)
        setChatColor(node)
      })
    }
  }
}

// 옵저버 인스턴스 생성
const observer = new MutationObserver(callback)

// 옵저버 시작
observer.observe(targetNode, observerConfig)
