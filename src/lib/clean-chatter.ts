import ChatFilter from './chat-filter'
import { ChatFilterItem } from './interfaces'

const isCleaningPolicyViolated = (message: string | null) => {
  if (!message) {
    return false
  }
  for (const key in ChatFilter.chatFilterItem) {
    if (!ChatFilter.validate(key as keyof ChatFilterItem, message)) {
      continue
    }
    return true
  }
  return false
}

export const isCleaningTarget = (mutateTargetNode: HTMLElement) => {
  const message = mutateTargetNode.querySelector('.msg')?.textContent ?? null
  return isCleaningPolicyViolated(message)
}
