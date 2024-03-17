import FeatureLab from './feature-lab'
import { ID_CHAT_FILTER_PREFIX } from './consts'
import { ChatFilterItem } from './interfaces'
import { getStorageLocal, removeStorageLocal, setStorageLocal } from './storage-utils'
import { delay } from './common-utils'

export default class ChatFilter {
  static loaded = false
  static key = ID_CHAT_FILTER_PREFIX

  static chatFilterItem: ChatFilterItem = {
    exactMatch: [],
    includeMatch: [],
    startsWithMatch: [],
  }

  static async init() {
    ChatFilter.loaded = await this.reload()
  }

  static async addItem(type: keyof ChatFilterItem, text: string) {
    if (this.chatFilterItem[type].includes(text)) {
      return false
    }
    this.chatFilterItem[type].push(text)
    await setStorageLocal(this.key, this.chatFilterItem)
    return true
  }
  static async removeItem(type: keyof ChatFilterItem, text: string) {
    if (!this.chatFilterItem[type].includes(text)) {
      return false
    }
    this.chatFilterItem[type] = this.chatFilterItem[type].filter((word) => word !== text)
    await setStorageLocal(this.key, this.chatFilterItem)
    return true
  }
  static getList(type: keyof ChatFilterItem): string[] {
    return this.chatFilterItem[type]
  }

  static validate(type: keyof ChatFilterItem, content: string): boolean {
    const { exactMatch, includeMatch, startsWithMatch } = this.chatFilterItem
    switch (type) {
      case 'exactMatch':
        return exactMatch.includes(content)
      case 'includeMatch':
        return includeMatch.some((word) => content.includes(word))
      case 'startsWithMatch':
        return startsWithMatch.some((word) => content.startsWith(word))
      default:
        return false
    }
  }

  static async reload() {
    try {
      this.chatFilterItem = await getStorageLocal(this.key, {
        exactMatch: [],
        includeMatch: [],
        startsWithMatch: [],
      })
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

ChatFilter.init()
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local' || !changes[ChatFilter.key]) {
    return
  }
  ChatFilter.reload()
})
