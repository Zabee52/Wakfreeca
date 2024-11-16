import { funcWithRetry } from './common-utils'
import { UserInformation } from './interfaces'
import { getConnectedLiveView, getCurrentViewerList } from './live-view-utils'
import { TrieFactory } from './trie-factory'

const userList = TrieFactory.getInstance<UserInformation>()

const ingest = (grade: string, nickname: string, userId: string) => {
  const userInfo: UserInformation = {
    grade,
    nickname,
    userId,
  }

  return userList.insert(nickname, userInfo)
}

export const indexUserList = async () => {
  const liveView = await funcWithRetry(getConnectedLiveView, 120)
  if (!liveView?.playerController?.sendChUser) {
    throw new Error('liveView not found')
  }

  const viewerList = await getCurrentViewerList(liveView)
  if (!viewerList?.length) {
    console.log('index failed')
    return null
  }

  viewerList.forEach((viewer) => {
    ingest(viewer.grade, viewer.nickname, viewer.id)
  })

  return userList
}
