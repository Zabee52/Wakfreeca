import {
  CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES,
  ID_NOTICE_HOTFAN_IN,
  ID_NOTICE_HOTFAN,
  ID_NOTICE_FAN,
  ID_NOTICE_SUPPORTER,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const noticeDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    noticeDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  if (!node?.classList?.contains('notice')) {
    return
  }

  const isHotFanIn = ['hotfan', 'in'].every((className) => node.classList.contains(className))
  if (isHotFanIn && !noticeDisplayMap[ID_NOTICE_HOTFAN_IN]) {
    node.remove()
    return
  }
  const isHotFan = !isHotFanIn && ['hotfan'].some((className) => node.classList.contains(className))
  if (isHotFan && !noticeDisplayMap[ID_NOTICE_HOTFAN]) {
    node.remove()
    return
  }
  const isFan = node.classList.contains('fanclub')
  if (isFan && !noticeDisplayMap[ID_NOTICE_FAN]) {
    node.remove()
    return
  }
  const isSupporter = node.classList.contains('support')
  if (isSupporter && !noticeDisplayMap[ID_NOTICE_SUPPORTER]) {
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
