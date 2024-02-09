import { UserInformation } from './lib/interfaces'
import { getConnectedLiveView, getCurrentViewerList } from './lib/live-view-utils'
import { Trie } from './lib/trie'

const userList = new Trie<UserInformation>()

const ingest = (grade: string, nickname: string, userId: string) => {
  const userInfo: UserInformation = {
    grade,
    nickname,
    userId,
  }

  return userList.insert(nickname, userInfo)
}

const indexUserList = async () => {
  const liveView = await getConnectedLiveView()
  if (!liveView?.playerController?.sendChUser) {
    throw new Error('liveView not found')
  }

  console.time('index')
  const viewerList = await getCurrentViewerList(liveView)
  if (!viewerList?.length) {
    console.log('index failed')
    console.timeEnd('index')
    return
  }

  viewerList.forEach((viewer) => {
    ingest(viewer.grade, viewer.nickname, viewer.id)
  })

  console.timeEnd('index')
}

indexUserList()
