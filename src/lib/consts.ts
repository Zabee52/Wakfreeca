// Checkbox items
export const ID_CHAT_ONE_LINE = 'chat_one_line'
export const ID_SET_NICKNAME_COLOR = 'set_nickname_color'

export const MESSAGE_CHAT_ONE_LINE = ID_CHAT_ONE_LINE
export const MESSAGE_SET_NICKNAME_COLOR = ID_SET_NICKNAME_COLOR

// Chat layer items
export const ID_CHAT_LAYER_SET_DISPLAY_PERSONACON = 'chat_layer_set_personacon'
export const ID_CHAT_LAYER_SET_DISPLAY_ICON = 'chat_layer_set_icon'
export const ID_CHAT_LAYER_SET_DISPLAY_DONATION = 'chat_layer_set_display_donation'

export const MESSAGE_CHAT_LAYER_SET_DISPLAY_ICON = ID_CHAT_LAYER_SET_DISPLAY_ICON
export const MESSAGE_CHAT_LAYER_SET_DISPLAY_DONATION = ID_CHAT_LAYER_SET_DISPLAY_DONATION

// Chat layer set display icon items
export const ID_PERSONACON_BJ = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'bj')
export const ID_PERSONACON_MANAGER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'manager')
export const ID_PERSONACON_FEVER_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'fever_fan')
export const ID_PERSONACON_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'fan')
export const ID_PERSONACON_NORMAL = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'normal')
export const ID_PERSONACON_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'subscription')

export const CHAT_LAYER_SET_DISPLAY_PERSONACON_MESSAGES = [
  ID_PERSONACON_BJ,
  ID_PERSONACON_MANAGER,
  ID_PERSONACON_FEVER_FAN,
  ID_PERSONACON_FAN,
  ID_PERSONACON_NORMAL,
  ID_PERSONACON_SUBSCRIPTION,
]

export const ID_ICON_BJ = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'bj')
export const ID_ICON_MANAGER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'manager')
export const ID_ICON_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'subscription')
export const ID_ICON_FEVER_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'fever_fan')
export const ID_ICON_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'fan')
export const ID_ICON_SUPPORTER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'supporter')
export const ID_ICON_QUICK_VIEW = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'quick_view')

export const CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES = [
  ID_ICON_BJ,
  ID_ICON_MANAGER,
  ID_ICON_SUBSCRIPTION,
  ID_ICON_FEVER_FAN,
  ID_ICON_FAN,
  ID_ICON_SUPPORTER,
  ID_ICON_QUICK_VIEW,
]

// Chat layer set display donation items
export const ID_DONATION_BALLOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'balloon')
export const ID_DONATION_AD_BALLOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'adballoon')
export const ID_DONATION_STICKER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'sticker')

export const CHAT_LAYER_SET_DISPLAY_DONATION_MESSAGES = [ID_DONATION_BALLOON, ID_DONATION_AD_BALLOON, ID_DONATION_STICKER]

function withPrefix(prefix: string, str: string) {
  return `${prefix}_${str}`
}
