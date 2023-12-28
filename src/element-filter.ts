import removeIfDonation from './donation-remover'
import removeIfGender from './gender-remover'
import displayChatOneLine from './chat-one-line'
import setChatColor from './chat-color-setter'
import { MESSAGE_CHAT_ONE_LINE, MESSAGE_HIDE_DONATION, MESSAGE_HIDE_GENDER_ICON } from './consts'
import { getStorageLocal } from './storage-util'

// TODO: 필터링 목록 선택할 수 있도록 조정
const targetNode = document.getElementById('chat_area')
if (!targetNode) {
  throw new Error('chat_area element not found')
}

const observerConfig = { attributes: false, childList: true, subtree: true }

let isDisplayChatOneLine = false
let isRemoveIfDonation = false
let isRemoveIfGender = false

Promise.all([
  getStorageLocal(MESSAGE_CHAT_ONE_LINE),
  getStorageLocal(MESSAGE_HIDE_DONATION),
  getStorageLocal(MESSAGE_HIDE_GENDER_ICON),
])
  .then(([chatOneLineChecked, donationChecked, genderIconChecked]) => {
    isDisplayChatOneLine = chatOneLineChecked
    isRemoveIfDonation = donationChecked
    isRemoveIfGender = genderIconChecked
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
        if (isRemoveIfDonation) {
          removeIfDonation(node)
        }
        if (isRemoveIfGender) {
          removeIfGender(node)
        }
        if (isDisplayChatOneLine) {
          displayChatOneLine(node)
          setChatColor(node)
        }
      })
    }
  }
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
  if (changes[MESSAGE_HIDE_DONATION]) {
    isRemoveIfDonation = changes[MESSAGE_HIDE_DONATION].newValue
  }
  if (changes[MESSAGE_HIDE_GENDER_ICON]) {
    isRemoveIfGender = changes[MESSAGE_HIDE_GENDER_ICON].newValue
  }
})
