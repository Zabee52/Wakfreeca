import FeatureLab from './feature-lab'

const isCleaningPolicyViolated = (message: string | null) => {
  if (!message) {
    return false
  }
  const isCuteFilter = FeatureLab.getFeatureEnabled('cuteFilter') && (message === 'ㄱㅇㅇ' || message === 'ㄱㅇㅇㅇ')
  const isEeFilter = FeatureLab.getFeatureEnabled('eeFilter') && message.startsWith('ㅔㅔ')
  const isKiaFilter = FeatureLab.getFeatureEnabled('kiaFilter') && message.startsWith('캬ㅑ')
  const isCleanChatter =
    FeatureLab.getFeatureEnabled('cleanChatter') && (message.length === 1 || message.startsWith('ㅋㅋㅋㅋㅋ'))

    console.log(isCuteFilter || isEeFilter || isKiaFilter || isCleanChatter)
  return isCuteFilter || isEeFilter || isKiaFilter || isCleanChatter
}

export const isCleaningTarget = (mutateTargetNode: HTMLElement) => {
  const message = mutateTargetNode.querySelector('.msg')?.textContent ?? null
  return isCleaningPolicyViolated(message)
}
