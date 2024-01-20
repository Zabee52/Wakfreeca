import { cloneElementColorStyle, elementToSpan } from './dom-utils'

export default (node: HTMLElement) => {
  node.style.paddingTop = '2px'
  node.style.paddingBottom = '2px'

  const nicknameArea = node.querySelector('dt')
  if (!nicknameArea) {
    return
  }
  nicknameArea.style.display = 'inline-flex'
  nicknameArea.style.alignItems = 'center'
  nicknameArea.style.gap = '2px'

  const nickname = nicknameArea?.querySelector('a')?.childNodes[0]
  if (!nickname) {
    return
  }
  // 닉네임에 bold 적용
  // em 태그로 생성하는 이유는 기존 afreecaTV의 스타일을 상속받기 위해
  const wrapEm = document.createElement('em')
  wrapEm.textContent = nickname.textContent
  wrapEm.style.fontWeight = 'bold'
  nickname.replaceWith(wrapEm)

  const chatSection = node.querySelector('dd')
  if (!chatSection) {
    return
  }
  const chatSectionSpan = chatToSpanIfFanChat(chatSection)
  chatSectionSpan.style.fontFamily = '"NG", "돋움", "dotum", "AppleGothic"'
  chatSectionSpan.style.fontSize = 'calc( var(--text-default) + var(--text-size) * 2 )'
  chatSectionSpan.style.marginLeft = '2px'
  for (const className of node.classList ?? []) {
    if (className !== 'bj') {
      continue
    }
    chatSectionSpan.style.fontWeight = 'bold'
    break
  }
  chatSection.replaceWith(chatSectionSpan)
}

function chatToSpanIfFanChat(element: HTMLElement) {
  const fanChatColorElement = element.querySelector('#fan_chatcolor') as HTMLElement | null
  if (!fanChatColorElement) {
    return elementToSpan(element)
  }
  const chatSpan = elementToSpan(fanChatColorElement)
  cloneElementColorStyle(fanChatColorElement, chatSpan)
  return chatSpan
}
