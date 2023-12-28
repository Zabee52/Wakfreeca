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

const items = {
  chat_one_line: '채팅 한 줄로 보기',
  hide_gender_icon: '성별 표시 가리기',
  hide_donation: '별풍선 숨기기',
}

const chatLayerSubMarkUl = chatLayerSubMark.querySelector('ul')
Object.entries(items).forEach(([id, text]) => {
  const checkboxItem = document.createElement('li')
  const div = document.createElement('div')
  div.className = 'checkbox_wrap'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = id

  const label = document.createElement('label')
  label.htmlFor = id
  label.innerText = text

  div.appendChild(checkbox)
  div.appendChild(label)

  checkboxItem.appendChild(div)
  chatLayerSubMarkUl?.appendChild(checkboxItem)
})
