import { ID_CHAT_ONE_LINE, ID_HIDE_DONATION, ID_HIDE_GENDER_ICON, ID_SET_NICKNAME_COLOR } from './lib/consts'
import { SettingItem } from './lib/interfaces'
import { getStorageLocal, storageLocalBoolean } from './lib/storage-utils'

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

if (!chatLayerSubMark || !(chatLayerSubMark instanceof HTMLElement)) {
  throw new Error('chat_layer sub mark element not found')
}

const items: Record<string, SettingItem>= {
  [ID_CHAT_ONE_LINE]: {
    text: '채팅 한 줄로 보기',
    noticeOn: '지금부터 채팅이 한 줄로 표시됩니다.',
    noticeOff: '지금부터 채팅이 여러 줄로 표시됩니다.',
  },
  [ID_SET_NICKNAME_COLOR]: {
    text: '닉네임에 랜덤 색상 적용',
    noticeOn: '지금부터 닉네임에 색상이 적용됩니다.',
    noticeOff: '지금부터 닉네임에 색상이 적용되지 않습니다.',
  },
  [ID_HIDE_GENDER_ICON]: {
    text: '성별 표시 가리기',
    noticeOn: '지금부터 성별 아이콘이 표시되지 않습니다.',
    noticeOff: '지금부터 성별 아이콘이 표시됩니다.',
  },
  [ID_HIDE_DONATION]: {
    text: '후원 메세지 숨기기',
    noticeOn: '지금부터 후원 메세지가 표시되지 않습니다.',
    noticeOff: '지금부터 후원 메세지가 표시됩니다.',
  },
}

const chatLayerSubMarkUl = chatLayerSubMark.querySelector('ul')
Object.entries(items).forEach(([id, {text, noticeOn, noticeOff}]) => {
  const checkboxItem = document.createElement('li')
  const div = document.createElement('div')
  div.className = 'checkbox_wrap'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = id
  getStorageLocal(id).then((checked) => {
    checkbox.checked = checked
  })

  const label = document.createElement('label')
  label.htmlFor = id
  label.innerText = text

  div.appendChild(checkbox)
  div.appendChild(label)

  checkboxItem.appendChild(div)
  checkboxItem.addEventListener('change', (event: Event) => onSettingChange(event, noticeOn, noticeOff))
  chatLayerSubMarkUl?.appendChild(checkboxItem)
})

function onSettingChange(event: Event, onMsg: string, offMsg: string) {
  const target = event.target as HTMLInputElement
  const { id, checked } = target
  storageLocalBoolean({ key: id, value: checked })
  noticeSettingChanged(checked ? onMsg : offMsg)
}

function noticeSettingChanged(msg: string) {
  const noticeP = document.createElement('p')
  noticeP.className = 'notice'
  noticeP.innerText = msg
  
  const chatArea = document.getElementById('chat_area')
  if (!chatArea) {
    return
  }
  chatArea.appendChild(noticeP)
}