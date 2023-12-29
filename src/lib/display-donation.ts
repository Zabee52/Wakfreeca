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

  let needRemove = false

  const isBalloon = ['balloon_area', 'fanclub'].some((className) => node.classList.contains(className))
  if (isBalloon && !donationDisplayMap[ID_DONATION_BALLOON]) {
    needRemove = true
  }
  const isAdballon = ['adballoon_area', 'fanclub'].some((className) => node.classList.contains(className))
  if (isAdballon && !donationDisplayMap[ID_DONATION_AD_BALLOON]) {
    needRemove = true
  }
  const isSticker = ['sticker_area', 'support'].some((className) => node.classList.contains(className))
  if (isSticker && !donationDisplayMap[ID_DONATION_STICKER]) {
    needRemove = true
  }

  if (needRemove) {
    node.remove()
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
