import {
  CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES,
  ID_NOTICE_FAN,
  ID_NOTICE_SUPPORTER,
  ID_NOTICE_VIP,
  ID_NOTICE_VIP_ENTER,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const noticeDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    noticeDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  if (!node.classList.contains('donation-state')) {
    return
  }

  const message = node.querySelector('p')
  const isEnterVip = message?.textContent?.includes('대화방에 참여했습니다.')
  if (isEnterVip && !noticeDisplayMap[ID_NOTICE_VIP_ENTER]) {
    node.remove()
    return
  }
  const isJoinVip = message?.textContent?.includes('열혈팬이 되셨습니다.')
  if (isJoinVip && !noticeDisplayMap[ID_NOTICE_VIP]) {
    node.remove()
    return
  }
  const isJoinFan = message?.textContent?.includes('팬클럽이')
  if (isJoinFan && !noticeDisplayMap[ID_NOTICE_FAN]) {
    node.remove()
    return
  }
  const isJoinSupporter = message?.textContent?.includes('서포터가')
  if (isJoinSupporter && !noticeDisplayMap[ID_NOTICE_SUPPORTER]) {
    node.remove()
    return
  }
}

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES.forEach((message) => {
    if (!changes[message]) {
      return
    }
    noticeDisplayMap[message] = changes[message].newValue
  })
})
