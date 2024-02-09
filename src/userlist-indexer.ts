import { UserInformation } from './lib/interfaces'

const userLists: Record<string, UserInformation> = {}

const userListIndexCallback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
  for (const mutation of mutationsList) {
    if (mutation.type !== 'childList') {
      continue
    }

    mutation.addedNodes.forEach(async (node: Node) => {
      if (!(node instanceof HTMLElement) || node.classList[0] === 'title') {
        return
      }

      const mutateTargetNode = node.querySelector('a')
      if (!mutateTargetNode) {
        return
      }

      const nickname = mutateTargetNode.getAttribute('user_nick') || ''

      if (userLists[nickname]) {
        return
      }

      const userInformation: UserInformation = {
        grade: mutateTargetNode.getAttribute('grade') || '',
        nickname,
        userId: mutateTargetNode.getAttribute('user_id') || '',
      }

      userLists[nickname] = userInformation
    })
  }
}

const userListIndexer = new MutationObserver(userListIndexCallback)

function userListIndexerInit() {
  const scrollTarget = document.getElementById('userList')
  if (!scrollTarget) {
    throw new Error('userList element not found')
  }

  const ingestTarget = document.getElementsByClassName('effective_list')?.[0]
  if (!ingestTarget) {
    throw new Error('effective_list element not found')
  }

  const observerConfig = { attributes: false, childList: true, subtree: false }
  userListIndexer.observe(ingestTarget, observerConfig)
}

async function triggerUserListIndex() {
  const userList = document.getElementById('userList')
  if (!userList) {
    throw new Error('userList element not found')
  }

  const elemHeight = userList.clientHeight
  const maxHeight = userList.scrollHeight
  
  for (let i = elemHeight; i < maxHeight; i += elemHeight) {
    userList.scrollTop = i
  }
}
// userListIndexerInit()
// triggerUserListIndex()