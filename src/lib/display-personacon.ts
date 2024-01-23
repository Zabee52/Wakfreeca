import {
  CHAT_LAYER_SET_DISPLAY_PERSONACON_MESSAGES,
  ID_PERSONACON_BJ,
  ID_PERSONACON_FAN,
  ID_PERSONACON_FEVER_FAN,
  ID_PERSONACON_MANAGER,
  ID_PERSONACON_NORMAL,
  ID_PERSONACON_SUBSCRIPTION,
} from './consts'
import { getStorageLocalBoolean } from './storage-utils'

const personaconDisplayMap: Record<string, boolean> = {}
CHAT_LAYER_SET_DISPLAY_PERSONACON_MESSAGES.forEach((message) => {
  getStorageLocalBoolean(message, true).then((value) => {
    personaconDisplayMap[message] = value
  })
})

export default (node: HTMLElement) => {
  // iconType은 dt의 classList지만, 아프리카TV에서는 이 정보를 표시할 퍼스나콘 타입을 정의하는데 사용 하고 있음
  const iconType = node.querySelector('dt')?.classList
  const isBj = ['man', 'woman'].some((type) => iconType?.contains(type))
  const bjDisplayCond = isBj && personaconDisplayMap[ID_PERSONACON_BJ]

  const isManager = ['manager_m', 'manager_w'].some((type) => iconType?.contains(type))
  const managerDisplayCond = isManager && personaconDisplayMap[ID_PERSONACON_MANAGER]

  const isFeverFan = ['hot_m', 'hot_w'].some((type) => iconType?.contains(type))
  const feverFanDisplayCond = isFeverFan && personaconDisplayMap[ID_PERSONACON_FEVER_FAN]

  const isFan = ['fan_m', 'fan_w'].some((type) => iconType?.contains(type))
  const fanDisplayCond = isFan && personaconDisplayMap[ID_PERSONACON_FAN]

  const isNormal = ['user_m', 'user_w', 'gender'].some((type) => iconType?.contains(type))
  const normalDisplayCond = isNormal && personaconDisplayMap[ID_PERSONACON_NORMAL]

  const isSubscriber = ['gudok_m', 'gudok_w'].some((type) => iconType?.contains(type))
  const subscriberDisplayCond = isSubscriber && personaconDisplayMap[ID_PERSONACON_SUBSCRIPTION]

  const isNeedRemoved = [
    bjDisplayCond,
    managerDisplayCond,
    fanDisplayCond,
    normalDisplayCond,
    feverFanDisplayCond,
    subscriberDisplayCond,
  ].every((cond) => !cond)

  if (!isNeedRemoved) {
    return
  }
  const personacon = node.querySelector('em')
  if (!personacon) {
    return
  }
  personacon.remove()

  // 퍼스나콘은 성별 아이콘을 표시하기 위해, 챗 영역은 퍼스나콘 만큼 공간 확보를 위해 왼쪽 패딩을 사용하는데, 이를 제거하기 위한 코드
  node.childNodes.forEach((child) => {
    if (!(child instanceof HTMLElement)) {
      return
    }
    child.style.paddingLeft = '0'
  })
}

// Storage Change Listener
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  CHAT_LAYER_SET_DISPLAY_PERSONACON_MESSAGES.forEach((message) => {
    if (!changes[message]) {
      return
    }
    personaconDisplayMap[message] = changes[message].newValue
  })
})
