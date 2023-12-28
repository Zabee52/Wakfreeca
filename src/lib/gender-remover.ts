export default (node: HTMLElement) => {
  if (!node.hasAttribute('user_id')) {
    return
  }
  const genderIcon = node.querySelector('em')
  if (genderIcon) {
    genderIcon.remove()
  }
  // 채팅 섹션은 성별 아이콘을 표시하기 위해 왼쪽 패딩을 사용하는데, 이를 제거하기 위한 코드
  node.childNodes.forEach((child) => {
    if (!(child instanceof HTMLElement)) {
      return
    }
    child.style.paddingLeft = '0'
  })
}
