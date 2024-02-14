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

function vodSettingItemsInit() {
  const chatLayerSubMark = document.querySelector('.chat_layer.sub.mark')
  if (!(chatLayerSubMark instanceof HTMLElement)) {
    throw new Error('chat_layer sub mark element not found')
  }

  const chatBoxHeightNode = chatLayerSubMark.parentElement!

  const chatLayerSubMarkUl = chatLayerSubMark.querySelector('ul')

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

      chatBoxHeightNode.appendChild(chatLayer)
    })
  console.log(chatBoxHeightNode)
}

let retry = 120
const initializer = setInterval(() => {
  if (!--retry) {
    console.log('vod setting item list initialize failed')
    clearInterval(initializer)
  }
  if (document.querySelector('.chat_layer.sub.mark')) {
    console.log('found.', document.querySelector('.chat_layer.sub.mark'))
    clearInterval(initializer)
    vodSettingItemsInit()
  }
  console.log('vod setting item : retry. remains : ' + retry)
}, 2000)
