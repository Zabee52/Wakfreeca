import {
  CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES,
  ID_ICON_BJ,
  ID_ICON_MANAGER,
  ID_ICON_SUBSCRIPTION,
  ID_ICON_FEVER_FAN,
  ID_ICON_FAN,
  ID_ICON_QUICK_VIEW,
  ID_ICON_SUPPORTER,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const iconDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    iconDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  // iconType은 dt의 classList지만, 아프리카TV에서는 이 정보를 표시할 퍼스나콘 타입을 정의하는데 사용 하고 있음
  const icons = Array.from(node.querySelectorAll('img'))
  const bjImage = icons.find((icon) => icon.title === 'BJ')
  if (bjImage && !iconDisplayMap[ID_ICON_BJ]) {
    bjImage.remove()
  }

  const managerImage = icons.find((icon) => icon.title === '매니저')
  if (managerImage && !iconDisplayMap[ID_ICON_MANAGER]) {
    managerImage.remove()
  }

  const feverFanImage = icons.find((icon) => icon.title === '열혈팬')
  if (feverFanImage && !iconDisplayMap[ID_ICON_FEVER_FAN]) {
    feverFanImage.remove()
  }

  const fanImage = icons.find((icon) => icon.title === '팬클럽')
  if (fanImage && !iconDisplayMap[ID_ICON_FAN]) {
    fanImage.remove()
  }

  const quickViewImage = icons.find((icon) => icon.title === '퀵뷰 사용자')
  if (quickViewImage && !iconDisplayMap[ID_ICON_QUICK_VIEW]) {
    quickViewImage.remove()
  }

  const subscriberImage = icons.find((icon) => icon.title === '구독팬')
  if (subscriberImage && !iconDisplayMap[ID_ICON_SUBSCRIPTION]) {
    subscriberImage.remove()
  }

  const supporterImage = icons.find((icon) => icon.title === '서포터')
  if (supporterImage && !iconDisplayMap[ID_ICON_SUPPORTER]) {
    supporterImage.remove()
  }
}

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES.forEach((message) => {
    if (!changes[message]) {
      return
    }
    iconDisplayMap[message] = changes[message].newValue
  })
})
