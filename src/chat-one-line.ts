export default (node: HTMLElement) => {
  if (!node.hasAttribute('user_id')) {
    return
  }
  node.style.display = 'flex'
  node.style.alignItems = 'center'
  node.style.paddingTop = '2px'
  node.style.paddingBottom = '2px'

  const nicknameSection = node.querySelector('dt')?.querySelector('a')
  if (!nicknameSection) {
    return
  }
  const nickname = nicknameSection.childNodes[0]
  if (!nickname) {
    return
  }

  // 닉네임에 bold 적용
  const wrapSpan = document.createElement('span')
  wrapSpan.textContent = nickname.textContent
  wrapSpan.style.fontWeight = 'bold'

  nicknameSection.insertBefore(wrapSpan, nickname)
  nickname.textContent = ''
}
