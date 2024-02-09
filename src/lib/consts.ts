// Chat layer items
export const ID_CHAT_LAYER_SET_DISPLAY_ICON = 'chat_layer_set_icon'
export const ID_CHAT_LAYER_SET_DISPLAY_DONATION = 'chat_layer_set_display_donation'
export const ID_CHAT_LAYER_SET_DISPLAY_NOTICE = 'chat_layer_set_display_notice'

export const MESSAGE_CHAT_LAYER_SET_DISPLAY_ICON = ID_CHAT_LAYER_SET_DISPLAY_ICON
export const MESSAGE_CHAT_LAYER_SET_DISPLAY_DONATION = ID_CHAT_LAYER_SET_DISPLAY_DONATION

export const GRADE_BADGE_STREAMER = 'grade-badge-streamer'
export const GRADE_BADGE_MANAGER = 'grade-badge-manager'
export const GRADE_BADGE_VIP = 'grade-badge-vip'
export const GRADE_BADGE_FAN = 'grade-badge-fan'
export const GRADE_BADGE_SUPPORTER = 'grade-badge-support'

export const ID_DISPLAY_ICON_STREAMER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, GRADE_BADGE_STREAMER)
export const ID_DISPLAY_ICON_MANAGER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, GRADE_BADGE_MANAGER)
export const ID_DISPLAY_ICON_VIP = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, GRADE_BADGE_VIP)
export const ID_DISPLAY_ICON_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'subscribe')
export const ID_DISPLAY_ICON_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, GRADE_BADGE_FAN)
export const ID_DISPLAY_ICON_SUPPORTER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, GRADE_BADGE_SUPPORTER)

export const CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES = [
  ID_DISPLAY_ICON_STREAMER,
  ID_DISPLAY_ICON_MANAGER,
  ID_DISPLAY_ICON_VIP,
  ID_DISPLAY_ICON_SUBSCRIPTION,
  ID_DISPLAY_ICON_FAN,
  ID_DISPLAY_ICON_SUPPORTER,
]

// Chat layer set display donation items
export const ID_DONATION_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'subscribe')
export const ID_DONATION_BALLOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'balloon')
export const ID_DONATION_AD_BALLOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'adballoon')
export const ID_DONATION_STICKER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'sticker')

export const CHAT_LAYER_SET_DISPLAY_DONATION_MESSAGES = [
  ID_DONATION_SUBSCRIPTION,
  ID_DONATION_BALLOON,
  ID_DONATION_AD_BALLOON,
  ID_DONATION_STICKER,
]

// Chat layer set display notice items
export const ID_NOTICE_VIP_ENTER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_NOTICE, 'vip_enter')
export const ID_NOTICE_VIP = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_NOTICE, 'vip')
export const ID_NOTICE_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_NOTICE, 'fan')
export const ID_NOTICE_SUPPORTER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_NOTICE, 'supporter')

export const CHAT_LAYER_SET_DISPLAY_NOTICE_MESSAGES = [
  ID_NOTICE_VIP_ENTER,
  ID_NOTICE_VIP,
  ID_NOTICE_FAN,
  ID_NOTICE_SUPPORTER,
]

function withPrefix(prefix: string, str: string) {
  return `${prefix}_${str}`
}

export const DEFAULT_RETRY_LIMIT = 60
