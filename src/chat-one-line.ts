import { elementToSpan } from './dom-utils'

export default (node: HTMLElement) => {
  if (!node.hasAttribute('user_id')) {
    return
  }
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
  const wrapSpan = document.createElement('span')
  wrapSpan.textContent = nickname.textContent
  wrapSpan.style.fontWeight = 'bold'
  nickname.replaceWith(wrapSpan)

  const chatSection = node.querySelector('dd')
  if (!chatSection) {
    return
  }
  const chatSectionSpan = elementToSpan(chatSection)
  chatSection.replaceWith(chatSectionSpan)
}
