// Checkbox items
export const ID_CHAT_ONE_LINE = 'chat_one_line'
export const ID_SET_NICKNAME_COLOR = 'set_nickname_color'
export const ID_HIDE_DONATION = 'hide_donation'

export const MESSAGE_CHAT_ONE_LINE = ID_CHAT_ONE_LINE
export const MESSAGE_SET_NICKNAME_COLOR = ID_SET_NICKNAME_COLOR
export const MESSAGE_HIDE_DONATION = ID_HIDE_DONATION

// Chat layer items
export const ID_CHAT_LAYER_SET_DISPLAY_PERSONACON = 'chat_layer_set_personacon'
export const ID_CHAT_LAYER_SET_DISPLAY_ICON = 'chat_layer_set_icon'
export const ID_CHAT_LAYER_SET_DISPLAY_DONATION = 'chat_layer_set_display_donation'

export const MESSAGE_CHAT_LAYER_SET_DISPLAY_ICON = ID_CHAT_LAYER_SET_DISPLAY_ICON
export const MESSAGE_CHAT_LAYER_SET_DISPLAY_DONATION = ID_CHAT_LAYER_SET_DISPLAY_DONATION

// Chat layer set display icon items
export const ID_PERSONACON_BJ = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_bj')
export const ID_PERSONACON_MANAGER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_manager')
export const ID_PERSONACON_FEVER_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_fever_fan')
export const ID_PERSONACON_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_fan')
export const ID_PERSONACON_NORMAL = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_normal')
export const ID_PERSONACON_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_PERSONACON, 'personacon_subscription')

export const CHAT_LAYER_SET_DISPLAY_PERSONACON_MESSAGES = [
  ID_PERSONACON_BJ,
  ID_PERSONACON_MANAGER,
  ID_PERSONACON_FEVER_FAN,
  ID_PERSONACON_FAN,
  ID_PERSONACON_NORMAL,
  ID_PERSONACON_SUBSCRIPTION,
]

export const ID_ICON_BJ = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_bj')
export const ID_ICON_MANAGER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_manager')
export const ID_ICON_SUBSCRIPTION = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_subscription')
export const ID_ICON_FEVER_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_fever_fan')
export const ID_ICON_FAN = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_fan')
export const ID_ICON_QUICK_VIEW = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_ICON, 'icon_quick_view')

export const CHAT_LAYER_SET_DISPLAY_ICON_MESSAGES = [
  ID_ICON_BJ,
  ID_ICON_MANAGER,
  ID_ICON_SUBSCRIPTION,
  ID_ICON_FEVER_FAN,
  ID_ICON_FAN,
  ID_ICON_QUICK_VIEW,
]

// Chat layer set display donation items
export const ID_DONATION_BALOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'baloon')
export const ID_DONATION_AD_BALOON = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'adbaloon')
export const ID_DONATION_STICKER = withPrefix(ID_CHAT_LAYER_SET_DISPLAY_DONATION, 'sticker')

function withPrefix(prefix: string, str: string) {
  return `${prefix}_${str}`
}
