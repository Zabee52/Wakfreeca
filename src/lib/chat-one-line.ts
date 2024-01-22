export default (node: HTMLElement) => {
  node.style.paddingTop = '2px'
  node.style.paddingBottom = '2px'

  const nicknameArea = node.querySelector('dt')
  if (!nicknameArea) {
    return
  }
  nicknameArea.style.display = 'inline'

  // 아이콘 마진 조정
  const icons = Array.from(nicknameArea.querySelectorAll('img'))
  for (const icon of icons) {
    icon.style.margin = '0 4px 0 0'
  }

  // 닉네임 굵게
  const nickname = nicknameArea.querySelector('a')
  if (!nickname) {
    return
  }
  nickname.style.fontWeight = 'bold'

  // 채팅 한 줄로 표시
  const chatSection = node.querySelector('dd')
  if (!chatSection) {
    return
  }
  chatSection.style.display = 'inline'
  chatSection.style.marginLeft = '4px'
  chatSection.style.lineHeight = '1.5'
}
