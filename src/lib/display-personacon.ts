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

interface RoleGenderType {
  male: string
  female: string
  genderHidden: string
}

const roleGenderConsts: Record<string, RoleGenderType> = {
  bj: {
    male: 'man',
    female: 'woman',
    genderHidden: 'bj',
  },
  manager: {
    male: 'manager_m',
    female: 'manager_w',
    genderHidden: 'manager',
  },
  hotFan: {
    male: 'hot_m',
    female: 'hot_w',
    genderHidden: 'hot',
  },
  fan: {
    male: 'fan_m',
    female: 'fan_w',
    genderHidden: 'fan',
  },
  normal: {
    male: 'user_m',
    female: 'user_w',
    genderHidden: 'user',
  },
  subscriber: {
    male: 'gudok_m',
    female: 'gudok_w',
    genderHidden: 'gudok',
  },
}

const isRoleMatched = (iconType: DOMTokenList | undefined, role: RoleGenderType) => {
  const { male, female, genderHidden } = role
  const commonCond = [male, female].some((type) => iconType?.contains(type))
  const genderHiddenCond = [genderHidden, 'gender'].every((type) => iconType?.contains(type))
  return commonCond || genderHiddenCond
}

export default (node: HTMLElement) => {
  // iconType은 dt의 classList지만, 아프리카TV에서는 이 정보를 표시할 퍼스나콘 타입을 정의하는데 사용 하고 있음
  const iconType = node.querySelector('dt')?.classList

  const { bj, manager, hotFan, fan, normal, subscriber } = roleGenderConsts
  // bj면서 gender 여야 함, man 또는 woman 이어야 함
  const isBj = isRoleMatched(iconType, bj)
  const bjDisplayCond = isBj && personaconDisplayMap[ID_PERSONACON_BJ]

  const isManager = isRoleMatched(iconType, manager)
  const managerDisplayCond = isManager && personaconDisplayMap[ID_PERSONACON_MANAGER]

  const isHotFan = isRoleMatched(iconType, hotFan)
  const hotFanDisplayCond = isHotFan && personaconDisplayMap[ID_PERSONACON_FEVER_FAN]

  const isFan = isRoleMatched(iconType, fan)
  const fanDisplayCond = isFan && personaconDisplayMap[ID_PERSONACON_FAN]

  const isNormal = isRoleMatched(iconType, normal)
  const normalDisplayCond = isNormal && personaconDisplayMap[ID_PERSONACON_NORMAL]

  const isSubscriber = isRoleMatched(iconType, subscriber)
  const subscriberDisplayCond = isSubscriber && personaconDisplayMap[ID_PERSONACON_SUBSCRIPTION]

  const isNeedRemove = [
    bjDisplayCond,
    managerDisplayCond,
    fanDisplayCond,
    normalDisplayCond,
    hotFanDisplayCond,
    subscriberDisplayCond,
  ].every((cond) => !cond)

  if (!isNeedRemove) {
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
