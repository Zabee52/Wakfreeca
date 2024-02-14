import {
  ID_CHAT_LAYER_SET_DISPLAY_DONATION,
  ID_CHAT_LAYER_SET_DISPLAY_ICON,
  ID_CHAT_LAYER_SET_DISPLAY_NOTICE,
} from '../lib/consts'
import { SettingItem } from '../lib/interfaces'
import {
  chatLayerSubMarkItems,
  chatLayerSetIconItems,
  chatLayerSetDisplayDonationItems,
  chatLayerSetNoticeItems,
} from '../lib/setting-consts'
import { createCheckboxItem, createChatLayerItem, createChatLayer } from '../lib/setting-utils'

function init() {
  const chatLayerSettingNode = document.getElementsByClassName('chat_layer_setting')?.[0]
  if (!chatLayerSettingNode) {
    throw new Error('chat_layer_setting element not found')
  }

  const chatLayerSubMark = [...(chatLayerSettingNode.childNodes ?? [])].find(
    (child) =>
      child instanceof HTMLElement &&
      child.classList?.contains('chat_layer') &&
      child.classList?.contains('sub') &&
      child.classList?.contains('mark')
  )
  if (!(chatLayerSubMark instanceof HTMLElement)) {
    throw new Error('chat_layer sub mark element not found')
  }

  const chatLayerSubMarkUl = chatLayerSubMark.querySelector('ul')

  // TODO: 아래 코드와 책임 겹치는지 확인 후 필요 시 중복 제거
  Object.entries(chatLayerSubMarkItems).forEach(([id, { type, text }]) => {
    switch (type) {
      case 'checkbox':
        const checkboxItem = createCheckboxItem(id, text)
        chatLayerSubMarkUl?.appendChild(checkboxItem)
        break
      case 'chat_layer':
        const chatLayerItem = createChatLayerItem(id, text)
        chatLayerSubMarkUl?.appendChild(chatLayerItem)
        break
    }
  })

  Object.entries(chatLayerSubMarkItems)
    .filter(([_, { type }]) => type === 'chat_layer')
    .forEach(([id, { text }]) => {
      const chatLayer = createChatLayer(id, text, chatLayerSubMark)
      const chatLayerUl = chatLayer.querySelector('ul')
      if (!chatLayerUl) {
        return
      }

      let items: Record<string, SettingItem> | null = null
      switch (id) {
        case ID_CHAT_LAYER_SET_DISPLAY_ICON:
          items = chatLayerSetIconItems
          break
        case ID_CHAT_LAYER_SET_DISPLAY_DONATION:
          items = chatLayerSetDisplayDonationItems
          break
        case ID_CHAT_LAYER_SET_DISPLAY_NOTICE:
          items = chatLayerSetNoticeItems
          break
      }

      Object.entries(items ?? {}).forEach(([id, { type, text }]) => {
        switch (type) {
          case 'checkbox':
            const checkboxItem = createCheckboxItem(id, text, true)
            chatLayerUl?.appendChild(checkboxItem)
            break
          case 'chat_layer':
            const chatLayerItem = createChatLayerItem(id, text)
            chatLayerUl?.appendChild(chatLayerItem)
            break
        }
      })

      chatLayerSettingNode.appendChild(chatLayer)
    })
}

init()
