import displayDonation from './lib/display-donation'
import displayChatOneLine from './lib/chat-one-line'
import displayPersonacon from './lib/display-personacon'
import displayIcon from './lib/display-icon'
import displayNotice from './lib/display-notice'
import setChatColor from './lib/chat-color-setter'
// import sendToFilterChatPopupIfNeeded from './lib/send-to-filter-chat-popup'
import { MESSAGE_CHAT_ONE_LINE, MESSAGE_SET_NICKNAME_COLOR } from './lib/consts'
import { getStorageLocalBoolean } from './lib/storage-utils'

// TODO: 필터링 목록 선택할 수 있도록 조정
const targetNode = document.getElementById('chat_area')
if (!targetNode) {
  throw new Error('chat_area element not found')
}

const observerConfig = { attributes: false, childList: true, subtree: true }

let isDisplayChatOneLine = false
let isSetNicknameColor = false

Promise.all([getStorageLocalBoolean(MESSAGE_CHAT_ONE_LINE), getStorageLocalBoolean(MESSAGE_SET_NICKNAME_COLOR)])
  .then(([chatOneLineChecked, setNicknameColorChecked]) => {
    isDisplayChatOneLine = chatOneLineChecked
    isSetNicknameColor = setNicknameColorChecked
  })
  .catch((error) => {
    console.error('😞 스토리지에서 설정을 불러오는 데 실패했습니다:', error)
  })

const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node: Node) => {
        if (!(node instanceof HTMLElement)) {
          return
        }

        if (isChat(node)) {
          displayPersonacon(node)
          displayIcon(node)
          isDisplayChatOneLine && displayChatOneLine(node)
          isSetNicknameColor && setChatColor(node)
          // sendToFilterChatPopupIfNeeded(node)
        }

        if (isDonation(node)) {
          displayDonation(node)
        }

        if (isNotice(node)) {
          displayNotice(node)
        }
      })
    }
  }
}

function isChat(node: HTMLElement) {
  return node.hasAttribute?.('user_id') && !isDonation(node) && !isNotice(node)
}

function isDonation(node: HTMLElement) {
  return (
    node.classList?.contains('balloon_area') ||
    node.classList?.contains('adballoon_area') ||
    node.classList?.contains('sticker_area')
  )
}

function isNotice(node: HTMLElement) {
  return node.classList?.contains('notice')
}

// 옵저버 인스턴스 생성
const observer = new MutationObserver(callback)

// 옵저버 시작
observer.observe(targetNode, observerConfig)

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  if (changes[MESSAGE_CHAT_ONE_LINE]) {
    isDisplayChatOneLine = changes[MESSAGE_CHAT_ONE_LINE].newValue
  }
  if (changes[MESSAGE_SET_NICKNAME_COLOR]) {
    isSetNicknameColor = changes[MESSAGE_SET_NICKNAME_COLOR].newValue
  }
})
