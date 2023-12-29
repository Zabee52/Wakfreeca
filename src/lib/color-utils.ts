import { Rgb } from './interfaces'

function hexToRgb(hex: string): Rgb {
  const bigint = parseInt(hex, 16) % 0xffffff // Adjust hex to 6 digits
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

function getBrightness(rgb: Rgb) {
  return Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000)
}

// 밝기가 150보다 높으면 어둡게, 100보다 낮으면 밝게 조정
function adjustRgbBrightness(rgb: Rgb) {
  const brightness = getBrightness(rgb)
  const brightCriteria = 150
  const darkCriteria = 100
  const tooBright = brightness > brightCriteria
  const tooDark = brightness < darkCriteria
  if (!tooBright && !tooDark) {
    return rgb
  }

  let factor = 1
  if (tooBright) {
    factor = brightCriteria / (brightness || 1)
  } else if (tooDark) {
    factor = darkCriteria / (brightness || 1)
  }
  return {
    r: Math.min(255, Math.round(rgb.r * factor)),
    g: Math.min(255, Math.round(rgb.g * factor)),
    b: Math.min(255, Math.round(rgb.b * factor)),
  }
}

function rgbToHex(rgb: Rgb) {
  const r = rgb.r.toString(16).padStart(2, '0')
  const g = rgb.g.toString(16).padStart(2, '0')
  const b = rgb.b.toString(16).padStart(2, '0')
  return r + g + b
}

export function getBrightnessAdjustedHex(hex: string) {
  const rgb = hexToRgb(hex)
  const adjustedRgb = adjustRgbBrightness(rgb)
  return rgbToHex(adjustedRgb)
}
