import { isChat, isDonation, isNotice } from './lib/afreeca-utils'
import displayDonation from './lib/display-donation'
import displayIcon from './lib/display-icon'
import displayNotice from './lib/display-notice'

function init() {
  let targetNode = document.getElementById('chat_area')
  if (!targetNode) {
    throw new Error('chat_area element not found')
  }

  const observerConfig = { attributes: false, childList: true, subtree: true }

  const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'childList') {
        continue
      }

      mutation.addedNodes.forEach((node: Node) => {
        if (!(node instanceof HTMLElement)) {
          return
        }

        const mutateTargetNode = node.querySelector('div')
        if (!mutateTargetNode) {
          return
        }

        if (isChat(mutateTargetNode)) {
          displayIcon(mutateTargetNode)
          return
        }

        if (isDonation(mutateTargetNode)) {
          displayDonation(mutateTargetNode, node)
          return
        }

        if (isNotice(mutateTargetNode)) {
          displayNotice(mutateTargetNode, node)
          return
        }
      })
    }
  }

  // 옵저버 인스턴스 생성
  const observer = new MutationObserver(callback)

  // 옵저버 시작
  observer.observe(targetNode, observerConfig)
}

init()
