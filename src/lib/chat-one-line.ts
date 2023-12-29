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
  const wrapEm = document.createElement('em')
  wrapEm.textContent = nickname.textContent
  wrapEm.style.fontWeight = 'bold'
  nickname.replaceWith(wrapEm)

  const chatSection = node.querySelector('dd')
  if (!chatSection) {
    return
  }
  const chatSectionSpan = elementToSpan(chatSection)
  chatSectionSpan.style.fontFamily = '"NG", "돋움", "dotum", "AppleGothic"'
  chatSectionSpan.style.fontSize = 'calc( var(--text-default) + var(--text-size) * 2 )'
  for (const className of node.classList ?? []) {
    if (className !== 'bj') {
      continue
    }
    chatSectionSpan.style.fontWeight = 'bold'
    break
  }
  chatSection.replaceWith(chatSectionSpan)
}
