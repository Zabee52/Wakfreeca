import {
  CHAT_LAYER_SET_DISPLAY_DONATION_MESSAGES,
  ID_DONATION_BALLOON,
  ID_DONATION_AD_BALLOON,
  ID_DONATION_STICKER,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const donationDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_DONATION_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    donationDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  if (!node?.classList?.length) {
    return
  }

  const isBalloon = node.classList.contains('balloon_area')
  if (isBalloon && !donationDisplayMap[ID_DONATION_BALLOON]) {
    node.remove()
    return
  }
  const isAdballon = node.classList.contains('adballoon_area')
  if (isAdballon && !donationDisplayMap[ID_DONATION_AD_BALLOON]) {
    node.remove()
    return
  }
  const isSticker = node.classList.contains('sticker_area')
  if (isSticker && !donationDisplayMap[ID_DONATION_STICKER]) {
    node.remove()
    return
  }
}

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  CHAT_LAYER_SET_DISPLAY_DONATION_MESSAGES.forEach((message) => {
    if (!changes[message]) {
      return
    }
    donationDisplayMap[message] = changes[message].newValue
  })
})
