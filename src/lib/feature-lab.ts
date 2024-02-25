import { Feature } from './interfaces'
import { getStorageLocal, setStorageLocal } from './storage-utils'

export default class FeatureLab {
  static loaded = false
  static featureLabStorageKey = 'features'

  private static features: Feature = {}

  static async init() {
    this.features = await getStorageLocal<Feature>(this.featureLabStorageKey, {})
    this.loaded = true
  }

  static getFeatureEnabled(name: string) {
    return this.features[name] ?? false
  }

  static setAndPropagation(name: string, value: boolean) {
    this.setFeatureEnabled(name, value)
    this.propagateGlobal()
  }

  static setFeatureEnabled(name: string, value: boolean) {
    this.features[name] = value
  }

  static propagateGlobal() {
    setStorageLocal<Feature>(this.featureLabStorageKey, this.features)
  }

  static setFeatures(features: Feature) {
    this.features = features
  }

  static getFeatures() {
    return this.features
  }
}

FeatureLab.init()
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local') {
    return
  }
  const features = changes[FeatureLab.featureLabStorageKey]
  if (!features) {
    return
  }
  FeatureLab.setFeatures(features.newValue)
})
