import { getStorageLocalBoolean, storageLocalBoolean } from './storage-utils'

export const onAreaHeaderClick = (event: Event, prevNode: HTMLElement) => {
  const target = event.target as HTMLElement
  const historyBack = target.classList.contains('history_back')
  if (!historyBack) {
    return
  }

  prevNode?.classList?.toggle('on')

  const chatLayer = target.closest('.chat_layer')
  chatLayer?.classList?.toggle('on')
}

export const onCloseButtonClick = (event: Event) => {
  const target = event.target as HTMLElement
  const close = target.classList.contains('close')
  if (!close) {
    return
  }

  const chatLayer = target.closest('.chat_layer')
  chatLayer?.classList?.toggle('on')
}

export const createChatLayer = (id: string, title: string, prevNode: HTMLElement) => {
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

export const createChatLayerItem = (id: string, title: string) => {
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

export const onChatLayerItem = (event: Event) => {
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

export const createCheckboxItem = (id: string, text: string, defaultChecked: boolean = false) => {
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
  checkboxItem.addEventListener('change', (event: Event) => onCheckboxItem(event))
  return checkboxItem
}

export const onCheckboxItem = (event: Event) => {
  const target = event.target as HTMLInputElement
  const { id, checked } = target
  storageLocalBoolean({ key: id, value: checked })
}
