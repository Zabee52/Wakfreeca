export interface SettingItem {
  type: 'chat_layer' | 'checkbox'
  text: string
}

export interface ChatLayerItem {
  title: string
}

export interface Rgb {
  r: number
  g: number
  b: number
}

export interface UserInformation {
  grade: string
  nickname: string
  userId: string
}

export interface AfreecaTvUserListItem {
  type: string
  female: boolean
  liStyle: string
  id: string
  grade: string
  nickname: string
  familyNickname: string
  flag1: number
  flag2: number
  genderForUserList: string
}

export interface Feature {
  [key: string]: boolean
}

export interface ChatFilterItem {
  exactMatch: string[]
  includeMatch: string[]
  startsWithMatch: string[]
}
