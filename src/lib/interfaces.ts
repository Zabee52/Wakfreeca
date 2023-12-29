export interface SettingItem {
  type: 'chat_layer' | 'checkbox'
  text: string
  noticeOn?: string
  noticeOff?: string
}

export interface ChatLayerItem {
  title: string
}

export interface Rgb {
  r: number
  g: number
  b: number
}
