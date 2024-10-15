import {
  ID_DISPLAY_ICON_STREAMER,
  ID_DISPLAY_ICON_MANAGER,
  ID_DISPLAY_ICON_VIP,
  ID_DISPLAY_ICON_SUBSCRIPTION,
  ID_DISPLAY_ICON_FAN,
  ID_DISPLAY_ICON_SUPPORTER,
  ID_DONATION_SUBSCRIPTION,
  ID_DONATION_BALLOON,
  ID_DONATION_AD_BALLOON,
  ID_DONATION_STICKER,
  ID_NOTICE_VIP,
  ID_NOTICE_FAN,
  ID_NOTICE_SUPPORTER,
  ID_CHAT_LAYER_SET_DISPLAY_DONATION,
  ID_CHAT_LAYER_SET_DISPLAY_ICON,
  ID_CHAT_LAYER_SET_DISPLAY_NOTICE,
} from './consts'
import { SettingItem } from './interfaces'

export const chatLayerSetIconItems: Record<string, SettingItem> = {
  [ID_DISPLAY_ICON_STREAMER]: {
    type: 'checkbox',
    text: 'BJ 아이콘',
  },
  [ID_DISPLAY_ICON_MANAGER]: {
    type: 'checkbox',
    text: '매니저 아이콘',
  },
  [ID_DISPLAY_ICON_VIP]: {
    type: 'checkbox',
    text: '열혈팬 아이콘',
  },
  [ID_DISPLAY_ICON_SUBSCRIPTION]: {
    type: 'checkbox',
    text: '구독 아이콘',
  },
  [ID_DISPLAY_ICON_FAN]: {
    type: 'checkbox',
    text: '팬클럽 아이콘',
  },
  [ID_DISPLAY_ICON_SUPPORTER]: {
    type: 'checkbox',
    text: '서포터 아이콘',
  },
}

export const chatLayerSetDisplayDonationItems: Record<string, SettingItem> = {
  [ID_DONATION_SUBSCRIPTION]: {
    type: 'checkbox',
    text: '구독',
  },
  [ID_DONATION_BALLOON]: {
    type: 'checkbox',
    text: '별풍선',
  },
  [ID_DONATION_AD_BALLOON]: {
    type: 'checkbox',
    text: '애드벌룬',
  },
  [ID_DONATION_STICKER]: {
    type: 'checkbox',
    text: '스티커',
  },
}

export const chatLayerSetNoticeItems: Record<string, SettingItem> = {
  [ID_NOTICE_VIP]: {
    type: 'checkbox',
    text: '열혈팬 탄생 알림',
  },
  [ID_NOTICE_FAN]: {
    type: 'checkbox',
    text: '팬클럽 가입 알림',
  },
  [ID_NOTICE_SUPPORTER]: {
    type: 'checkbox',
    text: '서포터 가입 알림',
  },
}

export const chatLayerSubMarkItems: Record<string, SettingItem> = {
  [ID_CHAT_LAYER_SET_DISPLAY_ICON]: {
    type: 'chat_layer',
    text: '아이콘 표시 설정',
  },
  [ID_CHAT_LAYER_SET_DISPLAY_DONATION]: {
    type: 'chat_layer',
    text: '후원 메세지 표시 설정',
  },
  [ID_CHAT_LAYER_SET_DISPLAY_NOTICE]: {
    type: 'chat_layer',
    text: '채팅 안내 설정',
  },
}
