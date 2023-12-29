import { getBrightnessAdjustedHex } from './color-utils'

export default (node: HTMLElement) => {
  if (!node?.hasAttribute('user_id')) {
    return
  }
  const userIdHex = userIdToHex(node.getAttribute('user_id') || '000000')
  const nicknameColor = '#' + getBrightnessAdjustedHex(userIdHex)

  const nicknameSection = node.querySelector('dt')?.querySelector('a')
  if (!nicknameSection) {
    return
  }

  nicknameSection.style.color = nicknameColor
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

function numberToHex(number: number) {
  return number.toString(16).padStart(6, '0')
}

function userIdToHex(userId: string) {
  const userIdNumber = stringToNumber(userId)
  return numberToHex(userIdNumber)
}
