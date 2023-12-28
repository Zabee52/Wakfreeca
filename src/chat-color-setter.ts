export default (node: HTMLElement) => {
  if (!node?.hasAttribute('user_id')) {
    return
  }
  const userIdNumber = stringToNumber(node.getAttribute('user_id'))
  const nicknameColor = '#' + (userIdNumber % 0xffffff).toString(16).padStart(6, '0')

  const nicknameSectioin = node.querySelector('dt')?.querySelector('a')
  if (!nicknameSectioin) {
    return
  }

  nicknameSectioin.style.color = nicknameColor
}

// stringToNumber - 입력받은 문자열을 char number로 변환
// ex) 'abcde' -> 979899100101
function stringToNumber(str: string | null) {
  if (!str) {
    return 0
  }

  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i)
  }
  return parseInt(result)
}
