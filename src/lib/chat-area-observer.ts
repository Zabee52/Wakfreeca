import { isChat, isDonation, isNotice } from './afreeca-utils'
import { isCleaningTarget } from './clean-chatter'

import displayDonation from './display-donation'
import displayIcon from './display-icon'
import displayNotice from './display-notice'

export const getChatAreaObserver = () => {
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
          if (isCleaningTarget(mutateTargetNode)) {
            node.remove()
            return
          }
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
  return new MutationObserver(callback)
}
