import {
  ID_CHAT_LAYER_SET_DISPLAY_DONATION,
  ID_CHAT_LAYER_SET_DISPLAY_ICON,
  ID_CHAT_ONE_LINE,
  ID_ICON_BJ,
  ID_ICON_FAN,
  ID_ICON_FEVER_FAN,
  ID_ICON_MANAGER,
  ID_ICON_QUICK_VIEW,
  ID_ICON_SUBSCRIPTION,
  ID_PERSONACON_BJ,
  ID_PERSONACON_NORMAL,
  ID_PERSONACON_MANAGER,
  ID_PERSONACON_SUBSCRIPTION,
  ID_SET_NICKNAME_COLOR,
  ID_CHAT_LAYER_SET_DISPLAY_PERSONACON,
  ID_PERSONACON_FAN,
  ID_PERSONACON_FEVER_FAN,
  ID_DONATION_AD_BALLOON,
  ID_DONATION_BALLOON,
  ID_DONATION_STICKER,
  ID_ICON_SUPPORTER,
  ID_CHAT_LAYER_SET_DISPLAY_NOTICE,
  ID_NOTICE_HOTFAN_IN,
  ID_NOTICE_HOTFAN,
  ID_NOTICE_FAN,
  ID_NOTICE_SUPPORTER,
} from './lib/consts'
import { SettingItem } from './lib/interfaces'
import { getStorageLocalBoolean, storageLocalBoolean } from './lib/storage-utils'

function onAreaHeaderClick(event: Event, prevNode: HTMLElement) {
  const target = event.target as HTMLElement
  const historyBack = target.classList.contains('history_back')
  if (!historyBack) {
    return
  }

  prevNode?.classList?.toggle('on')

  const chatLayer = target.closest('.chat_layer')
  chatLayer?.classList?.toggle('on')
}

function onCloseButtonClick(event: Event) {
  const target = event.target as HTMLElement
  const close = target.classList.contains('close')
  if (!close) {
    return
  }

  const chatLayer = target.closest('.chat_layer')
  chatLayer?.classList?.toggle('on')
}

function createChatLayer(id: string, title: string, prevNode: HTMLElement) {
  const areaHeader = document.createElement('div')
  areaHeader.classList.add('area_header')
  areaHeader.addEventListener('click', (event: Event) => onAreaHeaderClick(event, prevNode))

  const historyBack = document.createElement('a')
  historyBack.href = 'javascript:;'
  historyBack.classList.add('history_back')
  historyBack.innerText = '뒤로가기'
  areaHeader.appendChild(historyBack)

  const areaHeaderTitleSpan = document.createElement('span')
  areaHeaderTitleSpan.innerText = title
  const areaHeaderTitle = document.createElement('h2')
  areaHeaderTitle.appendChild(areaHeaderTitleSpan)
  areaHeader.appendChild(areaHeaderTitle)

  const contents = document.createElement('div')
  contents.classList.add('contents')

  const contentsUl = document.createElement('ul')
  contents.appendChild(contentsUl)

  const closeBtn = document.createElement('a')
  closeBtn.href = 'javascript:;'
  closeBtn.classList.add('close')
  closeBtn.innerText = '닫기'
  closeBtn.addEventListener('click', (event: Event) => onCloseButtonClick(event))

  const chatLayer = document.createElement('div')
  chatLayer.classList.add('chat_layer')
  chatLayer.classList.add('sub')
  chatLayer.classList.add(id)
  chatLayer.appendChild(areaHeader)
  chatLayer.appendChild(contents)
  chatLayer.appendChild(closeBtn)
  return chatLayer
}

function createChatLayerItem(id: string, title: string) {
  const chatLayerItem = document.createElement('li')
  const a = document.createElement('a')
  a.href = 'javascript:;'
  a.className = 'more_layer'
  a.dataset.title = id
  a.innerText = title

  chatLayerItem.appendChild(a)
  chatLayerItem.addEventListener('click', onChatLayerItem)
  return chatLayerItem
}

function onChatLayerItem(event: Event) {
  const target = event.target as HTMLAnchorElement
  const { title } = target.dataset
  if (!title) {
    return
  }

  const targetChatLayer = document.querySelector(`.${title}`)
  targetChatLayer?.classList?.toggle('on')

  const closestChatLayer = target.closest('.chat_layer')
  closestChatLayer?.classList?.toggle('on')
}

function createCheckboxItem(
  id: string,
  text: string,
  noticeOn?: string,
  noticeOff?: string,
  defaultChecked: boolean = false
) {
  const checkboxItem = document.createElement('li')
  const div = document.createElement('div')
  div.className = 'checkbox_wrap'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = id
  getStorageLocalBoolean(id, defaultChecked).then((checked) => {
    checkbox.checked = checked
  })

  const label = document.createElement('label')
  label.htmlFor = id
  label.innerText = text

  div.appendChild(checkbox)
  div.appendChild(label)

  checkboxItem.appendChild(div)
  checkboxItem.addEventListener('change', (event: Event) => onCheckboxItem(event, noticeOn, noticeOff))
  return checkboxItem
}

function onCheckboxItem(event: Event, onMsg?: string, offMsg?: string) {
  const target = event.target as HTMLInputElement
  const { id, checked } = target
  storageLocalBoolean({ key: id, value: checked })
  const msg = checked ? onMsg : offMsg
  if (!msg) {
    return
  }
  noticeSettingChanged(msg)
}

function noticeSettingChanged(msg: string) {
  const noticeP = document.createElement('p')
  noticeP.className = 'notice'
  noticeP.innerText = msg

  const chatArea = document.getElementById('chat_area')
  if (!chatArea) {
    return
  }
  // 채팅창이 얼어있을 경우 .box_ice element 아래에 채팅 및 알림이 추가되며, 그렇지 않을 경우 .chat_area element 아래에 추가됨
  const icedArea = chatArea.querySelector('.box_ice:last-child')
  !!icedArea ? icedArea.appendChild(noticeP) : chatArea.appendChild(noticeP)
}

function init() {
  const chatLayerSettingNode = document.getElementsByClassName('chat_layer_setting')?.[0]
  if (!chatLayerSettingNode) {
    throw new Error('chat_layer_setting element not found')
  }

  const chatLayerSetPersonaconItems: Record<string, SettingItem> = {
    [ID_PERSONACON_BJ]: {
      type: 'checkbox',
      text: 'BJ 퍼스나콘',
    },
    [ID_PERSONACON_MANAGER]: {
      type: 'checkbox',
      text: '매니저 퍼스나콘',
    },
    [ID_PERSONACON_SUBSCRIPTION]: {
      type: 'checkbox',
      text: '구독자 퍼스나콘',
    },
    [ID_PERSONACON_FEVER_FAN]: {
      type: 'checkbox',
      text: '열혈팬 퍼스나콘',
    },
    [ID_PERSONACON_FAN]: {
      type: 'checkbox',
      text: '팬클럽 퍼스나콘',
    },
    [ID_PERSONACON_NORMAL]: {
      type: 'checkbox',
      text: '일반 사용자 퍼스나콘',
    },
  }

  const chatLayerSetIconItems: Record<string, SettingItem> = {
    [ID_ICON_BJ]: {
      type: 'checkbox',
      text: 'BJ 아이콘',
    },
    [ID_ICON_MANAGER]: {
      type: 'checkbox',
      text: '매니저 아이콘',
    },
    [ID_ICON_SUBSCRIPTION]: {
      type: 'checkbox',
      text: '구독자 아이콘',
    },
    [ID_ICON_FEVER_FAN]: {
      type: 'checkbox',
      text: '열혈팬 아이콘',
    },
    [ID_ICON_FAN]: {
      type: 'checkbox',
      text: '팬클럽 아이콘',
    },
    [ID_ICON_SUPPORTER]: {
      type: 'checkbox',
      text: '서포터 아이콘',
    },
    [ID_ICON_QUICK_VIEW]: {
      type: 'checkbox',
      text: '퀵뷰 아이콘',
    },
  }

  const chatLayerSetDisplayDonationItems: Record<string, SettingItem> = {
    [ID_DONATION_BALLOON]: {
      type: 'checkbox',
      text: '별풍선 / 구독',
    },
    [ID_DONATION_AD_BALLOON]: {
      type: 'checkbox',
      text: '애드벌룬',
    },
    [ID_DONATION_STICKER]: {
      type: 'checkbox',
      text: '스티커',
    },
  }

  const chatLayerSetNoticeItems: Record<string, SettingItem> = {
    [ID_NOTICE_HOTFAN_IN]: {
      type: 'checkbox',
      text: '열혈팬 입장 알림',
    },
    [ID_NOTICE_HOTFAN]: {
      type: 'checkbox',
      text: '열혈팬 탄생 알림',
    },
    [ID_NOTICE_FAN]: {
      type: 'checkbox',
      text: '팬클럽 가입 알림',
    },
    [ID_NOTICE_SUPPORTER]: {
      type: 'checkbox',
      text: '서포터 가입 알림',
    },
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

  const chatLayerSubMarkItems: Record<string, SettingItem> = {
    [ID_CHAT_ONE_LINE]: {
      type: 'checkbox',
      text: '채팅 한 줄로 보기',
      noticeOn: '지금부터 채팅이 한 줄로 표시됩니다.',
      noticeOff: '지금부터 채팅이 여러 줄로 표시됩니다.',
    },
    [ID_SET_NICKNAME_COLOR]: {
      type: 'checkbox',
      text: '닉네임에 랜덤 색상 적용',
      noticeOn: '지금부터 닉네임에 색상이 적용됩니다.',
      noticeOff: '지금부터 닉네임에 색상이 적용되지 않습니다.',
    },
    [ID_CHAT_LAYER_SET_DISPLAY_PERSONACON]: {
      type: 'chat_layer',
      text: '퍼스나콘 표시 설정',
    },
    [ID_CHAT_LAYER_SET_DISPLAY_ICON]: {
      type: 'chat_layer',
      text: '아이콘 표시 설정',
    },
    [ID_CHAT_LAYER_SET_DISPLAY_DONATION]: {
      type: 'chat_layer',
      text: '후원 메세지 표시 설정',
    },
    [ID_CHAT_LAYER_SET_DISPLAY_NOTICE]: {
      type: 'chat_layer',
      text: '채팅 안내 설정',
    },
  }

  const chatLayerSubMarkUl = chatLayerSubMark.querySelector('ul')

  // TODO: 아래 코드와 책임 겹치는지 확인 후 필요 시 중복 제거
  Object.entries(chatLayerSubMarkItems).forEach(([id, { type, text, noticeOn, noticeOff }]) => {
    switch (type) {
      case 'checkbox':
        const checkboxItem = createCheckboxItem(id, text, noticeOn, noticeOff)
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
        case ID_CHAT_LAYER_SET_DISPLAY_PERSONACON:
          items = chatLayerSetPersonaconItems
          break
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

      Object.entries(items ?? {}).forEach(([id, { type, text, noticeOn, noticeOff }]) => {
        switch (type) {
          case 'checkbox':
            const checkboxItem = createCheckboxItem(id, text, noticeOn, noticeOff, true)
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

const now = new Date()
const dDay = new Date('2024-02-05 00:00:00')
if (now.getTime() < dDay.getTime()) {
  init()
}
