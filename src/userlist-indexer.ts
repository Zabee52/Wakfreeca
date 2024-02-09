import { DEFAULT_RETRY_LIMIT } from './lib/consts'
import { AfreecaTvUserListItem, UserInformation } from './lib/interfaces'

declare const window: any

const userLists: Record<string, UserInformation> = {}
let viewerListCalled = false

const ingest = (grade: string, nickname: string, userId: string) => {
  const userInfo: UserInformation = {
    grade,
    nickname,
    userId,
  }

  if (!userLists[userInfo.nickname]) {
    userLists[userInfo.nickname] = userInfo
  }

  return
}

const delay = async (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const getConnectedLiveView = async (retry: number = DEFAULT_RETRY_LIMIT): Promise<any> => {
  if (!window.liveView) {
    throw new Error('liveView not found')
  }

  if (!retry) {
    console.log('getConnectedLiveView(): retry limit exceeded')
    return null
  }

  if (!window.liveView?.playerController?.getLivePlayer?.()?.chatSocket?.isConnected) {
    console.log('chat server connected yet. retry, remaining:', --retry)
    await delay(1000)
    return getConnectedLiveView(retry)
  }
  return window.liveView
}

const getViewerCount = () => {
  const viewerElement = document.getElementById('nAllViewer') as HTMLElement
  const res = Number(viewerElement?.textContent?.replace(/,/g, '')) || 5
  return res
}

/**
 *
 * @param liveView
 * @param expectedCount : expectedCount should be less than the actual expected viewer count. recommended to use 0.5 of the actual count.
 * @param retry
 * @returns
 */
const getViewerList = async (
  liveView: any,
  expectedCount: number,
  retry: number = DEFAULT_RETRY_LIMIT
): Promise<AfreecaTvUserListItem[] | null> => {
  if (!retry) {
    console.log('getViewerList(): retry limit exceeded')
    return null
  }

  const viewerList = liveView.Chat.chatUserListLayer.getFlattenedUserList() as AfreecaTvUserListItem[]

  if (viewerList.length < expectedCount) {
    console.log(viewerList.length, expectedCount)
    console.log('viewerList not found. retry, remaining:', --retry)
    await delay(1000)
    return getViewerList(liveView, expectedCount, retry)
  }

  return viewerList
}

const sendChUser = (liveView: any) => {
  if (!liveView.playerController.sendChUser) {
    throw new Error('liveView not found')
  }
  liveView.playerController.sendChUser()
  viewerListCalled = true
}

const getCurrentViewerList = async () => {
  const liveView = await getConnectedLiveView()
  if (!liveView?.playerController?.sendChUser) {
    throw new Error('liveView not found')
  }
  try {
    sendChUser(liveView)

    const viewerCount = getViewerCount()
    const viewerList = await getViewerList(liveView, viewerCount * 0.5)
    console.log(viewerList)
    return viewerList
  } catch (err) {
    console.error(err)
    return null
  }
}

getCurrentViewerList().then((res) => {
  console.log(res)
})
