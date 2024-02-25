const isCleaningTarget = (message: string | null) => {
  if (!message) {
    return false
  }
  return message.startsWith('ㄱㅇㅇ') || message.length === 1 || message === 'ㄹㅇ' || message.startsWith('ㅋㅋㅋㅋㅋ')
}

export const cleanChat = (mutateTargetNode: HTMLElement, removeTagetNode: HTMLElement) => {
  const message = mutateTargetNode.querySelector('.msg')?.textContent ?? null
  if (!isCleaningTarget(message)) {
    return false
  }
  removeTagetNode.remove()
  return true
}
