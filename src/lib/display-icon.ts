import {
  CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES,
  GRADE_BADGE_FAN,
  GRADE_BADGE_MANAGER,
  GRADE_BADGE_STREAMER,
  GRADE_BADGE_SUPPORTER,
  GRADE_BADGE_VIP,
  ID_DISPLAY_ICON_FAN,
  ID_DISPLAY_ICON_MANAGER,
  ID_DISPLAY_ICON_STREAMER,
  ID_DISPLAY_ICON_SUBSCRIPTION,
  ID_DISPLAY_ICON_SUPPORTER,
  ID_DISPLAY_ICON_VIP,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const iconDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    iconDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  // First element in node's username child's button nodes
  const iconNode = node.querySelector('.username')?.querySelector('button')
  if (!iconNode) {
    return
  }

  // 멤버십 가입을 하지 않은 사용자 (하위 element를 닉네임 관련 하나만 가지고 있음)
  if (iconNode.children.length === 1) {
    return
  }

  // 구독자 퍼스나콘은 별도 처리
  if (!iconDisplayMap[ID_DISPLAY_ICON_SUBSCRIPTION]) {
    const subscriptionIcon = iconNode.querySelector('.thumb')
    if (subscriptionIcon) {
      subscriptionIcon.remove()
    }
  }

  /*
   * 휴리스틱한 결정
   * getElementByClassName의 호출 횟수를 줄이기 위해 채팅을 많이 사용하는 유저의 수로 판단 순서 결정
   * 팬, 열혈팬, 매니저, 스트리머, 서포터
   */
  const fanIcon = node.querySelector(`.${GRADE_BADGE_FAN}`)
  if (fanIcon && !iconDisplayMap[ID_DISPLAY_ICON_FAN]) {
    fanIcon.remove()
    return
  }

  const vipIcon = node.querySelector(`.${GRADE_BADGE_VIP}`)
  if (vipIcon && !iconDisplayMap[ID_DISPLAY_ICON_VIP]) {
    vipIcon.remove()
    return
  }

  const managerIcon = node.querySelector(`.${GRADE_BADGE_MANAGER}`)
  if (managerIcon && !iconDisplayMap[ID_DISPLAY_ICON_MANAGER]) {
    managerIcon.remove()
    return
  }

  const streamerIcon = node.getElementsByClassName(GRADE_BADGE_STREAMER)?.[0]
  if (streamerIcon && !iconDisplayMap[ID_DISPLAY_ICON_STREAMER]) {
    streamerIcon.remove()
    return
  }

  const supporterIcon = node.getElementsByClassName(GRADE_BADGE_SUPPORTER)?.[0]
  if (supporterIcon && !iconDisplayMap[ID_DISPLAY_ICON_SUPPORTER]) {
    supporterIcon.remove()
    return
  }
}

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES.forEach((message) => {
    if (!changes[message]) {
      return
    }
    iconDisplayMap[message] = changes[message].newValue
  })
})
